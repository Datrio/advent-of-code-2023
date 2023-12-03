const fs = require('fs')
const path = require('path')
const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' }).split('\n')

const charCodeZero = '0'.charCodeAt(0)
const charCodeNine = '9'.charCodeAt(0)

const isDigitCode = (n) => {
    return n.charCodeAt(0) >= charCodeZero && n.charCodeAt(0) <= charCodeNine;
}

const sum = lines.reduce((totalSum, l) => {
    return totalSum + parseInt(l.split('').reduce((digits, currentChar) => {
        if (isDigitCode(currentChar)) {
            if (digits.length === 0) {
                digits[0] = currentChar
                digits[1] = currentChar
            } else {
                digits[1] = currentChar
            }
        }

        return digits
    }, []).join(''), 10)
}, 0)

console.log(sum)