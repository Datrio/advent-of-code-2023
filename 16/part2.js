const fs = require('fs')
const path = require('path')
//const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n')

const move = (y, x, changeY, changeX, cachedTiles = new Set(), cachedTilesWithDirections = new Set()) => {
  let newY = y + changeY
  let newX = x + changeX

  const tileKey = `${newY},${newX}`
  const directionKey = `${tileKey},${changeY},${changeX}`

  let count = 0

  if (newY < 0 || newY >= lines.length || newX < 0 || newX >= lines[0].length) return 0
  if (cachedTilesWithDirections.has(directionKey)) return 0
  if (!cachedTiles.has(tileKey)) count = 1

  cachedTiles.add(tileKey)
  cachedTilesWithDirections.add(directionKey)

  switch (lines[newY][newX]) {
    case '.':
      return count + move(newY, newX, changeY, changeX, cachedTiles, cachedTilesWithDirections)
    case '\\':
      return count + move(newY, newX, changeX, changeY, cachedTiles, cachedTilesWithDirections) // flip x/y
    case '/':
      return count + move(newY, newX, -changeX, -changeY, cachedTiles, cachedTilesWithDirections) // flip and reverse x/y
    case '-':
      if (changeX === 1 || changeX === -1) {
        return count + move(newY, newX, changeY, changeX, cachedTiles, cachedTilesWithDirections)
      } else if (changeY === -1 || changeY === 1) {
        return count + move(newY, newX, 0, 1, cachedTiles, cachedTilesWithDirections) + move(newY, newX, 0, -1, cachedTiles, cachedTilesWithDirections)
      }
    case '|':
      if (changeY === 1 || changeY === -1) {
        return count + move(newY, newX, changeY, changeX, cachedTiles, cachedTilesWithDirections)
      } else if (changeX === 1 || changeX === -1) {
        return count + move(newY, newX, 1, 0, cachedTiles, cachedTilesWithDirections) + move(newY, newX, -1, 0, cachedTiles, cachedTilesWithDirections)
      }
  }
}

let results = []

for (let x = 0; x < lines[0].length; x++) {
  results.push(move(-1, x, 1, 0))
  results.push(move(lines.length, x, -1, 0))
}

for (let y = 0; y < lines.length; y++) {
  results.push(move(y, -1, 0, 1))
  results.push(move(y, lines[0].length, 0, -1))
}

console.log(Math.max(...results))