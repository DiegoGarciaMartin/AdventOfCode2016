var fs = require('fs');


function calculateAway (instructions){
	
	var direction = 'N'; // N -> North, S -> South, E -> East, W -> West

	var locationsVisit = {};
	var locationFound = false;

	var posHorizontal = 0;
	var posVertical = 0;

	var i = 0;
	var j = 0;
	var numBlocks = 0;
	while (i < instructions.length && !locationFound){
		
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

		j = 0;
		while (j < numBlocks && !locationFound){

			if (direction == 'N'){
				posVertical++;
			} else if (direction == 'S'){
				posVertical--;
			} else if (direction == 'E'){
				posHorizontal++;
			} else if (direction == 'W'){
				posHorizontal--;
			}
			
			if (locationsVisit[posHorizontal + "," + posVertical] == true){
				locationFound = true;
			} else {
				locationsVisit[posHorizontal + "," + posVertical] = true;
			}
			
			j++;

		}
		
		i++;
	}

	var away = Math.abs(posHorizontal) + Math.abs(posVertical);

	return away;

}


var input = fs.readFileSync('./input.txt', 'utf8');
var instructions = input.split(', ');


console.log('\n-------------------------------------------');
console.log('                 PART 2                      ');
console.log('-------------------------------------------\n');

var test4 = ['R8', 'R4', 'R4', 'R8'];
console.log('AWAY TEST [' + test4 + '] -> ' + calculateAway(test4));

console.log('\nAWAY -> ' + calculateAway(instructions));