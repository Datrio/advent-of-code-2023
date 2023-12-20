const fs = require('fs')
const path = require('path')
//const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n')

function getAllOrderedCombinations(inputData, trueCountsStr) {
  const trueCounts = trueCountsStr.split(',').map(Number)
  let combinations = []
  
  // AI generated recursive function
  // Recursive function to generate combinations
  function generateCombination(startIndex, depth, combination) {
    if (depth === trueCounts.length) {
      // Fill the rest of the array with false
      let newCombination = [...combination]
      for (let j = 0; j < inputData.length - combination.length; j++) {
        if (inputData[newCombination.length] === '#') {
            return
        }
        newCombination.push(false)
      }
      combinations.push(newCombination)
      return
    }
    
    let maxTrueIndex = inputData.length - trueCounts.slice(depth).reduce((a, b) => a + b) - (trueCounts.length - depth - 1)
    for (let i = startIndex; i <= maxTrueIndex; i++) {
      // Create a new combination with false values followed by a true group
      let newCombination = [...combination]
      let skip = false
      for (let j = 0; j < i - combination.length; j++) {
        if (inputData[newCombination.length] === '#') {
            skip = true
        }
        newCombination.push(false)
      }
      for (let j = 0; j < trueCounts[depth]; j++) {
        if (inputData[newCombination.length] === '.') {
            skip = true
        }
        newCombination.push(true)
      }

      // Recurse to the next depth
      if (!skip) {
        generateCombination(i + trueCounts[depth] + 1, depth + 1, newCombination)
      }
    }
  }
  
  generateCombination(0, 0, [])
  return combinations
}

console.log(lines.reduce((sum, line) => {
  const [data, countsRaw] = line.split(' ')

  return sum + getAllOrderedCombinations(data, countsRaw).length
}, 0))
