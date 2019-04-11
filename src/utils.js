export const isMobile = (() => {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent)
})()

export function isOutside (x, y, d, rect) {
  const {
    left,
    right,
    top,
    bottom
  } = rect
  if (x < left - d || x > right + d || y < top - d || y > bottom + d) {
    // console.log(true)
    return true
  }
  // console.log(false)
  return false
}
