export default ({
  googleAnalyticsCode,
  title,
  author,
  description,
  twitter,
  theme_color = '#ffffff'
}) => {
  const config = [
    [
      '@nuxtjs/pwa',
      {
        meta: {
          viewport:
            'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no',
          mobileAppIOS: true,
          favicon: true,
          name: title,
          author: author.name,
          description,
          theme_color,
          ogHost: author.url,
          ogImage: {
            path: '/cover.png',
            width: 2096,
            height: 1096,
            type: 'image/png'
          },
          twitterCard: 'summary',
          twitterSite: twitter || ''
        },
        manifest: {
          name: title,
          short_name: `${author.name.split(' ')[0]} ${author.name
            .split(' ')[1]
            .charAt(0)}.`,
          display: 'standalone',
          dir: 'ltr',
          description,
          orientation: 'portrait',
          theme_color,
          background_color: theme_color,
          serviceworker: {
            src: '../sw.js'
          }
        }
      }
    ]
  ];

  if (googleAnalyticsCode) {
    config.push([
      '@nuxtjs/google-analytics',
      {
        id: googleAnalyticsCode
      }
    ])
  }

  return config;
};
