const fs = require('fs');


/**
 *
 * Converts the input string in an object with the initial state
 *
 * @param {String} input Notes of the locations of each component of interest
 * @return {Object} Object that contains the initial state
 */
function processInput(input){

	var state = {'floor1': [],
			  	 'floor2': [],
			  	 'floor3': [],
			  	 'floor4': [],
			  	 'elevator': 1,
			  	 'previousStep': null,
			  	 'countSteps': 0};

	var aux;

	var i = 0;
	var j = 0;
	while (i < input.length){

		aux = input[i];

		aux = aux.replace(new RegExp('The first floor contains', 'g'), '');
		aux = aux.replace(new RegExp('The second floor contains', 'g'), '');
		aux = aux.replace(new RegExp('The third floor contains', 'g'), '');
		aux = aux.replace(new RegExp('The fourth floor contains', 'g'), '');
		aux = aux.replace(new RegExp(', and a ', 'g'), ',');
		aux = aux.replace(new RegExp(' and a ', 'g'), ',');
		aux = aux.replace(new RegExp(' a ', 'g'), '');
		aux = aux.replace(new RegExp('\\.', 'g'), '');
		aux = aux.replace(new RegExp('nothing relevant', 'g'), '');
		aux = aux.replace(new RegExp('-compatible', 'g'), '');
		aux = aux.trim();

		aux = aux.split(',');

		j = 0;
		while (j < aux.length){

			if (aux[j].includes('generator')){
				state['floor' + (i + 1)].push(aux[j][0].toUpperCase() + aux[j][1] + 'G');
			} else if (aux[j].includes('microchip')){
				state['floor' + (i + 1)].push(aux[j][0].toUpperCase() + aux[j][1] + 'M');
			}
			
			j++;
		}

		i++;
	}

	return state;

}

/**
 *
 * Indicates if the state is the end state: All components in 4º floor.
 *
 * @param {Object} state State
 * @return {Boolean} true if is the end state and false otherwise
 */
function isStateEnd(state){

	var ret = false;

	if (state.elevator == 4 &&
		state.floor1.length == 0 &&
		state.floor2.length == 0 &&
		state.floor3.length == 0 &&
		state.floor4.length > 0){
		ret = true;
	}

	return ret;

}

/**
 *
 * Returns if the floor has microchips without its generator
 *
 * @param {Array of string} floor Array of string with the generators and microchips of floor 
 * @return {Boolean} true if the floor has microchips without its generator and false otherwise
 */
function hasFloorMicrochipsWithoutGenerator(floor){

	var has = false;

	var i = 0;
	while (i < floor.length && !has){

		if (floor[i][2] == 'M'){
			if (!floor.includes(floor[i][0] + floor[i][1] + 'G')){
				has = true;
			}
		}

		i++;
	}

	return has;

}

/**
 *
 * Returns if the floor has generators
 *
 * @param {Array of string} floor Array of string with the generators and microchips of floor 
 * @return {Boolean} true if the floor has generators and false otherwise
 */
function hasFloorGenerators(floor){

	var has = false;

	var i = 0;
	while (i < floor.length && !has){

		if (floor[i][2] == 'G'){
			has = true;
		}

		i++;
	}

	return has;

}

/**
 *
 * Returns if the microchips and generators of the floor can be in this floor together
 *
 * @param {Array of string} floor Array of string with the generators and microchips of floor  
 * @return {Boolean} true if the floor is ok and false otherwise
 */
function isFloorOk (floor){
	return !hasFloorMicrochipsWithoutGenerator(floor) || !hasFloorGenerators(floor);
}

/**
 *
 * Returns if the component can be move from the floorIni to the floorEnd
 *
 * @param {Object} state Object with the state of the building
 * @param {Array of string} load Array of string with the generators and microchips to move 
 * @param {Integer} floorIni Integer that indicate the initial floor (1,2,3,4)
 * @param {Integer} floorEnd Integer that indicate the end floor (1,2,3,4) 
 * @return {Boolean} true if the floor can be move and false otherwise
 */
function canMove(state, load, floorIni, floorEnd){

	var can = true;

	var floorIniAux = [];
	var floorEndAux = [];

	var i = 0;
	while (i < state['floor' + floorIni].length){

		if (!load.includes(state['floor' + floorIni][i])){
			floorIniAux.push(state['floor' + floorIni][i]);
		}

		i++;
	}

	i = 0;
	while (i < state['floor' + floorEnd].length){
		floorEndAux.push(state['floor' + floorEnd][i]);
		i++;
	}

	i = 0;
	while (i < load.length){
		floorEndAux.push(load[i]);
		i++;
	}

	can = isFloorOk(floorIniAux) && isFloorOk(floorEndAux);

	return can;

}

