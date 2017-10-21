var fs = require('fs');

var indexBotsCompareValue61Value17 = null;

function runBotInstructions(bots, botIndex){

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

		if ((lowValue == 17 && highValue == 61) || (lowValue == 61 && highValue == 17)){
			indexBotsCompareValue61Value17 = botIndex;
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

			runBotInstructions(bots, bots['bot' + botIndex].instruction.giveLowValue);

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

			runBotInstructions(bots, bots['bot' + botIndex].instruction.giveHighValue);

		} 

	}

}

function processBotsInstructions(instructions){

	var bots = new Array();

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

		runBotInstructions(bots, botIndex);

		i++;
	}

}


var input = fs.readFileSync('./input.txt', 'utf8');
var instructions = input.split('\r\n');


console.log('\n-------------------------------------------');
console.log('                 PART 1                      ');
console.log('-------------------------------------------\n');

processBotsInstructions(instructions);
console.log('Bot responsible of Value61-Value17 -> ' + indexBotsCompareValue61Value17);