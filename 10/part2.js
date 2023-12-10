const fs = require('fs')
const path = require('path')
const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n')
//const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n')

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

let pipes = []

const checkLocations = (startY, startX) => {
  let stack = [[startY, startX, null, null, 0]];

  pipes[startY] = []
  pipes[startY][startX] = true

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

        if (!pipes[nextY]) {
          pipes[nextY] = []
        }
        pipes[nextY][nextX] = true
      }
    }
  }
};

checkLocations(locationY, locationX)

let i = 0
for (let y = 0; y < lines.length; y++) {
  let state = false

  for (let x = 0; x < lines[0].length; x++) {
    if (pipes[y][x]) state = !state
    if (state && !pipes[y][x]) {
      i++
    }

    if (pipes[y][x]) {
      process.stdout.write('x')
    } else if (state && !pipes[y][x]) {
      process.stdout.write('I')
    } else {
      process.stdout.write(' ')
    }
  }
  process.stdout.write('\n');
}
console.log(i)