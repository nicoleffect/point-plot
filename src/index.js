import DotsConnect from './DotsConnect'


const dotsConnect = ({ canvas, color = '255, 255, 255', r = 4, distance = 100, isAnim = true, isOnClick = true, isOnMove = true }) => {
  return new DotsConnect({ canvas, color, r, distance, isAnim, isOnClick, isOnMove })
}

export default dotsConnect
