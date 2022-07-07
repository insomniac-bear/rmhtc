/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['s3.rmhtc.ru'],
  },
};

module.exports = nextConfig;
