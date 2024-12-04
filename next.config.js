/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    middlewarePrefetch: true,
  },
};

module.exports = nextConfig;
