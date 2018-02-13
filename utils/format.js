exports.displayAreaCode = areaCode => `(${areaCode})`

exports.displayNumber = num => {
    const areaCode = num.substr(0,3)
    const number = `${this.displayAreaCode(areaCode)} ${num.slice(3,6)}-${num.slice(6,10)}`

    return number
}

exports.internationalNumber = number => `+1${number}`
