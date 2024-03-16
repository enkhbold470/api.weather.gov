/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["api.weather.gov"],
  },
  output: "standalone",
};

module.exports = nextConfig;
