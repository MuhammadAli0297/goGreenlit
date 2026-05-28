#!/usr/bin/env python3
"""
Move schema from YAML front matter to inline <script> tag in template body.
YAML single-quoted strings break on apostrophes like don't, didn't, etc.
"""
import os
import re
import sys

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find front matter block
    if not content.startswith('---'):
        return False

    # Split into front matter and body
    parts = content.split('---', 2)
    if len(parts) < 3:
        return False

    front_matter = parts[1]
    body = parts[2]

    # Check if schema exists in front matter
    schema_match = re.search(r"^schema:\s+'(.*?)'\s*$", front_matter, re.MULTILINE | re.DOTALL)
    if not schema_match:
        return False

    schema_value = schema_match.group(1)

    # Remove schema from front matter
    new_front_matter = re.sub(r"^schema:\s+'.*?'\s*\n", '', front_matter, flags=re.MULTILINE | re.DOTALL)

    # Build new content with inline script at top of body
    script_block = f'\n<script type="application/ld+json">\n{schema_value}\n</script>\n'

    new_content = f'---{new_front_matter}---{script_block}{body}'

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"  Fixed: {filepath}")
    return True

def main():
    dirs = [
        'src/software-testing-services',
        'src/qa-consulting',
    ]
    fixed = 0
    for d in dirs:
        for root, _, files in os.walk(d):
            for fname in files:
                if fname.endswith('.njk'):
                    path = os.path.join(root, fname)
                    if process_file(path):
                        fixed += 1
    print(f"\nFixed {fixed} files.")

if __name__ == '__main__':
    main()
