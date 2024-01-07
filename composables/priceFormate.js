export function priceFormate(price, add_currency = true, currency = null) {
  const { $i18n } = useNuxtApp();
  const t = $i18n.t;

  const rounded_price = parseFloat(price).toFixed(0)

  if (!add_currency) {
    return rounded_price
  } else {
    if (currency == null) {
      currency = t('sar')
    }
    return rounded_price + ' ' + currency
  }
}
