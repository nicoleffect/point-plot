export const isMobile = (() => {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent)
})()

export const getPixelRatio = (ctx) => {
  var backingStore = ctx.backingStorePixelRatio ||
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio || 1
  return (window.devicePixelRatio || 1) / backingStore
}

export const isOutside = (x, y, d, rect) => {
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
