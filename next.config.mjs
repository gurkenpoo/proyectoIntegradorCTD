/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  webpack(config) {
    config.ignoreWarnings = [
      {
        module: /typeorm/,
        message: /Module not found|dependency is an expression/,
      },
    ];
    return config;
  },
};

export default nextConfig;
