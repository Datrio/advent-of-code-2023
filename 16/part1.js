const fs = require('fs')
const path = require('path')
//const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n')

let start = {
  x: -1,
  y: 0
}
let cachedTiles = {}
let cachedTilesWithDirections = {}
const visitedMap = lines.map(() => Array(lines[0].length).fill('.'));

const move = (y, x, changeY, changeX) => {
  let newY = y + changeY
  let newX = x + changeX
  const tileKey = `${newY},${newX}`
  const directionKey = `${tileKey},${changeY},${changeX}`

  if (newY < 0 || newY >= lines.length || newX < 0 || newX >= lines[0].length) return
  if (cachedTilesWithDirections[directionKey]) return

  cachedTiles[tileKey] = true
  cachedTilesWithDirections[directionKey] = true

  visitedMap[newY][newX] = '#'

  let newChar = lines[newY][newX]

  switch (newChar) {
    case '.':
      move(newY, newX, changeY, changeX)
      break
    case '\\':
      move(newY, newX, changeX, changeY) // flip x/y
      break
    case '/':
      move(newY, newX, -changeX, -changeY) // flip and reverse x/y
      break
    case '-':
      if (changeX === 1 || changeX === -1) {
        move(newY, newX, changeY, changeX)
      } else if (changeY === -1 || changeY === 1) {
        move(newY, newX, 0, 1)
        move(newY, newX, 0, -1)
      }
      break
    case '|':
      if (changeY === 1 || changeY === -1) {
        move(newY, newX, changeY, changeX)
      } else if (changeX === 1 || changeX === -1) {
        move(newY, newX, 1, 0)
        move(newY, newX, -1, 0)
      }
      break
  }
}

move(start.y, start.x, 0, 1)

console.log(Object.keys(cachedTiles).length)