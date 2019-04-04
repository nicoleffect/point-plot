# point-plot

dot and line, dots to dots connect

[demo -->](https://nicoleffect.github.io/point-plot/examples/index.html)

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
  r: 4, // default
  distance: 100, // default, distance of dot to dot
  isConnect: true, // default, if you don't need lines, set it false
  isOnClick: true, // default, event for click or touchstart
  isOnMove: true// default
 })

// or

<script src="https://nicoleffect.github.io/point-plot/dist/point-plot.umd.min.js"></script>
<script>
  const canvas = document.getElementById('canvas')
  pointPlot({ canvas })
</script>

```
