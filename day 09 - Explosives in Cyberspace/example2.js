var fs = require('fs');

const unzipLen = (s, rec = false) => {
    let [sum, i] = [0, 0];
    while (i < s.length) {
        if (s[i] !== '(') {
            [sum, i] = [sum + 1, i + 1];
            continue;
        }
        const [m, next, repeat] = s.slice(i).match(/\((\d+)x(\d+)\)/),
            sectEnd = i + m.length + (+next),
            sectLen = (+repeat) * (rec ? unzipLen(s.slice(i + m.length, sectEnd), rec) : +next);
        [sum, i] = [sum + sectLen, sectEnd];
    }

    return sum;
};

var input = fs.readFileSync('./input.txt', 'utf8');
//var input = '(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN';
console.log('PART 1 -> ' + unzipLen(input));
console.log('PART 2 -> ' + unzipLen(input, true));