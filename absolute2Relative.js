// [note] https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths
/**
 * 1. move
 *         M x y
 *         m dx dy
 * 2. line
 *         L x y
 *         l dx dy
 * 3. horizontal
 *         H x (or h dx)
 * 4   vertical
 *         V y (or v dy)
 * 5. end
 *         Z z
 * 6. Bezier curve
 *         C x1  y1,  x2  y2,  x  y  (or c dx1 dy1, dx2 dy2, dx dy)
 * 7. after C or c --> S s
 *         S x2 y2, x y (or s dx2 dy2, dx dy)
 * 8. quadratic Bezier curve
 *         Q x1 y1, x y (or q dx1 dy1, dx dy)
 * 9. after Q or q --> T t
 *         T x y (or t dx dy)
 * 10. arc
 *          A rx ry x-axis-rotation large-arc-flag sweep-flag x y
 *          a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
 */ 
// commandLine map
let commandMapSize = {
    M: 2,
    L: 2,
    Q: 4,
    T: 2,
    H: 1, // x
    V: 1, // y
    C: 6,
    S: 4,
    A: 7, // 曲线
    Z: -1
}

// number regex
const numnicReg = /[0-9.\-]{1,}/g
// command and number regex
const commandNumnicReg =  /[MLQTHVCSA]|[0-9.\s\,\-]*/g
// demo path
let demo_str = 'M 4 2 Q 4 1.2 3.4 0.6 2.8 0 2 0 1.2 0 0.6 0.6 0 1.2 0 2 0 2.8 0.6 3.4 1.2 4 2 4 2.8 4 3.4 3.4 4 2.8 4 2 M 3.1 0.9 Q 3.6 1.3 3.6 2 3.6 2.7 3.1 3.1 2.6 3.6 2 3.6 1.3 3.6 0.8 3.1 0.4 2.7 0.4 2 0.4 1.3 0.8 0.9 1.3 0.4 2 0.4 2.6 0.4 3.1 0.9 Z'
let sword = 'M 4 8 L 10 1 L 13 0 L 12 3 L 5 9 C 6 10 6 11 7 10 C 7 11 8 12 7 12 A 1.42 1.42 0 0 1 6 13 A 5 5 0 0 0 4 10 Q 3.5 9.9 3.5 10.5 T 2 11.8 T 1.2 11 T 2.5 9.5 T 3 9 A 5 5 90 0 0 0 7 A 1.42 1.42 0 0 1 1 6 C 1 5 2 6 3 6 C 2 7 3 7 4 8 M 10 1 L 10 3 L 12 3 L 10.2 2.8 L 10 1'
function convertstandardCommand(pathStr) {
    if(typeof pathStr !== 'string') return
    let path = pathStr.trim()
    let commndCorssNumnic = path.match(commandNumnicReg)
    let len = commndCorssNumnic.length
    let allCommand = []
    for(let i = 1; i < len; i += 2) {
        commndCorssNumnic[i] = commndCorssNumnic[i].match(numnicReg)
        let cmd = commndCorssNumnic[i-1]
        allCommand = allCommand.concat(sliceSection(cmd, commandMapSize[cmd], commndCorssNumnic[i] || []))
    }
    return allCommand
}

function sliceSection(cmd, size, coords) {
    let total = coords.length
    if (total % size !== 0) { 
        console.log('error', cmd, total, size, coords)
        throw 'coords length is not size multiple' 
    }
    let len = total / size
    let newCommand = []
    for (let i = 0; i < len; i++) {
        newCommand.push({cmd: cmd, coords: coords.slice(i * size, (i + 1) * size)})
    }
    return newCommand
}

function abasolute2relative(path) {
    let commands = convertstandardCommand(path)
    let tail = commands.length - 1
    let prev_x = 0
    let prev_y = 0
    let last, prev
    while (tail > 0) {
        last = commands[tail]
        prev = commands[tail - 1]
        prev_x = prev.coords[prev.coords.length - 2]
        prev_y = prev.coords[prev.coords.length - 1]
        switch(last.cmd) {
            case 'H': 
                last.coords[0] = last.coords[0] - prev_x; 
                break;
            case 'V': 
                last.coords[0] = last.coords[0] - prev_y;  
                break;
            case 'A':
                last.coords[5] = last.coords[5] - prev_x;
                last.coords[6] = last.coords[6] - prev_y;
                break;
            case 'M':
            case 'L':
            case 'Q':
            case 'T':
            case 'C':
            case 'S':
                last.coords.forEach((coord, index) =>{
                    if(index % 2 === 0) {
                        last.coords[index] = coord - prev_x
                    } 

                    if(index % 2 === 1) {
                        last.coords[index] = coord - prev_y
                    } 
                })
        }
        last.cmd = last.cmd.toLowerCase();
        tail--;
    }
    commands[0].cmd = 'm'
    return commands
}

function setStartMovePoint(commands, x, y) {
    commands.coords[0] = x
    commands.coords[1] = y
}

function toPathString(commands) {
    return commands.map((cmd) =>{
        return `${cmd.cmd} ${cmd.coords.join(' ')}`
    }).join(' ') + ' Z'
}

console.log(convertstandardCommand(sword))

console.log(setStartMovePoint(abasolute2relative(sword), 100, 100))