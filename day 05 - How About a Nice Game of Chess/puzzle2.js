var crypto = require('crypto');

function calculatePassword(roomId){

	var password = {};

	var i = 0;
	var md5RoomHash = null;
	var charsFound = 0;
	while (charsFound < 8){

		md5RoomHash = crypto.createHash('md5').update(roomId + i).digest('hex');
		
		if (md5RoomHash.substring(0, 5) == '00000'){

			if (!isNaN(md5RoomHash.charAt(5))){

				var pos = parseInt(md5RoomHash.charAt(5));

				if (pos >=0 && pos <= 7){

					if (password[pos] == null){
						password[pos] = md5RoomHash.charAt(6);
						charsFound++;
					}

				}

			}

		}

		i++;

	}

	var passwordStr = '';

	i = 0;
	while (i < 8){
		passwordStr = passwordStr + password[i];
		i++;
	}

	return passwordStr;

}


console.log('\n-------------------------------------------');
console.log('                 PART 2                      ');
console.log('-------------------------------------------\n');

var input = 'reyedfim';
var test1 = 'abc';

console.log('PASSWORD TEST1 -> ' + calculatePassword(test1));

console.log('PASSWORD -> ' + calculatePassword(input) + '\n');