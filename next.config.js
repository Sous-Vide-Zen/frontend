const { webpack } = require('next/dist/compiled/webpack/webpack')
const { config } = require('process')

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  images: {
    domains: ['127.0.0.1', 'localhost', '147.45.76.77'],
  },
}

module.exports = {
  ...nextConfig,
  output: 'standalone',
}
