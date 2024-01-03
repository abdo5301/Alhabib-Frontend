export function arrayFilter(filter_array, filter_index, filter_value) {
  const result = filter_array.find(obj => {
    return obj[filter_index] === filter_value
  })
  if (typeof result == 'undefined') {
    return false
  } else {
    return result
  }
}
