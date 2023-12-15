const fs = require('fs')
const path = require('path')
//const puzzles = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n\n')
const puzzles = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n\n')

const rotateLines = lines => lines[0].split('').map((_, k) => lines.map(line => line[k]).join(''))

const mirrorReducer = (possibleMirrors, line) => {
  for (let i = 1; i < line.length; i++) {
    const stringLength = Math.min(i, line.length - i)
    const stringLeft = line.substring(i - stringLength, i)
    const stringRightMirrored = line.substring(i, i+i).split('').reverse().join('')
    
    if (stringLeft === stringRightMirrored) {
      possibleMirrors[i] = (possibleMirrors[i] || 0) + 1
    }
  }

  return possibleMirrors
}

const calculateMirrors = lines => {
  const possibleMirrors = lines.reduce(mirrorReducer, {})

  return Object.fromEntries(
    Object.entries(possibleMirrors).map(([k, v]) => [v, k])
  )[lines.length]
}

const result = puzzles.reduce((sum, puzzle) => {
  const lines = puzzle.split('\n')
  const result = calculateMirrors(lines)
  const resultHorizontal = calculateMirrors(rotateLines(lines))

  return sum + (result > -1 ? result * 1 : 0) + (resultHorizontal > -1 ? resultHorizontal * 100 : 0)
}, 0)

console.log(result)