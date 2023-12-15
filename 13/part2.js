const fs = require('fs')
const path = require('path')
//const puzzles = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim().split('\n\n')
const puzzles = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim().split('\n\n')

const allowedDifference = 1

const countDifferentBits = (num1, num2) => {
  let xor = num1 ^ num2, count = 0
  while (xor > 0) {
    count += xor & 1
    xor >>= 1
  }
  return count
}

const lineToBitNumber = line => line.split('').reduce((num, bit, index) => bit === '.' ? num | (1 << index) : num, 0)

const puzzleSolutions = puzzles.map(puzzle => {
  const lines = puzzle.split('\n')
  const bitNumbers = lines.map(line => lineToBitNumber(line))
  const bitNumbersRotated = Array.from({ length: lines[0].length }, (_, k) => 
    lines.reduce((num, line) => line[k] === '.' ? num | (1 << lines.indexOf(line)) : num, 0)
  )

  const checkSolution = (bitNumbers) => {
    for (let i = 1; i < bitNumbers.length; i++) {
      const difference = countDifferentBits(bitNumbers[i], bitNumbers[i - 1])

      if (difference <= allowedDifference) {
        let totalDifference = 0

        for (
          let j = i - 1,
              k = i;
            j >= 0 && k < bitNumbers.length;
            j--, k++
        ) {
          totalDifference += countDifferentBits(bitNumbers[j], bitNumbers[k])

          if (totalDifference > allowedDifference) break
        }

        if (totalDifference === allowedDifference) {
          return i
        }
      }
    }
  }

  const h = checkSolution(bitNumbers)
  const v = h ? 0 : checkSolution(bitNumbersRotated)

  return { h, v }
})

const solution = puzzleSolutions.reduce((sum, {h = 0, v = 0}) => sum + h * 100 + v, 0)

console.log(solution)

