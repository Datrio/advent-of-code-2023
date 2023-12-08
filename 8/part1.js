const fs = require('fs')
const path = require('path')
//const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n')

const [dirs, , ...pathsRaw] = lines

const paths = pathsRaw.reduce((acc, line) => {
  const [path, val] = line.split(' = ');
  acc[path] = [val.substring(1, 4), val.substring(6, 9)];
  return acc
}, {})

let currentKey = 'AAA'
let i = 0

while(currentKey !== 'ZZZ') {
  currentKey = dirs[i % dirs.length] === 'R' ? paths[currentKey][1] : paths[currentKey][0]

  i++
}

console.log(i)