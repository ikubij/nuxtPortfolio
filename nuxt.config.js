const axios = require("axios");

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@plugins/vuetify',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    [
      "storyblok-nuxt",
      {
        accessToken:
          process.env.NODE_ENV == "production"
            ? "QM50RQebTND7J0tdNAkDlAtt"
            : "0kTUbUnb8rJ2gnC2zWxNlQtt",
        cacheProvider: "memory"
      }
    ]
  ],

  generate: {
    routes: function() {
      return axios.get(
        "https://api.storyblok.com/v1/cdn/stories?version=published&token=QM50RQebTND7J0tdNAkDlAtt&starts_with=projects&cv=" +
          Math.floor(Date.now() / 1e3)
      )
      .then(res => {
        const projectPortfolio = res.data.stories.map(project => project.full_slug);
        return [
          '/projects',
          ...projectPortfolio
        ]
      });
    }
  },

  axios: {
    // proxyHeaders: false
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
