/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  sassOptions: {
    additionalData: `@use '@/styles/_breakpoints.scss' as breakpoints;`,
  },
};

export default nextConfig;
