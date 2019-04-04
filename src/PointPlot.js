import Dot from './Point'
import { isMobile, setContext, isOutside } from './utils'

class PointPlot {
  constructor ({ canvas, color, r, distance, isConnect, isOnClick, isOnMove }) {
    const {
      ctx,
      rect
    } = setContext(canvas)
    this.ctx = ctx
    this.rect = rect
    const {
      width,
      height
    } = this.rect

    this.dots_count = Math.floor(width * height / (distance * 100))
    this.dots_distance = distance
    this.dots_arr = []
    this.color = color
    this.r = r

    for (let i = 0; i < this.dots_count; i++) {
      this.initDot()
    }

    this.anim(isConnect)

    if (isOnClick) {
      this.onClick()
    }

    if (isOnMove) {
      this.onMove()
    }
  }
  initDot (tx, ty) {
    const dot = new Dot({ ctx: this.ctx, rect: this.rect, d: this.dots_distance, color: this.color, r: this.r, tx, ty })
    this.dots_arr.push(dot)
    // console.log(this.dots_arr)
  }
  anim (isConnect) {
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
      arr.forEach((item_i, i) => {
        item_i.update(() => {
          if (arr.length > _this.dots_count) {
            arr.splice(i, 1)
          } else {
            item_i.init()
          }
        })
        if (isConnect) {
          const cache = [...arr]
          cache.splice(i, 1)
          cache.forEach((item_j, j) => {
            const dot_i = item_i.dot
            const dot_j = item_j.dot
            const ix = dot_i.x
            const iy = dot_i.y
            const jx = dot_j.x
            const jy = dot_j.y
            // console.log(arr[i])
            const s = Math.sqrt(Math.pow(ix - jx, 2) + Math.pow(iy - jy, 2)) // right triangle

            // console.log(s, d)
            if (s < d) {
              const ctx = _this.ctx
              // draw a line
              ctx.beginPath()
              ctx.moveTo(ix, iy)
              ctx.lineTo(jx, jy)
              ctx.strokeStyle = `rgba(${_this.color},${Math.round((d - s) / d * 10) / 10})`
              ctx.strokeWidth = 1
              ctx.stroke()
              ctx.closePath()
            }
          })
        }
      })

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
      this.initDot(tx, ty)
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
      this.dots_arr[this.dots_arr.length - 1].init(tx, ty)
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
