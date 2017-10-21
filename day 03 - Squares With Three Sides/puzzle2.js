var fs = require('fs');


function calculateTrianglesPossible (){

	var numTrianglesInc = 0;

	var sideSizesStr = null;

	var tri1 = new Array(); 
	var tri2 = new Array(); 
	var tri3 = new Array();

	var i = 0;
	while (i < triangles.length){
		
		sideSizesStr = triangles[i].trim().split('   ').join(',').split('  ').join(',').split(',');
		
		tri1[0] = parseInt(sideSizesStr[0]);
		tri2[0] = parseInt(sideSizesStr[1]);
		tri3[0] = parseInt(sideSizesStr[2]);

		sideSizesStr = triangles[i + 1].trim().split('   ').join(',').split('  ').join(',').split(',');

		tri1[1] = parseInt(sideSizesStr[0]);
		tri2[1] = parseInt(sideSizesStr[1]);
		tri3[1] = parseInt(sideSizesStr[2]);

		sideSizesStr = triangles[i + 2].trim().split('   ').join(',').split('  ').join(',').split(',');

		tri1[2] = parseInt(sideSizesStr[0]);
		tri2[2] = parseInt(sideSizesStr[1]);
		tri3[2] = parseInt(sideSizesStr[2]);

		if ( ((tri1[0] + tri1[1]) <= tri1[2]) ||
			 ((tri1[0] + tri1[2]) <= tri1[1]) ||
			 ((tri1[1] + tri1[2]) <= tri1[0]) ) {
			numTrianglesInc++;
		}

		if ( ((tri2[0] + tri2[1]) <= tri2[2]) ||
			 ((tri2[0] + tri2[2]) <= tri2[1]) ||
			 ((tri2[1] + tri2[2]) <= tri2[0]) ) {
			numTrianglesInc++;
		}

		if ( ((tri3[0] + tri3[1]) <= tri3[2]) ||
			 ((tri3[0] + tri3[2]) <= tri3[1]) ||
			 ((tri3[1] + tri3[2]) <= tri3[0]) ) {
			numTrianglesInc++;
		}

		i = i + 3;
	}

	return triangles.length - numTrianglesInc;

}


var input = fs.readFileSync('./input.txt', 'utf8');
var triangles = input.split('\r\n');


console.log('\n-------------------------------------------');
console.log('                 PART 2                      ');
console.log('-------------------------------------------\n');

console.log('\TRIANGLES CORRECT -> ' + calculateTrianglesPossible(triangles) + '\n');