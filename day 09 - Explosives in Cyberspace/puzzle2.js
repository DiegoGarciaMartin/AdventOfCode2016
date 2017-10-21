var fs = require('fs');

function decompressSubstring(str){

	var lenStrDecompressed = 0;

	var numberCharacters = 0;
	var repeatTimes = 0;

	var re = new RegExp("(\\D*)(\\((\\d*)x(\\d*)\\))(.*)");
	var match;	/* POS 0 -> All string, 
				   POS 1 -> Not marker string, 
				   POS 2 -> Marker string, 
				   POS 3 -> Number of chars, 
				   POS 4 -> Repeat times, 
				   POS 5 -> Not marker string */

	while (str != '' && (match = re.exec(str)) != null) {
		
		numberCharacters = parseInt(match[3]);
		repeatTimes = parseInt(match[4]);

		if (match[5][0] == '('){
			lenStrDecompressed += match[1].length + (decompressSubstring(match[5].substring(0, numberCharacters)) * repeatTimes);
		} else {
			lenStrDecompressed += match[1].length + (numberCharacters * repeatTimes);
		}
		
		str = match[5].substring(numberCharacters);

	}

	return lenStrDecompressed;

}


var input = fs.readFileSync('./input.txt', 'utf8');


console.log('\n-------------------------------------------');
console.log('                 PART 2                      ');
console.log('-------------------------------------------\n');

console.log('DECOMPRESSED TEST LENGTH -> ' + decompressSubstring('(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN'));

console.log('DECOMPRESSED FILE LENGTH -> ' + decompressSubstring(input));