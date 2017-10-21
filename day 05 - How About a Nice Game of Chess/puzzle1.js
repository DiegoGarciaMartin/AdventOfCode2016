var crypto = require('crypto');

function calculatePassword(roomId){

	var password = '';

	var i = 0;
	var md5RoomHash = null;
	var charsFound = 0;
	while (charsFound < 8){

		md5RoomHash = crypto.createHash('md5').update(roomId + i).digest('hex');
		
		if (md5RoomHash.substring(0, 5) == '00000'){
			password = password + md5RoomHash.charAt(5);
			charsFound++;
		}

		i++;

	}

	return password;

}


console.log('\n-------------------------------------------');
console.log('                 PART 1                      ');
console.log('-------------------------------------------\n');

var input = 'reyedfim';
var test1 = 'abc';

console.log('PASSWORD TEST1 -> ' + calculatePassword(test1));

console.log('PASSWORD -> ' + calculatePassword(input) + '\n');