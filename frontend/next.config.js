/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  generateEtags: false,
  images: {
    minimumCacheTTL: 1,
    domains: ['s3.rmhtc.ru', 's3.rmhtc.add.company'],
  },
};

module.exports = nextConfig;
