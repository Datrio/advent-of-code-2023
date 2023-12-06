const fs = require('fs')
const path = require('path')
//const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n')

const result = lines.reduce((totalScore, game) => {
  const [, gameData] = game.split(': ')
  const [winningNumbersArray, gameNumbersArray] = gameData.trim().split(' | ').map(s => s.split(/\s+/).sort())
  
  // reverse the array to an object which we can lookup the results from
  const gameNumbers = gameNumbersArray.reduce((acc, num) => (acc[num] = 1, acc), {});
  
  const score = winningNumbersArray.reduce((sum, number) => {
    if (gameNumbers[number]) {
      // if it's a winner, multiply by 2
      return !sum ? 1 : sum * 2
    } else {
      return sum
    }
  }, 0)
  
  return totalScore + score
}, 0)

console.log(result)