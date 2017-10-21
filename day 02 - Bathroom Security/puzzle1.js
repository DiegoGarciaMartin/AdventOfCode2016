var fs = require('fs');

var keypad = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];

function calculateCode(instructions){

	var code = '';

	// Default position at keypad -> Number 5
	var posX = 1;
	var posY = 1;

	var i = 0;
	var instruction = null;
	while (i < instructions.length){

		instruction = instructions[i].split('');

		// Process the instruction line and move positions on the keypad
		var j = 0;
		while (j < instruction.length){

			if (instruction[j] == 'U' && (posY - 1) >= 0){
				posY--;
			} else if (instruction[j] == 'D' && (posY + 1) <= 2){
				posY++;
			} else if (instruction[j] == 'L' && (posX - 1) >= 0){
				posX--;
			} else if (instruction[j] == 'R' && (posX + 1) <= 2){
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
console.log('                 PART 1                      ');
console.log('-------------------------------------------\n');

var test1 = ['ULL', 'RRDDD', 'LURDL', 'UUUUD'];

console.log('CODE TEST1 [' + test1 + '] -> ' + calculateCode(test1));


console.log('\nCODE -> ' + calculateCode(instructions) + '\n');

