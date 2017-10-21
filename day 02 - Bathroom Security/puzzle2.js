var fs = require('fs');

var keypad = [[null,  null, '1',  null, null], 
			  [null,  '2',  '3',  '4',  null], 
			  [ '5',  '6',  '7',  '8',  '9'], 
			  [null,  'A',  'B',  'C',  null], 
			  [null, null,  'D',  null, null]];

function calculateCode(instructions){

	var code = '';

	// Default position at keypad -> Number 5
	var posX = 0;
	var posY = 2;

	var i = 0;
	var instruction = null;
	while (i < instructions.length){

		instruction = instructions[i].split('');

		// Process the instruction line and move positions on the keypad
		var j = 0;
		while (j < instruction.length){

			if ((instruction[j] == 'U') && ((posY - 1) >= 0) && (keypad[posY - 1][posX] != null)){
				posY--;
			} else if ((instruction[j] == 'D') && ((posY + 1) <= 4) && (keypad[posY + 1][posX] != null)){
				posY++;
			} else if ((instruction[j] == 'L') && ((posX - 1) >= 0) && (keypad[posY][posX - 1] != null)){
				posX--;
			} else if ((instruction[j] == 'R') && ((posX + 1) <= 4) && (keypad[posY][posX + 1] != null)){
				posX++;
			}

			j++;
		}

		// After proccess the instruction line, copy de number of keypad on the finish position to the code
		code = code + keypad[posY][posX];

		i++;

	}

	return code;

}


var input = fs.readFileSync('./input.txt', 'utf8');
var instructions = input.split('\r\n');


console.log('\n-------------------------------------------');
console.log('                 PART 2                      ');
console.log('-------------------------------------------\n');

var test1 = ['ULL', 'RRDDD', 'LURDL', 'UUUUD'];

console.log('CODE TEST1 [' + test1 + '] -> ' + calculateCode(test1));


console.log('\nCODE -> ' + calculateCode(instructions) + '\n');
