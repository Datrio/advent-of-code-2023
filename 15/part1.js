const fs = require('fs')
const path = require('path')
//const codes = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split(',')
const codes = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split(',')

const total = codes.reduce((totalSum, code) => {
  return totalSum + code.split('').reduce((hash, char) => {
    return ((hash + char.charCodeAt(0)) * 17) % 256
  }, 0)
}, 0)

console.log(total)