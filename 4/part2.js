const fs = require('fs')
const path = require('path')
//const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n')

// create an array filled with 1s where we can keep track of number of cards
const cardCount = Array(lines.length).fill(1)

const numberOfCards = lines.reduce((allCardCount, game, i) => {
  const [, gameData] = game.split(': ')
  const [winningNumbersArray, gameNumbersArray] = gameData.trim().split(' | ').map(s => s.split(/\s+/).sort())
  
  // reverse the array to an object which we can lookup the results from
  const gameNumbers = gameNumbersArray.reduce((acc, num) => (acc[num] = 1, acc), {});
  
  const score = winningNumbersArray.reduce((sum, number) => gameNumbers[number] ? sum + 1 : sum, 0)
  
  // increase the number of next cards
  for (let k = 1; k <= score; k++) {
    cardCount[i + k] += cardCount[i]
  }
  
  return allCardCount + cardCount[i]
}, 0)

console.log(numberOfCards)