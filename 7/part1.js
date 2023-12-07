const fs = require('fs')
const path = require('path')
//const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n')

const strengths = {
  'A': 14,
  'K': 13,
  'Q': 12,
  'J': 11,
  'T': 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2
}

const gameTypes = ['high', 'pair', 'pair2', 'three', 'full', 'four', 'five']

// parse the data
const games = lines.reduce((games, line) => {
  const [game, bet] = line.split(' ')
  let charCounts = {}
  let maxCharCount = 0
  let secondMaxCharCount = 0

  for (let char of game) {
    charCounts[char] = (charCounts[char] || 0) + 1

    if (charCounts[char] > maxCharCount) {
      maxCharCount = charCounts[char]
    } else if (charCounts[char] > secondMaxCharCount) {
      secondMaxCharCount = charCounts[char]
    }
  }

  const gameType = maxCharCount === 5 ? 'five' :
    maxCharCount === 4 ? 'four' :
    maxCharCount === 3 && secondMaxCharCount === 2 ? 'full' :
    maxCharCount === 3 ? 'three' :
    maxCharCount === 2 && secondMaxCharCount === 2 ? 'pair2' :
    maxCharCount === 2 ? 'pair' : 'high';

  games[gameType].push({
    game,
    bid: Number(bet)
  })
  
  return games
}, Object.fromEntries(gameTypes.map(t => [t, []])))

// sort the games by strength
gameTypes.forEach(gameType => games[gameType].sort((a, b) => {
  for (let i = 0; i < 5; i++) {
    const diff = strengths[a.game[i]] - strengths[b.game[i]]
    if (diff !== 0) return diff
  }
}))

// calculate the score
let i = 1

let sum = gameTypes.reduce((totalSum, gameType) => {
  return games[gameType].reduce((sum, game) => {
    return sum + game.bid * i++
  }, totalSum);
}, 0);

console.log(sum)
