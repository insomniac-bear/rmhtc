/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  generateEtags: false,
  images: {
    minimumCacheTTL: 1,
    domains: ['s3.rmhtc.ru', 's3.rmhtc.add.company'],
  },
  async redirects() {
    return [
      {
        source: '/profile',
        destination: '/profile/summary',
        permanent: true,
      },
      {
        source: '/objects',
        destination: '/objects/companies',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
