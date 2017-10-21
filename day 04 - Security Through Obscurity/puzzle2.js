var fs = require('fs');


function decryptRooms (rooms){

	var roomsDecrypted = new Array();

	var roomData;
	var roomID;
	var roomChecksum;
	var roomName;
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

		// Decrypt de name of the room
		if (roomOk){
			
			roomName = '';
			var password = roomID - (parseInt(roomID/26) * 26);

			j = 0;
			while (j < roomData.length){

				var ascciCodeLetter = roomData.charCodeAt(j);

				ascciCodeLetter = ascciCodeLetter + password;

				if (ascciCodeLetter > 122){
					ascciCodeLetter = ascciCodeLetter - 26;
				}

				roomName = roomName + String.fromCharCode(ascciCodeLetter);

				j++;
			}

			roomsDecrypted.push({'ID': roomID, 'Name': roomName});
			
		}

		i++;

	}

	return roomsDecrypted;	

}


var input = fs.readFileSync('./input.txt', 'utf8');
var rooms = input.split('\r\n');


console.log('\n-------------------------------------------');
console.log('                 PART 2                      ');
console.log('-------------------------------------------\n');

var test1 = ['qzmt-zixmtkozy-ivhz-343[zimth]'];

console.log('CODE TEST1 -> ' + JSON.stringify(decryptRooms(test1)));

var roomsDecrypted = decryptRooms(rooms);

var i = 0;
var found = false;
while (i < roomsDecrypted.length && !found){
	if (roomsDecrypted[i].Name == 'northpoleobjectstorage'){
		found = true;
	} else {
		i++;
	}
}

if (found){
	console.log('\nNorth Pole ID -> ' + roomsDecrypted[i].ID + '\n');
} else {
	console.log('\nNorth Pole not found\n');
}
