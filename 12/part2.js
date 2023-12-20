const fs = require('fs')
const path = require('path')
//const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n')

let z = 0

function containsTrue(arr, startIndex) {
  for (let i = startIndex; i < arr.length; i++) {
    if (arr[i] === true) {
      return true
    }
  }
  return false
}

function getAllOrderedCombinations(inputData, trueCountsStr) {
  const trueCounts = trueCountsStr.split(',').map(Number)
  let inputDataLength = inputData.length
  let trueCountsLength = trueCounts.length
  let cache = {}
  
  // Precompute the sum of trueCounts from each index to the end.
  const trueCountsSum = new Array(trueCountsLength)
  let sum = 0
  for (let i = trueCountsLength - 1; i >= 0; i--) {
    sum += trueCounts[i]
    trueCountsSum[i] = sum
  }
  
  // AI generated recursive function
  // Recursive function to generate combinations
  function generateCombination(startIndex, depth, combinationLength) {
    if (depth === trueCountsLength) {
      return containsTrue(inputData, startIndex) ? 0 : 1
    }
    
    let maxTrueIndex = inputDataLength - trueCountsSum[depth] - trueCountsLength + depth + 1
    let combinationCount = 0

    for (let i = startIndex; i <= maxTrueIndex; i++) {
      let newCombinationLength = combinationLength
      let skip = false
      
      for (let j = 0; j < i - combinationLength; j++) {
        if (inputData[newCombinationLength] === true) {
          skip = true
          break
        }
        newCombinationLength++
      }
      if (!skip) {
        for (let j = 0; j < trueCounts[depth]; j++) {
          if (inputData[newCombinationLength] === false) {
            skip = true
            break
          }
          newCombinationLength++
        }
      }
      
      // Recurse to the next depth and cache the result
      if (!skip) {
        if (cache?.[i + trueCounts[depth] + 1]?.[depth + 1]?.[newCombinationLength]) {
          combinationCount += cache?.[i + trueCounts[depth] + 1]?.[depth + 1]?.[newCombinationLength]
        } else {
          let newCombinationCount = generateCombination(i + trueCounts[depth] + 1, depth + 1, newCombinationLength)

          if (!cache[i + trueCounts[depth] + 1]) {
            cache[i + trueCounts[depth] + 1] = {}
          }
          if (!cache[i + trueCounts[depth] + 1][depth + 1]) {
            cache[i + trueCounts[depth] + 1][depth + 1] = {}
          }
          cache[i + trueCounts[depth] + 1][depth + 1][newCombinationLength] = newCombinationCount

          combinationCount += newCombinationCount
        }
      }
    }

    return combinationCount
  }
  
  return generateCombination(0, 0, 0)
}

const t1 = performance.now()
console.log(lines.reduce((sum, line, index) => {
  const [data, countsRaw] = line.split(' ')
  
  const unfoldedData = Array(5).fill(data).join('?')
  const unfoldedCountsRaw = Array(5).fill(countsRaw).join(',')
  
  const newUnfoldedData = unfoldedData.split('').map(char => {
    if (char === '#') return true
    else if (char === '.') return false
    else return undefined
  })
  console.log('calculating line', index)
  return sum + getAllOrderedCombinations(newUnfoldedData, unfoldedCountsRaw)
}, 0))

console.log(performance.now() - t1)
console.log(z)