/**
 * 
 * Moves the component from the floorIni to the floorEnd
 *
 * @param {Object} state Object with the state of the building
 * @param {Array of string} load Array of string with the generators and microchips to move 
 * @param {Integer} floorIni Integer that indicate the initial floor (1,2,3,4)
 * @param {Integer} floorEnd Integer that indicate the end floor (1,2,3,4) 
 * @return {Object} Object with the new state of the building
 */
function move(state, load, floorIni, floorEnd){

	var newState = {'floor1': [],
			  	 	'floor2': [],
			  	 	'floor3': [],
			  	 	'floor4': [],
			  	 	'elevator': floorEnd,
			  	 	'previousStep': state,
			  	 	'countSteps': state.countSteps + 1};

	// Sets the initial floor (Initial floor - load)
	var i = 0;
	while (i < state['floor' + floorIni].length){

		if (!load.includes(state['floor' + floorIni][i])){
			newState['floor' + floorIni].push(state['floor' + floorIni][i]);
		}

		i++;
	}

	// Sets the end floor  (End floor + load)
	i = 0;
	while (i < state['floor' + floorEnd].length){
		newState['floor' + floorEnd].push(state['floor' + floorEnd][i]);
		i++;
	}

	i = 0;
	while (i < load.length){
		newState['floor' + floorEnd].push(load[i]);
		i++;
	}

	// Sets the other two floors
	i = 1;
	var j = 0;
	while (i <= 4){

		if(floorIni != i && floorEnd != i){

			j = 0;
			while (j < state['floor' + i].length){
				newState['floor' + i].push(state['floor' + i][j]);
				j++;
			}

		}

		i++;

	}

	return newState;

}

/*
 *
 * Generates the possibles combinations of the components to move of a floor
 *
 * @param {Array of String} floor Array with the components of the floor
 * @return {Array of array of String} Array with possibles combinations of the components to move
 */
function generatePossibleLoads(floor){

	var loads = [];

	var i = 0;
	var j = 0;
	while (i < floor.length){
		
		loads.push([floor[i]]);
		
		if (floor[i]['2'] == 'M'){	// acompañado de su generador o otros microchips

			j = i + 1;
			while (j < floor.length){

				if ( (floor[j]['2'] == 'M') || 
					 (floor[j]['2'] == 'G' && floor[j]['0'] == floor[i]['0'] && floor[j]['1'] == floor[i]['1']) ){
					loads.push([floor[i], floor[j]]);
				}

				j++;
			}

		} else if (floor[i]['2'] == 'G'){ // acompañado de otros generadores

			j = i + 1;
			while (j < floor.length){

				if ( (floor[j]['2'] == 'G') || 
					 (floor[j]['2'] == 'M' && floor[j]['0'] == floor[i]['0'] && floor[j]['1'] == floor[i]['1']) ){
					loads.push([floor[i], floor[j]]);
				}

				j++;
			}

		}

		i++;
	}

	return loads;

}

/*
 *
 * Generates the possibles next steps of a state.
 *
 * @param {Object} state Object with the state of the building
 * @return {Array of objects} Array with the possible states to come from the indicated state
 */
function generatePossibleSteps(state){

	var possibleSteps = [];

	var loads = generatePossibleLoads(state['floor' + state.elevator]);
	var floorEnd1 = null;
	var floorEnd2 = null;
	var load = null;
	var newState = null;

	if (state.elevator > 1){
		floorEnd1 = state.elevator - 1;
	}

	if (state.elevator < 4){
		floorEnd2 = state.elevator + 1;
	}

	var i = 0;
	while (i < loads.length){

		load = loads[i];

		if (floorEnd1 != null){

			if (canMove(state, load, state.elevator, floorEnd1)){
				newState = move(state, load, state.elevator, floorEnd1);
				possibleSteps.push(newState);
			}

		}

		if (floorEnd2 != null){

			if (canMove(state, load, state.elevator, floorEnd2)){
				newState = move(state, load, state.elevator, floorEnd2);
				possibleSteps.push(newState);
			}

		}
				
		i++;
	}

	return possibleSteps;

}

/**
 * Remove duplicates states in generated steps 
 */
