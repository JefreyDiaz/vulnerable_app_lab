/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Vulnerabilidad: desactivado para permitir ciertos exploits
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig

