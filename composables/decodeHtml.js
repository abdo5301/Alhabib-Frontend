export function decodeHtml(html) {
  //Must be inside <ClientOnly> tag
  if (process.client) {
    const txt = document.createElement('textarea')
    txt.innerHTML = html
    return txt.value
  }
}
