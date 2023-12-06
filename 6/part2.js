const fs = require('fs')
const path = require('path')
//const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n')

const times = [Number(lines[0].substring(5).trim().split(/\s+/).join(''))]
const distances = [Number(lines[1].substring(9).trim().split(/\s+/).join(''))]

let finalResult = 1



for(let i = 0; i < times.length; i++) {
  const distance = distances[i]
  const time = times[i]
  let successCount = 0

  for (let timeHeld = 1; timeHeld <= time; timeHeld++) {
    const travelTime = time - timeHeld
    const travelSpeed = timeHeld

    const distanceTraveled = travelSpeed * travelTime

    if (distanceTraveled >= distance) {
      successCount++
    }
  }

  finalResult *= successCount
}

console.log(finalResult)