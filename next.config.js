/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'i.annihil.us'
          },
        ],
      }
};
