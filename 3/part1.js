const fs = require('fs')
const path = require('path')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).split('\n')

function checkSurroundingEnginePart(number, { x, y }) {
  const checkEngineChar = char => char !== '.'
  
  // left & right
  if (checkEngineChar(lines[y]?.[x - 1] ?? '.') || checkEngineChar(lines[y]?.[x + number.length] ?? '.')) {
    return true
  }
  
  // top & bottom
  for (let i = x - 1; i <= x + number.length; i++) {
    if (checkEngineChar(lines[y - 1]?.[i] ?? '.') || checkEngineChar(lines[y + 1]?.[i] ?? '.')) {
      return true
    }
  }
}

const result = lines.reduce((sum, line, y) => {
  for (const match of line.matchAll(/[0-9]+/g)) {
    if (checkSurroundingEnginePart(match[0], { x: match.index, y })) {
      sum += match[0]*1
    }
  }
  
  return sum
}, 0)

console.log(result)