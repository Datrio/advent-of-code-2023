const fs = require('fs')
const path = require('path')
//const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).trim()
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).trim()

const [workflowsRaw, partsRaw] = lines.split('\n\n')

const workflows = workflowsRaw.split('\n').reduce((workflows, line) => {
  const [name, rest] = line.split('{')

  const rules = rest.substring(0, rest.length - 1).split(',')
  
  workflows[name] = {
    falsy: rules.pop(),
    rules: rules.map(rule => {
      const [eval, truthy] = rule.split(':')
      
      if (eval.indexOf('<') > 0) {
        const [attr, val] = eval.split('<')

        return {
          eval: [attr, '<', Number(val)],
          truthy
        }
      } else {
        const [attr, val] = eval.split('>')

        return {
          eval: [attr, '>', Number(val)],
          truthy
        }
      }
    })
  }

  return workflows
}, {})

const parts = partsRaw.split('\n').map(part => {
  const partValues = part.substring(1, part.length - 1).split(',')

  return partValues.reduce((parsedPart, p) => {
    const [attr, val] = p.split('=')
    parsedPart[attr] = Number(val)

    return parsedPart
  }, {})
})

const totalSum = parts.filter(part => {
  let currentWorkflow = 'in'

  while (currentWorkflow !== 'A' && currentWorkflow !== 'R') {
    let newWorkflow
    const rules = workflows[currentWorkflow].rules

    for (let i = 0; i < rules.length; i++) {
      const [a, val, b] = rules[i].eval

      if (val === '<') {
        if (part[a] < b) {
          newWorkflow = rules[i].truthy
          break
        }
      }
      if (val === '>') {
        if (part[a] > b) {
          newWorkflow = rules[i].truthy
          break
        }
      }
    }

    if (newWorkflow) {
      currentWorkflow = newWorkflow
    } else {
      currentWorkflow = workflows[currentWorkflow].falsy
    }
  }

  return currentWorkflow === 'A'
}).reduce((sum, part) => {
  return sum + part.x + part.m + part.a + part.s
}, 0)

console.log(totalSum)