function removePossibleStepsDuplicates(statesMaps, newStates){

	var i = 0;
	var keyMap = null;
	while(i < newStates.length){

		keyMap = getStateKey(newStates[i]);

		if (statesMaps[keyMap] == null){
			statesMaps[keyMap] = newStates[i];
			i++;
		} else {
			newStates.splice(i, 1);
		}

	}

}

/**
 *
 * Generates the key to use in a map of the especified state.
 *
 *
 * Ej of key:
 *      With the next array of names: ["promethium","cobalt","curium","ruthenium","plutonium"]
 *      If this key is generated: "0,0;1,2;1,2;1,2;1,2;0"
 *      Indicates that: of promethium M and G is in floor 1, of cobalt the G is in floor 1 and the M is in floor 2, etc  
 *
 * @param {Object} state State of the building
 * @return String with the key
 *
 */
function getStateKey(state) {

    let n = (state.floor1.length + state.floor2.length + state.floor3.length + state.floor4.length) / 2;

    let objects = [...Array(n)].map(_ => Array(2).fill(null));

    let names = [];

    for (let i = 1; i <= 4; i++) {   
        for (let component of state['floor' + i]) {
            
            let j = names.indexOf(component[0] + component[1]);

            if (j < 0) {
                names.push(component[0] + component[1]);
                j = names.length - 1;
            }

            objects[j][component[2] == 'G' ? 0 : 1] = i;
        }
    }

    return objects.sort().join(';') + ';' + state.elevator;
}

/**
 *
 * Prints the steps necesaries to come from initial state to the indicated state.
 *
 * @param {Object} state Object with the state of the building
 */
function printSteps(state){

	var previousStep = state;
	var steps = [];

	while (previousStep != null){
		steps.push(previousStep);
		previousStep = previousStep.previousStep;
	}
	
	console.log('\n\nSTEPS\n------------------------------------------------\n');

	for (let i = steps.length - 1; i >= 0; i--){
		console.log('STEP ' + (steps.length - i - 1));
		console.log('   Steps: ' + steps[i].countSteps);
		console.log('   Elevator: ' + steps[i].elevator);
		console.log('   Floor 1: ' + steps[i].floor1);
		console.log('   Floor 2: ' + steps[i].floor2);
		console.log('   Floor 3: ' + steps[i].floor3);
		console.log('   Floor 4: ' + steps[i].floor4);
		console.log('\n');
	}

	console.log('------------------------------------------------\n\n');

}

/**
 *
 * Calculates the number of steps to move all the components to the 4º floor
 * from initial state of the components.
 *
 * @param {Object} state Object with the state of the building
 * @return the number of steps or -1 if there isn't solution
 */
function calculateMinimumNumberSteps(stateIni){

	var states = [];		// Array that save the possible states by levels (levels = steps)
	var statesMaps = {};	// Object that save an array of possible states by key (key = size floor 1 - size floor 2 - size floor 3 - size floor 4 - elevator)

	states.push([stateIni]);

	var steps = 0;
	var possibleSteps = null;
	var i = 0;
	var j = 0;
	var problemResolved = false;

	while (!problemResolved && states[steps].length > 0){

		steps++;

		console.log('Calculating possibilities with ' + steps + ' steps');

		states.push([]);

		i = 0;
		while (i < states[steps - 1].length && !problemResolved){

			possibleSteps = generatePossibleSteps(states[steps - 1][i]);
			removePossibleStepsDuplicates(statesMaps, possibleSteps);

			states[steps] = states[steps].concat(possibleSteps);

			j = 0;
			while (j < possibleSteps.length && !problemResolved){

				if (isStateEnd(possibleSteps[j])){
					problemResolved = true;
				} else {
					j++;
				}
				
			}

			if (!problemResolved){
				i++;
			}

		}

		console.log(' -> Nº possibilities: ' + states[steps].length);

	}

	if (!problemResolved && states[steps].length == 0){ // No solution
		steps = -1;
	} else {
		printSteps(possibleSteps[j]);
	}

	return steps;

}


var input = fs.readFileSync('./input.txt', 'utf8');
input = input.split('\r\n');


console.log('\n-------------------------------------------');
console.log('                 PART 2                      ');
console.log('-------------------------------------------\n');


var stateIni = processInput(input);

stateIni.floor1.push('ElG');
stateIni.floor1.push('ElM');
stateIni.floor1.push('DiG');
stateIni.floor1.push('DiM');

console.log('Minimum number steps -> ' + calculateMinimumNumberSteps(stateIni) + '\n\n');