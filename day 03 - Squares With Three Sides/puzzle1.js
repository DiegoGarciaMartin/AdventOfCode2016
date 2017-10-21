var fs = require('fs');


function calculateTrianglesPossible (){

	var numTrianglesInc = 0;

	var sideSizesStr = null;
	var sideA, sideB, sideC;

	var i = 0;
	while (i < triangles.length){
		sideSizesStr = triangles[i].trim().split('   ').join(',').split('  ').join(',').split(',');
		
		sideA = parseInt(sideSizesStr[0]);
		sideB = parseInt(sideSizesStr[1]);
		sideC = parseInt(sideSizesStr[2]);

		if ( ((sideA + sideB) <= sideC) ||
			 ((sideA + sideC) <= sideB) ||
			 ((sideB + sideC) <= sideA) ) {
			numTrianglesInc++;
		}

		i++;
	}

	return triangles.length - numTrianglesInc;

}


var input = fs.readFileSync('./input.txt', 'utf8');
var triangles = input.split('\r\n');


console.log('\n-------------------------------------------');
console.log('                 PART 1                      ');
console.log('-------------------------------------------\n');

console.log('\TRIANGLES CORRECT -> ' + calculateTrianglesPossible(triangles) + '\n');