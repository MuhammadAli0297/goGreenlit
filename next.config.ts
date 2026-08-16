import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/software-testing-services/qa-strategy-process",
        destination: "/qa-consulting/test-strategy-consulting",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
