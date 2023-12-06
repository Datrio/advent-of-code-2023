const fs = require('fs')
const path = require('path')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).split('\n')

const gears = {}

function checkSurroundingEnginePart(number, { x, y }) {
  const checkGearChar = char => char === '*';
  
  // left & right
  if (checkGearChar(lines[y]?.[x - 1] ?? '.')) return {x: x - 1, y}
  if (checkGearChar(lines[y]?.[x + number.length] ?? '.')) return {x: x + number.length, y}
  
  // top & bottom
  for (let i = x - 1; i <= x + number.length; i++) {
    if (checkGearChar(lines[y - 1]?.[i] ?? '.')) return {x: i, y: y - 1}
    if (checkGearChar(lines[y + 1]?.[i] ?? '.')) return {x: i, y: y + 1}
  }
}

lines.forEach((line, y) => {
  for (const match of line.matchAll(/[0-9]+/g)) {
    const checkGear = checkSurroundingEnginePart(match[0], { x: match.index, y })
    
    if (checkGear) {
      const gearKey = `${checkGear.x}x${checkGear.y}`
      
      if (!gears[gearKey]) {
        gears[gearKey] = { value: 1, count: 0 };
      }
      
      gears[gearKey].value *= match[0]
      gears[gearKey].count++
    }
  }
})

const result = Object.values(gears).reduce((sum, gear) => {
  return gear.count === 2 ? sum + gear.value : sum
}, 0)

console.log(result)