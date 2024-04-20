// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', 'nuxt-lodash','nuxt-rating',
  ['@nuxtjs/robots', { configPath: "~/config/robots.config" }]],
  experimental: {
    viewTransition: true,
    asyncEntry:true,
  },
  i18n: {
    customRoutes: 'config',
    pages: {
      'page/[slug]': {
         ar: '/[slug]',
         en: '/[slug]'
      },
      'auth/login-phone': {
         ar: '/login',
         en: '/login'
      },
      'auth/login-email': {
         ar: '/login-email',
         en: '/login-email'
      },
      'auth/register': {
         ar: '/register',
         en: '/register'
      },
      'auth/phone-confirm': {
         ar: '/phone-confirm',
         en: '/phone-confirm'
      },
      'auth/forgot-password': {
         ar: '/forgot-password',
         en: '/forgot-password'
      },
    },
    baseUrl:process.env.NUXT_BASE_URL,
    vueI18n: './i18n.config.ts',
    defaultLocale: 'ar',
    lazy: true,
    langDir: './lang',
    detectBrowserLanguage: false,
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json',
        dir: 'ltr',
        icon:'/images/en-flag.svg',
        list_name:'ENG'
      },
      {
        code: 'ar',
        iso: 'ar-SA',
        name: 'Arabic',
        file: 'ar.json',
        dir: 'rtl',
        icon:'/images/ar-flag.svg',
        list_name:'العربية'
      },
    ]
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: './tailwind.config.js',
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: 'first',
    viewer: true,
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    // Private config that is only available on the server
    //  baseUrl: '/api',
    // Config within public will be also exposed to the client
    public: {
      API_URL: process.env.NUXT_API_URL,
      BASE_URL: process.env.NUXT_BASE_URL,
      TAPPY_PUBLIC_KEY: process.env.NUXT_TAPPY_PUBLIC_KEY,//tabby p_k
      TAPPY_SECRET_KEY: process.env.NUXT_TAPPY_SECRET_KEY,//tabby s_k
    }
  },

  plugins: [                                                                  
    '~/plugins/i18n.js'                                              
  ],

   routeRules:{
    '/tabby/**': {
      proxy:'https://api.tabby.ai/**'
    }
   },
  devtools: {
    enabled: true,
  },
})
