import PointPlot from './PointPlot'


function pointPlot ({
  canvas,
  color = '255, 255, 255',
  r = 3,
  distance = 80,
  isConnect = true,
  isOnClick = true,
  isOnMove = true
}) {
  return new PointPlot({ canvas, color, r, distance, isConnect, isOnClick, isOnMove })
}

export default pointPlot
