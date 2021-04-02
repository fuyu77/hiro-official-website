module.exports = {
  future: {
    webpack5: true
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /pdf\.worker\.min\.js/,
      exclude: /node_modules\/pdfjs-dist\/build/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[contenthash].[ext]',
            publicPath: '_next/static/worker',
            outputPath: 'static/worker'
          }
        }
      ]
    })
    return config
  }
}
