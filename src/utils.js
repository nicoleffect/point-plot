export const isMobile = (() => {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent)
})()

function getPixelRatio (ctx) {
  var backingStore = ctx.backingStorePixelRatio ||
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio || 1
  return (window.devicePixelRatio || 1) / backingStore
}
export function setContext (canvas) {
  const rect = canvas.getBoundingClientRect()
  const width = rect.width
  const height = rect.height
  const ctx = canvas.getContext('2d')
  const pixelRatio = getPixelRatio(ctx)
  // console.log(pixelRatio)
  canvas.width = width * pixelRatio
  canvas.height = height * pixelRatio
  ctx.scale(pixelRatio, pixelRatio)
  ctx.translate(1 / pixelRatio, 1 / pixelRatio)
  return {
    ctx,
    rect
  }
}
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
