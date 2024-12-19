/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    middlewarePrefetch: "strict",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: new URL(process.env.NEXT_PUBLIC_API_URL).hostname,
        port: "",
        pathname: `/**`,
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_API_URL,
        port: "",
        pathname: `/**`,
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1000",
        pathname: `/**`,
      },
      {
        protocol: "https",
        hostname: "flutter-be-test.onrender.com",
        pathname: `/**`,
      },
    ],
  },
};

module.exports = nextConfig;
