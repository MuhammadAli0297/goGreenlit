#!/usr/bin/env python3
"""
Cloudflare corruption fix script.
Run after deploying to remove Cloudflare-injected artifacts from _site/ HTML files:
  - Obfuscated mailto: links (CF email obfuscation)
  - Injected CF email decode scripts
  - cdn-cgi references
  - Rocket loader script tags
"""

import os
import re
import sys

SITE_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "_site")


def fix_cf_email_obfuscation(content):
    """Replace CF-obfuscated mailto anchors with plain text email."""
    # CF replaces mailto: links with /cdn-cgi/l/email-protection#<hex>
    # Pattern: <a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="<hex>">[email&#160;protected]</a>
    pattern = re.compile(
        r'<a[^>]+href=["\']\/cdn-cgi\/l\/email-protection["\'][^>]*'
        r'data-cfemail=["\']([0-9a-fA-F]+)["\'][^>]*>.*?<\/a>',
        re.DOTALL
    )

    def decode_cf_email(hex_str):
        """Decode CF email obfuscation hex string back to plaintext."""
        try:
            key = int(hex_str[:2], 16)
            email = "".join(
                chr(int(hex_str[i:i+2], 16) ^ key)
                for i in range(2, len(hex_str), 2)
            )
            return email
        except (ValueError, IndexError):
            return "hello@gogreenlit.com"

    def replace_match(m):
        email = decode_cf_email(m.group(1))
        return f'<a href="mailto:{email}">{email}</a>'

    return pattern.sub(replace_match, content)


def remove_cf_decode_script(content):
    """Remove the CF email-decode inline script CF injects at bottom of <body>."""
    # CF injects something like:
    # <script>(function(){function c(d){...}var cf=...})()</script>
    # More reliably: any <script> block that references cdn-cgi or __cf_email__
    pattern = re.compile(
        r'<script[^>]*>\s*\(function\(\)\{.*?__cf_email__.*?\}\)\(\)\s*<\/script>',
        re.DOTALL
    )
    content = pattern.sub("", content)

    # Also remove any remaining cdn-cgi script src tags
    cdn_script = re.compile(
        r'<script[^>]+src=["\'][^"\']*cdn-cgi[^"\']*["\'][^>]*>\s*<\/script>',
        re.DOTALL
    )
    content = cdn_script.sub("", content)

    return content


def remove_rocket_loader(content):
    """Remove Cloudflare Rocket Loader script injection."""
    pattern = re.compile(
        r'<script[^>]+src=["\'][^"\']*rocket-loader[^"\']*["\'][^>]*>\s*<\/script>',
        re.DOTALL
    )
    return pattern.sub("", content)


def fix_cdn_cgi_hrefs(content):
    """Replace any remaining /cdn-cgi/ hrefs with # as a safety fallback."""
    pattern = re.compile(r'href=["\']\/cdn-cgi\/[^"\']*["\']')
    return pattern.sub('href="#"', content)


def process_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        original = f.read()

    content = original
    content = fix_cf_email_obfuscation(content)
    content = remove_cf_decode_script(content)
    content = remove_rocket_loader(content)
    content = fix_cdn_cgi_hrefs(content)

    if content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        return True
    return False


def main():
    if not os.path.isdir(SITE_DIR):
        print(f"ERROR: _site directory not found at {SITE_DIR}")
        print("Run `npx @11ty/eleventy` first to build the site.")
        sys.exit(1)

    fixed = 0
    scanned = 0

    for root, dirs, files in os.walk(SITE_DIR):
        # Skip asset directories
        dirs[:] = [d for d in dirs if d not in ("assets", "css", "js", "fonts", "images")]
        for filename in files:
            if not filename.endswith(".html"):
                continue
            filepath = os.path.join(root, filename)
            scanned += 1
            if process_file(filepath):
                fixed += 1
                rel = os.path.relpath(filepath, SITE_DIR)
                print(f"  Fixed: {rel}")

    print(f"\nScanned {scanned} HTML files. Fixed {fixed}.")


if __name__ == "__main__":
    main()
