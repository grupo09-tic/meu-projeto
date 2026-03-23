/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // você pode adicionar outras configs aqui, como imagens e aliases
  images: {
    domains: [], // se você usar imagens externas, coloque os domínios aqui
  },
};

module.exports = nextConfig;