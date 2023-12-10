const fs = require('fs')
const path = require('path')
//const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n')

// find the S element
let oneLineInput = lines.join('')
let locationY = Math.floor(oneLineInput.indexOf('S') / lines[0].length)
let locationX = oneLineInput.indexOf('S') % lines[0].length

const pipeEntries = {
  '-1,0': '|7F',
  '1,0': '|LJ',
  '0,-1': '-LF',
  '0,1': '-J7'
}
const possiblePaths = {
  '|': [[-1, 0], [1, 0]],
  '-': [[0, -1], [0, 1]],
  'L': [[-1, 0], [0, 1]],
  'J': [[-1, 0], [0, -1]],
  'F': [[1, 0], [0, 1]],
  '7': [[1, 0], [0, -1]],
  'S': [[1, 0], [0, -1], [0, 1], [-1, 0]]
}

// recurse all the things
const checkLocations = (y, x, changeY = null, changeX = null, stepCount = 0) => {
  const currentPipe = lines[y][x]

  for (const [pathY, pathX] of possiblePaths[currentPipe]) {
    let nextStep = lines[y + pathY]?.[x + pathX]

    if (-pathY === changeY && -pathX === changeX) {
      continue
    }

    if (nextStep === 'S') {
      return stepCount
    }

    if (pipeEntries[`${pathY},${pathX}`].indexOf(nextStep) > -1) {
      return checkLocations(y + pathY, x + pathX, pathY, pathX, stepCount+1)
    }
  }
}

/* different approach 
const checkLocations = (startY, startX) => {
  let stack = [[startY, startX, null, null, 0]];

  while (stack.length > 0) {
    const [y, x, changeY, changeX, stepCount] = stack.pop();
    const currentPipe = lines[y][x];

    for (const [dy, dx] of possiblePaths[currentPipe]) {
      if (-dy === changeY && -dx === changeX) {
        continue;
      }

      const nextY = y + dy, nextX = x + dx;
      const nextPipe = lines[nextY]?.[nextX];

      if (nextPipe === 'S') {
        return stepCount;
      }

      if (pipeEntries[`${dy},${dx}`].includes(nextPipe)) {
        stack.push([nextY, nextX, dy, dx, stepCount + 1]);
      }
    }
  }
};
*/

let stepCount = checkLocations(locationY, locationX)

console.log(Math.ceil(stepCount/2)) // take the mid point of the path
