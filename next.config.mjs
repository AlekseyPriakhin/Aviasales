/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  sassOptions: {
    additionalData: `@use '@/styles/_breakpoints.scss' as breakpoints;
                      @use '@/styles/_colors.scss' as colors;`,
  },
};

export default nextConfig;
