const axios = require("axios");
require('dotenv').config()

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
  serverMiddleware: [
    '~/api/index'
  ],
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
    '@plugins/mixins/user'
    // '~plugins/axios',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/dotenv',
  ],
  /*
  ** Nuxt.js modules
  */
 auth: {
  strategies: {
    local: {
      login: { url: 'auth/login', method: 'post', propertyName: 'access_token' },
      logout: { url: 'auth/logout', method: 'post' },
      user: { url: 'auth/user', method: 'get', propertyName: 'user' }
      },
  },
  redirect: {
    login: '/secret/login',
    home:'/'
  },
  plugins: [
    '@/plugins/authRedirectHeader'
  ]
 },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/markdownit',
    [
      "storyblok-nuxt",
      {
        accessToken:
          process.env.NODE_ENV == "production"
            ? process.env.STORYBLOK_PRODUCTION_KEY
            : process.env.STORYBLOK_PREVIEW_KEY,
        cacheProvider: "memory"
      }
    ]
  ],

  axios: {
    // baseURL:"hprocess.env.LOCALHOST_PATH",
    baseURL:"process.env.HEROKU_PATH",
    // proxyHeaders: false,
    // credentials: false
  },

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

  generate2: {
    routes: function() {
      return axios.get("/api/posts/")
      .then(res => {
        const expD = res.data;
        return [
          '/about',
          ...expD
        ]
      });
    }
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
