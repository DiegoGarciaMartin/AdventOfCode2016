var fs = require('fs');

var PIXELS_WIDE;
var PIXELS_TALL;

function calculateNumberPixelsLit(instructions){

	var screen = generateScreen();

	var instAux, wide, tall, row, column, pixels;

	var i = 0;	
	while (i < instructions.length){

		if (instructions[i].includes('rect')) {

			instAux = instructions[i].replace('rect ', '');
			wide = parseInt(instAux.split('x')[0]);
			tall = parseInt(instAux.split('x')[1]);

			rect(screen, wide, tall);

		} else if (instructions[i].includes('rotate row')) {

			instAux = instructions[i].replace('rotate row ', '');
			row = parseInt(instAux.split(' by ')[0].replace('y=', ''));
			pixels = parseInt(instAux.split(' by ')[1]);
			
			rotateRow(screen, row, pixels);

		} else if (instructions[i].includes('rotate column')) {

			instAux = instructions[i].replace('rotate column ', '');
			column = parseInt(instAux.split(' by ')[0].replace('x=', ''));
			pixels = parseInt(instAux.split(' by ')[1]);

			rotateColumn(screen, column, pixels);

		}
		
		i++;
	}

	printScreen(screen);

	return countPixelsLit(screen);

}

function generateScreen(){

	var screen = new Array();

	var i = 0;
	while (i < PIXELS_TALL){

		screen.push(new Array());

		var j = 0;
		while (j < PIXELS_WIDE){
			screen[i].push(false);
			j++;
		}


		i++;
	}

	return screen;

}

function rect (screen, wide, tall){
	
	var i = 0;
	while (i < tall && i < PIXELS_TALL){

		var j = 0;
		while (j < wide && j < PIXELS_WIDE){
			screen[i][j] = true;
			j++;
		}

		i++;
	}

}

function rotateRow (screen, rowIndex, pixels){
	
	var row = new Array();

	var j = 0;
	while (j < PIXELS_WIDE){

		if ((j - pixels) < 0){
			row.push(screen[rowIndex][PIXELS_WIDE - (pixels-j)]);
		} else {
			row.push(screen[rowIndex][j - pixels]);
		}
		
		j++;
	}

	screen[rowIndex] = row;

}

function rotateColumn (screen, columnIndex, pixels){
	
	var column = new Array();

	var j = 0;
	while (j < PIXELS_TALL){

		if ((j - pixels) < 0){
			column.push(screen[PIXELS_TALL - (pixels-j)][columnIndex]);
		} else {
			column.push(screen[j - pixels][columnIndex]);
		}
		
		j++;
	}

	j = 0;
	while (j < PIXELS_TALL){
		screen[j][columnIndex] = column[j];
		j++;
	}
	
}

function countPixelsLit(screen){

	var pixelsLit = 0;

	var i = 0;
	while (i < PIXELS_TALL){

		var j = 0;
		while (j < PIXELS_WIDE){
			
			if (screen[i][j]){
				pixelsLit++;
			}

			j++;
		}

		i++;
	}

	return pixelsLit;

}

function printScreen (screen){

	var i = 0;
	var border = '--';
	while (i < PIXELS_WIDE){
		border = border + '-';
		i++;
	}

	console.log('\n' + border);

	i = 0;
	var row = '';
	while (i < PIXELS_TALL){

		row = '';

		var j = 0;
		while (j < PIXELS_WIDE){
			
			if(screen[i][j]){
				row = row + '#';
			} else {
				row = row + '.';
			}

			j++;
		}

		console.log('|' + row + '|');

		i++;
	}

	console.log(border + '\n\n');

}


var input = fs.readFileSync('./input.txt', 'utf8');
var instructions = input.split('\r\n');


console.log('\n-------------------------------------------');
console.log('                 PART 1                      ');
console.log('-------------------------------------------\n');

var test1 = ['rect 3x2',
			 'rotate column x=1 by 1',
			 'rotate row y=0 by 4',
			 'rotate column x=1 by 1'];

PIXELS_WIDE = 7;
PIXELS_TALL = 3;
console.log('TEST1 - NUMBER PIXELS LIT -> ' + calculateNumberPixelsLit(test1));

PIXELS_WIDE = 50;
PIXELS_TALL = 6;
console.log('\nNUMBER PIXELS LIT  -> ' + calculateNumberPixelsLit(instructions) + '\n');