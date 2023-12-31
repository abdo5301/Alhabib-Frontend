export function priceFormate(price, add_currency = true, currency = null) {
  const rounded_price = parseFloat(price).toFixed(0)

  if (!add_currency) {
    return rounded_price
  } else {
    if (currency == null) {
      const { t } = useI18n()
      currency = t('sar')
    }
    return rounded_price + ' ' + currency
  }
}
