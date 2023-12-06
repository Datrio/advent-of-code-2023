const fs = require('fs')
const path = require('path')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).split('\n')

const result = lines.reduce((sum, line) => {
  const [, data] = line.split(':')
  const gameData = data.split(';')
  
  const highestCubes = gameData.reduce((cubes, game) => {
    game.split(',').forEach(i => {
      const [amount, color] = i.trim().split(' ');
      
      cubes[color] = Math.max(cubes[color] || 0, amount * 1);
    });
    
    return cubes;
  }, {});
  
  return sum + highestCubes.red * highestCubes.blue * highestCubes.green
}, 0)

console.log(result)