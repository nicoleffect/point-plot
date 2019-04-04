import { isOutside } from './utils'

function paintDot (dot, color) {
  // console.log(dot)
  const {
    x, y, r
  } = dot
  this.fillStyle = 'rgba(' + color + ', 0.8)'
  this.beginPath()
  this.arc(x, y, r, 0, Math.PI * 2)
  this.fill()
  this.closePath()
}

function getDot ({ rect, r, x = '', y = '' }) {
  const {
    width,
    height
  } = rect
  return {
    x: x || Math.random() * width,
    y: y || Math.random() * height,
    sx: Math.random() * 2 - 1,
    sy: Math.random() * 2 - 1,
    r: Math.random() * r
  }
}

class Dot {
  constructor ({ ctx, rect, color, r, d, tx = '', ty = '' }) {
    this.ctx = ctx // canvas
    this.rect = rect// canvas rect
    this.r = r // radius for a basic dot
    this.color = color // color for dot
    this.d = d
    this.dot = {}
    this.init(tx, ty)
  }
  init (tx = '', ty = '') {
    this.dot = getDot({ rect: this.rect, r: this.r, x: tx, y: ty })
    paintDot.call(this.ctx, this.dot, this.color)
  }
  update (callback) {
    const {
      x, y, r, sx, sy
    } = this.dot
    // console.log(x, y)
    // out
    const nx = x + sx
    const ny = y + sy
    if (isOutside(nx, ny, this.d, this.rect)) {
      callback && callback()
      // this.init()
      return
    }
    this.dot.x = nx
    this.dot.y = ny
    // console.log(sx, sy)
    paintDot.call(this.ctx, this.dot, this.color)
  }
}

export default Dot
