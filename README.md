# point-plot
dots to dots connect
[demo](https://nicolesite.github.io/point-plot/)

## examples

```
// html
<canvas id="canvas"></canvas>

// js

// npm install point-plot
import pointPlot from 'point-plot'

 pointPlot({
  canvas: document.getElementById('canvas'), // require
  color: '255,255,255', // default
  r: 4, // defalut
  distance: 100, // defarlt
  isAnim: true, // default
  isOnClick: true // default
  isOnMove: true// default
 })

// or

<script src="../dist/bundle.iife.js"></script>
<script>
  const canvas = document.getElementById('canvas')
  pointPlot({ canvas })
</script>

```
