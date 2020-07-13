export const numberFormatter = (n) => {
  const num = parseFloat(n).toFixed(2)
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
