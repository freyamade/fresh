// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        index: ['README'],
        path: 'albums/*.md',
        typeName: 'AlbumDetails',
      }
    },
  ],
  siteName: 'freyama.de',
  siteUrl: 'https://freyama.de',
  siteDescription: 'freya broderick - modest girl and programmer extraordinaire!',
}
