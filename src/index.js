import DotsConnect from './DotsConnect'


const dotsConnect = ({ canvas, color = '255, 255, 255', r = 4, distance = 100 }) => {
  return new DotsConnect({ canvas, color, r, distance })
}

export default dotsConnect
