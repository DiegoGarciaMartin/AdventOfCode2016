var fs = require('fs');


function calculateAway (instructions){
	
	var posHorizontal = 0;
	var posVertical = 0;
	var direction = 'N'; // N -> North, S -> South, E -> East, W -> West

	var i = 0;
	var numBlocks = 0;
	while (i < instructions.length){
		
		if (instructions[i].includes('L')){
			
			numBlocks = parseInt(instructions[i].replace('L',''));

			if (direction == 'N'){
				direction = 'W';
			} else if (direction == 'S'){
				direction = 'E';
			} else if (direction == 'E'){
				direction = 'N';
			} else if (direction == 'W'){
				direction = 'S';
			}

		} else if (instructions[i].includes('R')){
			
			numBlocks = parseInt(instructions[i].replace('R',''));

			if (direction == 'N'){
				direction = 'E';
			} else if (direction == 'S'){
				direction = 'W';
			} else if (direction == 'E'){
				direction = 'S';
			} else if (direction == 'W'){
				direction = 'N';
			}

		}

		if (direction == 'N'){
			posVertical += numBlocks;
		} else if (direction == 'S'){
			posVertical -= numBlocks;
		} else if (direction == 'E'){
			posHorizontal += numBlocks;
		} else if (direction == 'W'){
			posHorizontal -= numBlocks;
		}
		
		i++;
	}

	var away = Math.abs(posHorizontal) + Math.abs(posVertical);

	return away;

}


var input = fs.readFileSync('./input.txt', 'utf8');
var instructions = input.split(', ');


console.log('\n-------------------------------------------');
console.log('                 PART 1                      ');
console.log('-------------------------------------------\n');

var test1 = ['R2', 'L3'];
var test2 = ['R2', 'R2', 'R2'];
var test3 = ['R5', 'L5', 'R5', 'R3'];

console.log('\nAWAY TEST1 [' + test1 + '] -> ' + calculateAway(test1));
console.log('AWAY TEST2 [' + test2 + '] -> ' + calculateAway(test2));
console.log('AWAY TEST3 [' + test3 + '] -> ' + calculateAway(test3));

console.log('\nAWAY -> ' + calculateAway(instructions));
