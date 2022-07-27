/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  generateEtags: false,
  images: {
    minimumCacheTTL: 1,
    domains: ['s3.rmhtc.ru'],
  },
};

module.exports = nextConfig;
