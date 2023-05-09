/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'easeplan-s3.s3.eu-north-1.amazonaws.com',
      'media.graphassets.com',
    ],
  },
};

module.exports = nextConfig;
