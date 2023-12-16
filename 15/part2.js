const fs = require('fs')
const path = require('path')
//const codes = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split(',')
const codes = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split(',')

const hash = code => {
  return code.split('').reduce((hash, char) => {
    return ((hash + char.charCodeAt(0)) * 17) % 256
  }, 0)
}

const focalLengths = {}
const boxes = Array(256).fill(null).map(() => [])

codes.forEach(code => {
  const operation = code.indexOf('-') > -1 ? '-' : '='
  const [label, focal] = code.split(operation)
  const boxNo = hash(label)
  const labelIndex = boxes[boxNo].indexOf(label)
  
  if (operation === '-' && labelIndex > -1) {
    boxes[boxNo].splice(labelIndex, 1)
  } else {
    focalLengths[label] = focal * 1

    if (labelIndex === -1) {
      boxes[boxNo].push(label)
    }
  }

  return boxes
}, [])

const totalSum = boxes.reduce((totalSum, box, boxNo) => {
  return box.reduce((sum, label, index) => {
    return sum + ((boxNo + 1) * (index + 1) * focalLengths[label])
  }, totalSum)
}, 0)

console.log(totalSum)