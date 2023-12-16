const fs = require('fs')
const path = require('path')
//const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n')

const totalLoad = lines[0].split('').reduce((total, _, columnIndex) => {
  return total + lines.reduce(({ lineLoad, rockCount }, line, rowIndex) => {
    const char = line[columnIndex]

    if (char === 'O') {
      return {
        lineLoad: lineLoad + (lines.length - rockCount),
        rockCount: rockCount + 1
      }
    } else if (char === '#') {
      rockCount = rowIndex + 1
    }
    return { lineLoad, rockCount }
  }, { lineLoad: 0, rockCount: 0 }).lineLoad
}, 0)

console.log(totalLoad)