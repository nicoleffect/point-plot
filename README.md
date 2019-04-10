# point-plot

dot and line, dots to dots connect

[demo1 -->](https://nicoleffect.github.io/point-plot/examples/index.html)
[demo2 -->](https://nicoleffect.github.io/point-plot/examples/index2.html)

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

```
