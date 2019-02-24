exports.displayAreaCode = areaCode => `(${areaCode})`

exports.displayNumber = num => `(${num.substr(0,3)}) ${num.slice(3,6)}-${num.slice(6,10)}`

exports.internationalNumber = number => `+1${number}`
