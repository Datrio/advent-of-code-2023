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
  '7': [[1, 0], [0, -1]]
}

let insideCount = 0

lines.map(line => {
  let curveState = undefined
  let pipeState = undefined

  line.split('').forEach((char, i) => {
    if (char === '|') pipeState = !pipeState
    if (char === '7' || char === 'J') curveState = false
    if (char === 'L' || char === 'F') curveState = true
    if (char === '.' && pipeState === true && curveState === undefined) {
      insideCount++
      process.stdout.write('I')
    } else {
      process.stdout.write('.')
    }
  })

  process.stdout.write('\n')
})

console.log(insideCount)