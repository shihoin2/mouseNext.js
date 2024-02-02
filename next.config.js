module.exports = {
  reactStrictMode: false,
  // reactStrictMode: true,
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
    ],
  },
}
