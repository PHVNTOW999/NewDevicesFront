// Local api
const api = 'http://127.0.0.1:8000/'
// Server api
// const api = 'http://188.94.156.116:10000/'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  target: 'server',
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'NewDevicesFront',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    '@nuxtjs/axios',
    '@nuxtjs/i18n'
  ],

  i18n: {
    lazy: true,
    legacy: false,
    langDir: "locales",
    strategy: "prefix_except_default",
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'ru',
        name: 'Русский',
        file: 'ru.json'
      }
    ]
    // defaultLocale: 'en'
  },

  axios: {
    proxy: true
  },

  proxy: {
    '/api/': { target: api }
  },

  server: {
    host: '127.0.0.1',
    port: 3000
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {}
        }
      }
    }
  }
}
