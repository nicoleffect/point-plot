# dots-connect
dots to dots connect
[demo](https://nicolesite.github.io/dots-connect/)

## examples

```
// html
<canvas id="canvas"></canvas>

// js
import dotsConnect from 'dots-connect'

 dotsConnect({ 
  canvas: document.getElementById('canvas'), // require
  color: '255,255,255', // default
  r: 4, // defalut
  distance: 100, // defarlt
  isAnim: true, // default
  isOnClick: true // default
  isOnMove: true// default
 })

// or

dotsConnect({canvas: document.getElementById('canvas')})
```
