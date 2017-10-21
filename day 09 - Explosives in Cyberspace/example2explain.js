var fs = require('fs');

const unzipLen = (s, rec = false) => {
    let [sum, i] = [0, 0];

    console.log('\ns -> ' + s);
    console.log('rec -> ' + rec);
    console.log('sum -> ' + sum);
    console.log('i -> ' + i);
    console.log('\n\n');

    let cont = 1;

    while (i < s.length) {

        console.log('--------------------------------------------');
        console.log('               ITERACCIÓN ' + cont);
        console.log('--------------------------------------------\n');
        
        console.log('\n -> Valores inicio');
        console.log('   sum -> ' + sum);
        console.log('   i -> ' + i);
        console.log('   s[i] -> ' + s[i]);

        if (s[i] !== '(') {
            [sum, i] = [sum + 1, i + 1];
            console.log('\n -> No encuentra abrir parentesis (suma 1 y salta iteraccion)');
            cont++;
            console.log('\n -> Valores fin');
            console.log('   sum -> ' + sum);
            console.log('   i -> ' + i);

            console.log('\n############################################\n');
            continue;
        }

        const [m, next, repeat] = s.slice(i).match(/\((\d+)x(\d+)\)/);
        const sectEnd = i + m.length + (+next);
        const sectLen = (+repeat) * (rec ? unzipLen(s.slice(i + m.length, sectEnd), rec) : +next);

        console.log('\n -> Otros valores');
        console.log('   m -> ' + m);
        console.log('   m.length -> ' + m.length);
        console.log('   next -> ' + next);
        console.log('   repeat -> ' + repeat);
        console.log('   sectEnd -> ' + sectEnd);
        console.log('   sectLen -> ' + sectLen);

        [sum, i] = [sum + sectLen, sectEnd];

        cont++;

        console.log('\n -> Valores fin');
        console.log('   sum -> ' + sum);
        console.log('   i -> ' + i);

        console.log('\n############################################\n');

    }

    return sum;
};

//var input = fs.readFileSync('./input.txt', 'utf8');
var input = '(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN';
console.log('PART 1 -> ' + unzipLen(input));
console.log('PART 2 -> ' + unzipLen(input, true));