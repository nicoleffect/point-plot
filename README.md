# point-plot

dot and line, dots to dots connect

[demo -->](https://nicolesite.github.io/point-plot/examples/index.html)

## mode

```
amd、cjs、es、iife、umd
```

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

<script src="https://nicolesite.github.io/point-plot/dist/point-plot.umd.min.js"></script>
<script>
  const canvas = document.getElementById('canvas')
  pointPlot({ canvas })
</script>

```
