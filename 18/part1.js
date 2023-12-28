const fs = require('fs')
const path = require('path')
//const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n')

const shoelaceFormula = function(polygon) {
  const length = polygon.length

  let sum = 0

  for (let i = 0; i < length - 1; i++) {
    const [y1, x1] = polygon[i]
    const [y2, x2] = polygon[i + 1]

    sum += x1 * y2 - y1 * x2
  }

  return Math.abs(sum) / 2
}

const dirs = {
  U: [-1, 0],
  D: [1, 0],
  L: [0, -1],
  R: [0, 1]
}

const polygon = lines.map(line => {
  const [dir, lengthRaw] = line.split(' ')
  const length = Number(lengthRaw)

  return { dir, length }
}).reduce((acc, { dir, length }) => {
  const [y, x] = acc[acc.length - 1]

  const changeY = dirs[dir][0]
  const changeX = dirs[dir][1]

  for (let i = 1; i <= length; i++) {
    acc.push([y + i * changeY, x + i * changeX])
  }

  return acc
}, [[0, 0]])

const perimeter = polygon.length - 1
const area = shoelaceFormula(polygon)
const interiorArea = area - (perimeter / 2) + 1

console.log(interiorArea + perimeter)