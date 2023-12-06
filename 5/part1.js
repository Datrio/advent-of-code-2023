const fs = require('fs')
const path = require('path')
//const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n')

let seeds = lines.shift().substring(7).split(' ').map(Number)

let skipNumbers = {}

lines.forEach(line => {
  if (line.substring(line.length-4) === 'map:') {
    // new category
    skipNumbers = {}
    return
  }
  
  const [destination, source, length] = line.split(' ').map(Number)
  
  seeds = seeds.map(seed => {
    if (seed >= source && seed < source+length && !skipNumbers[seed]) {
      skipNumbers[seed - source + destination] = true
      
      return seed - source + destination
    } else {
      return seed
    }
  })
})

console.log(Math.min(...seeds))