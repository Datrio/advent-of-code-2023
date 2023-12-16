const fs = require('fs')
const path = require('path')
//const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n').map(line => line.split(''))
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n').map(line => line.split(''))

const tilt = (grid, direction) => {
  const height = grid.length
  const width = grid[0].length
  const tiltedGrid = Array.from({ length: height }, () => Array(width).fill('.'))
  
  switch (direction) {
    case 'top':
      for (let x = 0; x < width; x++) {
        for (let y = 0, topOffset = 0; y < height; y++) {
          const char = grid[y][x]
    
          if (char === 'O') {
            tiltedGrid[topOffset][x] = char
    
            topOffset = topOffset + 1
          } else if (char === '#') {
            tiltedGrid[y][x] = char
    
            topOffset = y + 1
          }
        }
      }
      break
    case 'left':
      for (let y = 0; y < height; y++) {
        for (let x = 0, leftOffset = 0; x < width; x++) {
          const char = grid[y][x]
    
          if (char === 'O') {
            tiltedGrid[y][leftOffset] = char
    
            leftOffset = leftOffset + 1
          } else if (char === '#') {
            tiltedGrid[y][x] = char
    
            leftOffset = x + 1
          }
        }
      }
      break
    case 'down':
      for (let x = 0; x < width; x++) {
        for (let y = height - 1, bottomOffset = height - 1; y >= 0; y--) {
          const char = grid[y][x]
    
          if (char === 'O') {
            tiltedGrid[bottomOffset][x] = char
    
            bottomOffset = bottomOffset - 1
          } else if (char === '#') {
            tiltedGrid[y][x] = char
    
            bottomOffset = y - 1
          }
        }
      }
      break
    case 'right':
      for (let y = 0; y < height; y++) {
        for (let x = width - 1, rightOffset = width - 1; x >= 0; x--) {
          const char = grid[y][x]
    
          if (char === 'O') {
            tiltedGrid[y][rightOffset] = char
    
            rightOffset = rightOffset - 1
          } else if (char === '#') {
            tiltedGrid[y][x] = char
    
            rightOffset = x - 1
          }
        }
      }
      break
  }

  return tiltedGrid
}

const cycle = grid => {
  return tilt(
    tilt(
      tilt(
        tilt(grid, 'top'),
        'left'
      ),
      'down'
    ),
    'right'
  )
}

const calculateLoad = grid => {
  return grid[0].reduce((total, _, x) => {
    return grid.reduce((sum, line, y) => {
      return sum + (line[x] === 'O' ? grid.length - y : 0)
    }, total)
  }, 0)
}

let grid = lines
let loadDetection = {}
let key
let i
let loadCalculations = []

for (i = 0; i < 1000000000; i++) {
  grid = cycle(grid)
  key = grid.map(l => l.join("")).join("")

  if (loadDetection[key]) break

  loadCalculations.push(calculateLoad(grid))
  loadDetection[key] = i
}

const solutionKey = loadDetection[key] + ((1000000000 - loadDetection[key]) % (i - loadDetection[key])) - 1

console.log(loadCalculations[solutionKey])