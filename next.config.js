// module.exports = {
//   reactStrictMode: false,
//   // reactStrictMode: true,
//   images: {
//     domains: ['localhost'],
//     // domains: ['localhost'],
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: ['127.0.0.1','localhost']
//       },
//     ],
//   },
// }


module.exports = {
  reactStrictMode: false,
  images: {
    domains: ['localhost', 'localhost:8000'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
      },
    ],
  },
}
