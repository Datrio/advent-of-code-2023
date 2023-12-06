const fs = require('fs')
const path = require('path')
//const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n')

const data = [{
  time: Number(lines[0].substring(5).trim().split(/\s+/).join('')),
  distance: Number(lines[1].substring(9).trim().split(/\s+/).join(''))
}]

const finalResult = data.reduce((sum, { distance, time }) => {
  // creating the array from part1 for reducing works as well,
  // but takes too long, use a straight for loop instead
  let successCount = 0

  for (let timeHeld = 1; timeHeld <= time; timeHeld++) {
    const travelTime = time - timeHeld
    const travelSpeed = timeHeld

    const distanceTraveled = travelSpeed * travelTime

    if (distanceTraveled >= distance) {
      successCount++
    }
  }

  return sum * successCount
}, 1)

console.log(finalResult)