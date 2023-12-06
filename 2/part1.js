const fs = require('fs')
const path = require('path')
//const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n')

const cubeLimit = {
  red: 12,
  green: 13,
  blue: 14
}

function isValidGame(gameData) {
  return gameData.every(game => {
    const parts = game.split(',').map(part => part.trim().split(' '));
    
    return parts.every(([amount, color]) => cubeLimit[color] >= amount * 1);
  });
}
function prepareLine(line) {
  const [game, data] = line.split(':')
  
  return [game.substring(5), data.split(';')]
}

const result = lines.reduce((sum, line) => {
  const [gameNo, gameData] = prepareLine(line)
  
  if (isValidGame(gameData)) {
    sum += gameNo*1;
  }
  
  return sum
}, 0)

console.log(result)