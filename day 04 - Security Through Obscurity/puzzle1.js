var fs = require('fs');


function calculateSumIDsRooms (rooms){

	var sumIDs = 0;

	var roomData;
	var roomID;
	var roomChecksum;
	var roomOk = true;

	var listLetters = {};
	var orderLetters = null;

	var i = 0;
	var j = 0;
	while (i < rooms.length){

		roomData = rooms[i].split('-');

		roomID = parseInt(roomData[roomData.length - 1].split('[')[0]);
		roomChecksum = roomData[roomData.length - 1].split('[')[1].replace(']', '');

		roomData.splice(roomData.length - 1 , 1);
		roomData = roomData.join('');
		
		// Sum how many letters there are
		listLetters = {};

		j = 0;
		while (j < roomData.length){

			if (listLetters[roomData.charAt(j)] == null){
				listLetters[roomData.charAt(j)] = 1;
			} else {
				listLetters[roomData.charAt(j)]++;
			}

			j++;
		}

		// Order the letters for the integer value, and if it is equal, for the alphabetically value
		orderLetters = Object.keys(listLetters).sort(function(a,b){
	
			if (listLetters[b] != listLetters[a]){
				return listLetters[b]-listLetters[a];
			} else {
				return a.localeCompare(b);
			}
			
		});

		// Compare chechsum with the ordered letters
		j = 0;
		roomOk = true;
		while (j < roomChecksum.length && roomOk){

			if (roomChecksum.charAt(j) != orderLetters[j]){
				roomOk = false;
			}

			j++;

		}

		if (roomOk){
			sumIDs += roomID;
		}

		i++;

	}

	return sumIDs;	

}


var input = fs.readFileSync('./input.txt', 'utf8');
var rooms = input.split('\r\n');


console.log('\n-------------------------------------------');
console.log('                 PART 1                      ');
console.log('-------------------------------------------\n');

var test1 = ['aaaaa-bbb-z-y-x-123[abxyz]', 'a-b-c-d-e-f-g-h-987[abcde]', 'not-a-real-room-404[oarel]', 'totally-real-room-200[decoy]'];

console.log('CODE TEST1 -> ' + calculateSumIDsRooms(test1));

console.log('SUM IDs OF ROOMS CORRECT -> ' + calculateSumIDsRooms(rooms) + '\n');