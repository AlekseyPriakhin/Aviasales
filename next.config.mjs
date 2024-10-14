/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  sassOptions: {
    additionalData: `@use '@/styles/_breakpoints.scss' as breakpoints;
                      @use '@/styles/_colors.scss' as colors;`,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};

export default nextConfig;
