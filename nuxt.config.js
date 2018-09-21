module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'vue-nuxt-jxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'stylesheet', href: '/css/mui.min.css' },
      { rel: 'stylesheet', href: '/css/mui.picker.min.css' },
      { rel: 'stylesheet', href: '/css/mui.poppicker.css' },
      { rel: 'stylesheet', href: '/css/common.css' },
      { rel: 'stylesheet', href: '/css/recorld_glu.css' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
  	'@nuxtjs/axios'
  ],
  axios: {
  	proxy: true
  	// See https://github.com/nuxt-community/axios-module#options
  },
  proxy: {
  	'/api': {
  		target: 'https://app3.51etang.com',
  		pathRewrite: { '^/api': '' }
  	}
  },
}

