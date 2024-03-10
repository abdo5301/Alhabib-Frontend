// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],

  i18n: {
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
      // BASE_URL:'',
      // API_URL: 'https://backend.alhabibshop.com/api/v1',//Production
      API_URL: process.env.NUXT_API_BASE,//Test
      TAPPY_PUBLIC_KEY: process.env.NUXT_TAPPY_PUBLIC_KEY,//tabby p_k
      TAPPY_SECRET_KEY: process.env.NUXT_TAPPY_SECRET_KEY,//tabby s_k
    }
  },

  plugins: [                                                                  
    '~/plugins/i18n.js'                                              
  ],

  devtools: {
    enabled: true,
  },
})
