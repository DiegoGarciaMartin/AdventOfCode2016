var fs = require('fs');

var bots = new Array();
var outputs = new Array();

function runBotInstructions(botIndex){

	if (bots['bot' + botIndex].value1 != null && 
		bots['bot' + botIndex].value2 != null &&
		bots['bot' + botIndex].instruction != null){

		var lowValue = 0;
		var highValue = 0;

		if (bots['bot' + botIndex].value1 < bots['bot' + botIndex].value2){
			lowValue = bots['bot' + botIndex].value1;
			highValue = bots['bot' + botIndex].value2;
		} else {
			lowValue = bots['bot' + botIndex].value2;
			highValue = bots['bot' + botIndex].value1;
		}

		if (bots['bot' + botIndex].instruction.receiverLowValue == 'bot'){

			if (bots['bot' + bots['bot' + botIndex].instruction.giveLowValue] == null){
				bots['bot' + bots['bot' + botIndex].instruction.giveLowValue] = {'value1': null, 'value2': null, 'instruction': null};
		  	}

		  	if (bots['bot' + bots['bot' + botIndex].instruction.giveLowValue].value1 == null){
				bots['bot' + bots['bot' + botIndex].instruction.giveLowValue].value1 = lowValue;
			} else if (bots['bot' + bots['bot' + botIndex].instruction.giveLowValue].value2 == null){
				bots['bot' + bots['bot' + botIndex].instruction.giveLowValue].value2 = lowValue;
			}

			runBotInstructions(bots['bot' + botIndex].instruction.giveLowValue);

		} else if (bots['bot' + botIndex].instruction.receiverLowValue == 'output'){

			outputs['output' + bots['bot' + botIndex].instruction.giveLowValue] = lowValue;

		}

		if (bots['bot' + botIndex].instruction.receiverHighValue == 'bot'){

			if (bots['bot' + bots['bot' + botIndex].instruction.giveHighValue] == null){
				bots['bot' + bots['bot' + botIndex].instruction.giveHighValue] = {'value1': null, 'value2': null, 'instruction': null};
		  	}

		  	if (bots['bot' + bots['bot' + botIndex].instruction.giveHighValue].value1 == null){
				bots['bot' + bots['bot' + botIndex].instruction.giveHighValue].value1 = highValue;
			} else if (bots['bot' + bots['bot' + botIndex].instruction.giveHighValue].value2 == null){
				bots['bot' + bots['bot' + botIndex].instruction.giveHighValue].value2 = highValue;
			}

			runBotInstructions(bots['bot' + botIndex].instruction.giveHighValue);

		} else if (bots['bot' + botIndex].instruction.receiverHighValue == 'output'){

			outputs['output' + bots['bot' + botIndex].instruction.giveHighValue] = highValue;

		}

	}

}

function processBotsInstructions(instructions){

	var match;
	var botIndex;
	var value;
	var receiverLowValue; 		// 'bot' or 'output' of low value
	var receiverHighValue;		// 'bot' or 'output' of high value
	var giveLowValue;			// Index of bot or output of low value
	var giveHighValue;			// Index of bot or output of low value
	

	var i = 0;
	while (i < instructions.length){

		if (instructions[i].indexOf('value') == 0){

			match = instructions[i].match('value (\\d*) goes to bot (\\d*)');

			value = parseInt(match[1]);
			botIndex = parseInt(match[2]);

			if (bots['bot' + botIndex] == null){
				bots['bot' + botIndex] = {'value1': null,
										  'value2': null,
										  'instruction': null};
		  	}

			if (bots['bot' + botIndex].value1 == null){
				bots['bot' + botIndex].value1 = value;
			} else if (bots['bot' + botIndex].value2 == null){
				bots['bot' + botIndex].value2 = value;
			}

		} else {

			match = instructions[i].match('bot (\\d*) gives low to (\\D*) (\\d*) and high to (\\D*) (\\d*)');

			botIndex = parseInt(match[1]);
			receiverLowValue = match[2];
			giveLowValue = parseInt(match[3]);
			receiverHighValue = match[4];
			giveHighValue = parseInt(match[5]);

			if (bots['bot' + botIndex] == null){
				bots['bot' + botIndex] = {'value1': null,
										  'value2': null,
										  'instruction': null};
		  	}

			bots['bot' + botIndex].instruction = {'receiverLowValue': receiverLowValue,
												  'giveLowValue': giveLowValue,
												  'receiverHighValue': receiverHighValue,
												  'giveHighValue': giveHighValue};

		}

		runBotInstructions(botIndex);

		i++;
	}

}


var input = fs.readFileSync('./input.txt', 'utf8');
var instructions = input.split('\r\n');


console.log('\n-------------------------------------------');
console.log('                 PART 2                      ');
console.log('-------------------------------------------\n');

processBotsInstructions(instructions);
console.log('Multiply values of outputs 0, 1, and 2 -> ' + (outputs['output0'] * outputs['output1'] * outputs['output2']));