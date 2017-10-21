var fs = require('fs');


function calculateMessage (messagesCorrupt){

	var message = '';

	var columnsLetters = new Array(); // 1 object per column, every object save de letters and the count of the column

	var i = 0;
	while (i < messagesCorrupt[0].length){
		columnsLetters.push({});
		i++;
	}

	i = 0;
	while (i < messagesCorrupt.length){

		var j = 0;
		while (j < messagesCorrupt[i].length){

			if (columnsLetters[j][messagesCorrupt[i].charAt(j)] == null){
				columnsLetters[j][messagesCorrupt[i].charAt(j)] = 1;
			} else {
				columnsLetters[j][messagesCorrupt[i].charAt(j)]++;
			}


			j++;
		}

		i++;

	}

	i = 0;
	while (i < columnsLetters.length){

		// Order the letters for the integer value, and if it is equal, for the alphabetically value
		var orderLetters = Object.keys(columnsLetters[i]).sort(function(a,b){

			if (columnsLetters[i][b] != columnsLetters[i][a]){
				return columnsLetters[i][b]-columnsLetters[i][a];
			} else {
				return a.localeCompare(b);
			}
			
		});
		
		message = message + orderLetters[0];

		i++;
	}

	return message;

}


var input = fs.readFileSync('./input.txt', 'utf8');
var messagesCorrupt = input.split('\r\n');


console.log('\n-------------------------------------------');
console.log('                 PART 1                      ');
console.log('-------------------------------------------\n');

var test1 = ['eedadn',
			 'drvtee',
			 'eandsr',
			 'raavrd',
			 'atevrs',
			 'tsrnev',
			 'sdttsa',
			 'rasrtv',
			 'nssdts',
			 'ntnada',
			 'svetve',
			 'tesnvt',
			 'vntsnd',
			 'vrdear',
			 'dvrsen',
			 'enarar'];

console.log('MESSAGE TEST1 -> ' + calculateMessage(test1));

console.log('\nMESSAGE -> ' + calculateMessage(messagesCorrupt) + '\n');