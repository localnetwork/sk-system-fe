/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    middlewarePrefetch: true,
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
        protocol: "http",
        hostname: "localhost",
        port: "1000",
        pathname: `/**`,
      },
    ],
  },
};

module.exports = nextConfig;
