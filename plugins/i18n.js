export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('lang', nuxtApp.$i18n.locales.value.find((x) => x.code ===  nuxtApp.$i18n.locale.value))
  nuxtApp.provide('all_lang', computed(() => (nuxtApp.$i18n.locales.value).filter(i => i.code !== nuxtApp.$i18n.locale.value)))
  nuxtApp.$i18n.onBeforeLanguageSwitch = (oldLocale, newLocale, isInitialSetup, nuxtApp) => {
  useHead({
    htmlAttrs: {
      lang: newLocale,
      dir: newLocale == "ar" ? "rtl" : "ltr"
    }
  })
  }
})
