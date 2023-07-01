/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'easeplan-storage.s3.us-east-1.amazonaws.com',
      'ease-storage.s3.us-east-1.amazonaws.com',
      'media.graphassets.com',
    ],
  },
};

module.exports = nextConfig;
