// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    'nuxt-lodash',
    'nuxt-rating',
    'nuxt-primevue',
    'nuxt-aos',
    ['@nuxtjs/robots', { configPath: "~/config/robots.config" }],
    "@nuxt/image"
  ],
  experimental: {
    viewTransition: true,
    asyncEntry:true,
  },
  image: {
    format: ['webp'],
    quality: 80
  },
  primevue:{
    components:{
      prefix: 'Prime',
      include: '*'
    },
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
    options:{
      ripple: true
    }
  },
  aos: {
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
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
  css: ['primevue/resources/themes/aura-light-noir/theme.css'],
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
      TAMARA_ENV: process.env.NUXT_TAMARA_ENV,
      TAMARA_API_TOKEN: process.env.NUXT_TAMARA_API_TOKEN,
      TAMARA_NOTIFICATION_TOKEN: process.env.NUXT_TAMARA_NOTIFICATION_TOKEN,
    }
  },

  plugins: [                                                                  
    '~/plugins/i18n.js'                                              
  ],

   routeRules:{
    '/tabby/**': {
      proxy:'https://api.tabby.ai/**'
    },
    // '/api/**': {
    //   proxy: process.env.NUXT_API_URL+'/**'
    // }
   },
  devtools: {
    enabled: false,
  },
})
