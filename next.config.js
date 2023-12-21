/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: false,
  },
  output: "standalone",
  reactStrictMode: false,
};

module.exports = nextConfig;
