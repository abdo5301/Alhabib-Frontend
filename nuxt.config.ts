// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: './tailwind.config.js',
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: 'first',
    viewer: true,
  },

  runtimeConfig: {
    // Private config that is only available on the server
    //  baseUrl: '/api',
    // Config within public will be also exposed to the client
    public: {
      BASE_URL: '/api',
    }
  }
  
})
