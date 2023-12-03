const fs = require('fs')
const path = require('path')
const lines = fs.readFileSync(path.join(__dirname, 'example.txt'), { encoding: 'utf8' }).split('\n')
//const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).split('\n')
