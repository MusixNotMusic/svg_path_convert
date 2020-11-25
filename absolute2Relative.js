// 数字正则
const numnicReg = /[0-9.]{1,}/g
// 命令 数字正则
const commandNumnicReg =  /[MLQCHVZST]|[0-9\.\s\,]*/g
// map
let commndCorssNumnic = []
// commandLine map
let commandMapLen = {
    M: 2,
    L: 2,
    Q: 4,
    T: 2,
    H: -1, // x
    V: -2, // y
    C: 6,
    S: 4
}
// demo path
let demo_str = 'M 4 2 Q 4 1.2 3.4 0.6 2.8 0 2 0 1.2 0 0.6 0.6 0 1.2 0 2 0 2.8 0.6 3.4 1.2 4 2 4 2.8 4 3.4 3.4 4 2.8 4 2 M 3.1 0.9 Q 3.6 1.3 3.6 2 3.6 2.7 3.1 3.1 2.6 3.6 2 3.6 1.3 3.6 0.8 3.1 0.4 2.7 0.4 2 0.4 1.3 0.8 0.9 1.3 0.4 2 0.4 2.6 0.4 3.1 0.9 Z'
function convert(pathStr) {
    if(typeof pathStr !== 'string') return
    let path = pathStr.trim()
    commndCorssNumnic = path.match(commandNumnicReg)
    let len = commndCorssNumnic.length
    for(let i = 1; i < len; i += 2) {
        commndCorssNumnic[i] = commndCorssNumnic[i].match(numnicReg)
        // commndCorssNumnic[i] = commndCorssNumnic[i].map((num) => +num)
    }
    
}

console.log(convert(demo_str))