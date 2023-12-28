const fs = require('fs')
const path = require('path')
//const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n')

const dirs = {
  '3': [-1, 0],
  '1': [1, 0],
  '2': [0, -1],
  '0': [0, 1]
}

const polygon = lines.map(line => {
  const [,, colorRaw] = line.split(' ')
  const length = parseInt(colorRaw.substring(2, colorRaw.length - 2), 16)
  const dir = colorRaw.substring(colorRaw.length - 2, colorRaw.length - 1)

  return { dir, length }
})

let sum = 0
let perimeterLength = 0
let [y, x] = [0, 0]
let [lastY, lastX] = [0, 0]
let nextY, nextX

for (let i = 0; i < polygon.length; i++) {
  const { dir, length } = polygon[i]

  const [changeY, changeX] = dirs[dir]

  for (let j = 1; j <= length; j++) {
    nextY = y + j * changeY
    nextX = x + j * changeX

    sum += lastX * nextY - lastY * nextX;

    [lastY, lastX] = [nextY, nextX]
  }

  perimeterLength += length;

  // Update the current coordinates
  [y, x] = [nextY, nextX]
}

const perimeter = perimeterLength
const area = Math.abs(sum) / 2
const interiorArea = area - (perimeter / 2) + 1

console.log(interiorArea + perimeter)