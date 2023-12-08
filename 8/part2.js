const fs = require('fs')
const path = require('path')
//const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n')

const [dirs, , ...pathsRaw] = lines

const paths = {}
let startingPaths = []

pathsRaw.forEach(line => {
  const [path, val] = line.split(' = ')
  paths[path] = [val.substring(1, 4), val.substring(6, 9)]

  if (path[2] === 'A') {
    startingPaths.push(path);
  }
});

const listOfI = startingPaths.map(path => {
  let currentKey = path
  let i = 0

  while (currentKey[2] !== 'Z') {
    currentKey = dirs[i % dirs.length] === 'R' ? paths[currentKey][1] : paths[currentKey][0]

    i++
  }

  return i
})

const calculateLCM = (arr) => {
  const gcd2 = (a, b) => b === 0 ? a : gcd2(b, a % b)
  const lcm2 = (a, b) => (a * b) / gcd2(a, b)

  return arr.reduce((lcm, current) => lcm2(lcm, current), 1)
}

console.log(calculateLCM(listOfI));
