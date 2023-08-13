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
      },
      siteUrl: 'https://comi-verse.vercel.app/',
      generateRobotsTxt: true, 
};
