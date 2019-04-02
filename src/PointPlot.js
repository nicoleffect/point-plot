
import Dot from './Point'
import { isMobile, getPixelRatio, isOutside } from './utils'

class PointPlot {
  constructor ({ canvas, color, r, distance, isAnim, isOnClick, isOnMove }) {
    // console.log(canvas.getBoundingClientRect())
    const canvas_rect = canvas.getBoundingClientRect()
    const canvas_width = canvas_rect.width
    const canvas_height = canvas_rect.height
    this.ctx = canvas.getContext('2d')
    const pixelRatio = getPixelRatio(this.ctx)
    // console.log(pixelRatio)
    canvas.width = canvas_width * pixelRatio
    canvas.height = canvas_height * pixelRatio

    this.rect = canvas_rect
    // this.cw = canvas.width
    // this.ch = canvas.height
    this.dots_count = Math.floor(canvas_width * canvas_height / (distance * 100))
    this.dots_distance = distance
    this.dots_arr = []
    this.color = color
    this.r = r

    this.ctx.scale(pixelRatio, pixelRatio)
    this.ctx.translate(1 / pixelRatio, 1 / pixelRatio)
    for (let i = 0; i < Math.floor(this.dots_count); i++) {
      this.initDot()
    }

    if (isAnim) {
      this.anim()
    }

    if (isOnClick) {
      this.onClick()
    }

    if (isOnMove) {
      this.onMove()
    }
    // this.onClick()
  }
  initDot (tx, ty) {
    const dot = new Dot({ ctx: this.ctx, rect: this.rect, d: this.dots_distance, color: this.color, r: this.r, tx, ty })
    this.dots_arr.push(dot)
    // console.log(this.dots_arr)
  }
  anim () {
    const requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
    const _this = this
    const {
      width,
      height
    } = this.rect
    const d = this.dots_distance
    const cw = width + d
    const ch = height + d
    return (function _animateUpdate () {
      _this.ctx.clearRect(-d, -d, cw, ch) // clear canvas
      const arr = _this.dots_arr
      for (var i = 0; i < arr.length; i++) {
        arr[i].update(() => {
          if (arr.length > _this.dots_count) {
            arr.splice(i, 1)
          } else {
            arr[i].init()
          }
        })
        for (var j = i + 1; j < arr.length; j++) {
          const dot_ix = arr[i].dot.x
          const dot_iy = arr[i].dot.y
          const dot_jx = arr[j].dot.x
          const dot_jy = arr[j].dot.y
          // console.log(arr[i])
          const s = Math.sqrt(Math.pow(dot_ix - dot_jx, 2) + Math.pow(dot_iy - dot_jy, 2)) // right triangle

          // console.log(s, d)
          if (s < d) {
            const ctx = _this.ctx
            // draw a line
            ctx.beginPath()
            ctx.moveTo(dot_ix, dot_iy)
            ctx.lineTo(dot_jx, dot_jy)
            ctx.strokeStyle = 'rgba(' + _this.color + ',' + (d - s) / d + ')'
            ctx.strokeWidth = 1
            ctx.stroke()
            ctx.closePath()
          }
        }
        // console.log(this.dotsArr.length)

      }
      requestAnimFrame(_animateUpdate)
    })()
  }
  onClick () {
    const event = isMobile ? 'touchstart' : 'click'
    const _createDot = (e) => {
      // console.log(e)
      const touch = isMobile ? e.touches[0] : e
      const tx = touch.pageX
      const ty = touch.pageY
      if (isOutside(tx, ty, this.dots_distance, this.rect)) {
        return
      }
      this.initDot(
        tx, ty
      )
      // if (this.dots_arr.length > this.dots_count) {
      //   this.dots_arr.shift()
      // }
    }
    document.addEventListener(event, _createDot)
  }

  onMove () {
    const e_down = isMobile ? 'touchstart' : 'mousedown'
    const e_move = isMobile ? 'touchmove' : 'mousemove'
    const e_up = isMobile ? 'touchend' : 'mouseup'
    const _moveDot = (e) => {
      const touch = isMobile ? e.touches[0] : e
      const tx = touch.pageX
      const ty = touch.pageY
      if (isOutside(tx, ty, this.dots_distance, this.rect)) {
        return
      }
      this.dots_arr[0].init(tx, ty)
    }
    document.addEventListener(e_down, () => {
      document.addEventListener(e_move, _moveDot)
    })
    document.addEventListener(e_up, () => {
      document.removeEventListener(e_move, _moveDot)
    })
  }
}

export default PointPlot
