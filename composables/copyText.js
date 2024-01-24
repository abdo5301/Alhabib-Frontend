export function copyText(text) {
  if (process.client) {
    try {
      navigator.clipboard.writeText(text)
      alert(text + ' Copied!')
    } catch (error) {
      throw error
    }
  }
}
