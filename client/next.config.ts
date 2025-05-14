import type { NextConfig } from "next";


// module.exports = {
//   webpack: (config: { cache: boolean; }) => {
//     config.cache = false;
//     return config;
//   },
// };


const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        port: "",
        pathname: "/**",
      }
    ]
  }
};

export default nextConfig;
