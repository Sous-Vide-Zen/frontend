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
}

module.exports = { nextConfig, output: 'standalone' }
