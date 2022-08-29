/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  generateEtags: false,
  env: {
    CLIENT_URL: process.env.APP_ENV === 'develop' ? process.env.DEV_CLIENT_URL : process.env.LOCAL_CLIENT_URL,
    SERVER_URL: process.env.APP_ENV === 'develop' ? process.env.DEV_SERVER_URL : process.env.LOCAL_SERVER_URL,
  },
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
