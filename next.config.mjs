// import { webpack } from 'next/dist/compiled/webpack/webpack'
// import { config } from 'process'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: ['@svgr/webpack'],
  //   })
  //   return config
  // },
  images: {
    domains: ['127.0.0.1', 'localhost', '147.45.76.77'],
  },
  output: 'standalone',
}

export default nextConfig
