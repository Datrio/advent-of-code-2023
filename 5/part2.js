// solution devised after following @joxter's approach
// https://github.com/Joxter/advent-of-code/

const fs = require('fs')
const path = require('path')
//const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim()
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim()

let [seedsRaw, ...paths] = lines.split('\n\n')

let seeds = seedsRaw.substring(7).split(' ').map(Number)

let seedRanges = []

for (let i = 0; i < seeds.length; i += 2) {
  seedRanges.push([seeds[i], seeds[i + 1], seeds[i] + seeds[i + 1]])
}

paths.forEach(path => {
  let [, ...ranges] = path.split('\n')
  let newSeedRanges = [...seedRanges]
  
  ranges.forEach(r => {
    let [destination, source, len] = r.split(' ').map(Number)
    let ruleRange = [source, len, source + len]
    
    seedRanges.forEach(seedRange => {
      let overlap = getOverlapOfRanges(ruleRange, seedRange)
      
      if (overlap) {
        newSeedRanges = newSeedRanges.filter(sr => sr !== seedRange)
        
        let restRanges = removeRange(seedRange, overlap)
        if (restRanges.length) {
          newSeedRanges.push(...restRanges)
        }
        
        overlap[0] += destination - source
        overlap[2] += destination - source
        
        if (overlap[0] > overlap[1]) {
          newSeedRanges.push(overlap)
        }
      }
    })
  })

  seedRanges = newSeedRanges
})

console.log(Math.min(...seedRanges.map(r => r[0])))

function getOverlapOfRanges(r1, r2) {
  let overlapStart = Math.max(r1[0], r2[0])
  let overlapEnd = Math.min(r1[2], r2[2])
  
  return overlapStart < overlapEnd ? [overlapStart, overlapEnd - overlapStart, overlapEnd] : false
}

function removeRange(r1, r2) {
  let [start1, , end1] = r1
  let [start2, , end2] = r2
  
  let result = []
  if (start2 > start1) result.push([start1, start2 - start1, start2])
  if (end2 < end1) result.push([end2, end1 - end2, end1])
  
  return result
}