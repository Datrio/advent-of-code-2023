const fs = require('fs')
const path = require('path')
//const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n')

let lineOffset = 0
let emptyColumnsCheck = Array(lines[0].length).fill(false)

const universeEnlarge = 1

let galaxies = []

for (const [lineIndex, line] of lines.entries()) {
  // no galaxies in line
  if (line.indexOf("#") === -1) {
    lineOffset += universeEnlarge

    continue
  }

  for (let index = 0; index < line.length; index++) {
    if (line[index] === '#') {
      galaxies.push([lineIndex + lineOffset, index])

      // mark column as potentially empty
      emptyColumnsCheck[index] = true
    }
  }
}

// expand the columns
let charOffset = 0

const emptyColumnIncrease = (v) => {
  if (!v){
    charOffset += universeEnlarge
  }
  return charOffset
}

const emptyColumnsOffset = emptyColumnsCheck.map(emptyColumnIncrease)

galaxies = galaxies.map(([x, y]) => [x, y + emptyColumnsOffset[y]])

// distances - forEach/slice would be nicer, but takes too long
let sum = 0

const shortestPath = (start, end) => {
  const [x1, y1] = start;
  const [x2, y2] = end;

  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

for (let i = 0; i < galaxies.length; i++) {
  for (let j = i + 1; j < galaxies.length; j++) {    
    sum += shortestPath(galaxies[j], galaxies[i])
  }
}

console.log(sum)