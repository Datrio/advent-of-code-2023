const fs = require('fs')
const path = require('path')
//const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n')

const mapDigits = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6', 
  'seven': '7',
  'eight': '8',
  'nine': '9',
  'zero': '0'
}
const mapToDigit = text => mapDigits[text] || text
const numberRegex = /[0-9]|one|two|three|four|five|six|seven|eight|nine|zero/g

const sum = lines.reduce((sum, l) => {
  const numbers = [...l.matchAll(numberRegex)]
  const digitOne = mapToDigit(numbers[0][0])
  const digitTwo = mapToDigit(numbers.pop()[0])
  
  return sum + parseInt(`${digitOne}${digitTwo}`, 10)
}, 0)

console.log(sum)