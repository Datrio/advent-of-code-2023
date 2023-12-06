const fs = require('fs')
const path = require('path')
//const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n')

const times = lines[0].substring(5).trim().split(/\s+/).map(Number)
const distances = lines[1].substring(9).trim().split(/\s+/).map(Number)

const data = times.map((time, i) => {
  return {
    time,
    distance: distances[i]
  }
})

let finalResult = data.reduce((sum, { distance, time }) => {
  const timeArray = [...Array(time).keys()].map(x => x + 1)

  const successCount = timeArray.reduce((count, timeHeld) => {
    const travelTime = time - timeHeld
    const travelSpeed = timeHeld
    const distanceTraveled = travelSpeed * travelTime

    return distanceTraveled >= distance ? count + 1 : count
  }, 0)

  return sum * successCount
}, 1)

console.log(finalResult)