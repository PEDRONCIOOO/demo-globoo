/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "unpkg.com",
          pathname: "/**", // Allow all paths from unpkg.com
        },
      ],
    },
  };
  
  module.exports = nextConfig;