export default defineNuxtPlugin(() => {})
// import * as Sentry from '@sentry/vue'

// export default defineNuxtPlugin(nuxtApp => {
//   const router = useRouter()
//   const {
//     public: { sentry, BASE_URL, API_URL },
//   } = useRuntimeConfig()

//   if (!sentry.dsn) {
//     return
//   }

//   Sentry.init({
//     app: nuxtApp.vueApp,
//     dsn: sentry.dsn,
//     environment: sentry.environment,
//     integrations: [
//       Sentry.browserTracingIntegration({ router }),
//       Sentry.replayIntegration({
//         maskAllText: false,
//         blockAllMedia: false,
//       }),
//     ],

//     // Configure this whole part as you need it!

//     tracesSampleRate: 0.2, // Change in prod

//     // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
//     tracePropagationTargets: ['http://localhost:3000/', BASE_URL, API_URL],

//     replaysSessionSampleRate: 1.0, // Change in prod
//     replaysOnErrorSampleRate: 1.0, // Change in prod if necessary
//   })
// })
