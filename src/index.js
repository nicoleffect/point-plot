import PointPlot from './PointPlot'


const pointPlot = ({ canvas, color = '255, 255, 255', r = 3, distance = 100, isConnect = true, isOnClick = true, isOnMove = true }) => {
  return new PointPlot({ canvas, color, r, distance, isConnect, isOnClick, isOnMove })
}

export default pointPlot
