const fs = require('fs')
const path = require('path')
//const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n')

const result = lines.reduce((sum, line) => {
  let recalculatedLines = [line.split(' ').map(Number)]
  let newLine = []
  let zeroCount = 0

  do {
    const checkLine = recalculatedLines[recalculatedLines.length - 1]
    newLine = []
    zeroCount = 0
    
    for (let i = 1; i < checkLine.length; i++) {
      newLine.push(checkLine[i] - checkLine[i - 1])

      if (checkLine[i] - checkLine[i - 1] === 0) {
        zeroCount++
      }
    }

    recalculatedLines.push(newLine)
  } while (zeroCount !== recalculatedLines[recalculatedLines.length-1].length)

  let prevValue = recalculatedLines.pop()?.pop()
  let nextValue

  while ((nextValue = recalculatedLines.pop()?.pop()) !== undefined) {
    prevValue = (prevValue) + (nextValue)
  }

  return sum + prevValue
}, 0)

console.log(result)