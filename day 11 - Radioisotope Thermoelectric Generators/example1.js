// https://cryze.github.io/advent-of-code-2016/day-11/

const fs = require('fs');

function parse(str) {
    let floors = str.split('\n').map(line => {
        return line.split('contains ')[1].split(/, and a |, a |and a |a /)
            .map(x => x.replace(/(-compatible|\.)/g, '').trim())
            .filter(x => !['', 'nothing relevant'].includes(x))
            .map(x => x.split(' '))
    })

    return [floors, 0]
}

function copy([floors, elevator]) {
    return [floors.map(floor => floor.slice(0)), elevator]
}

function isEndState([floors, ]) {
    return floors.slice(0, -1).every(floor => floor.length == 0)
}

function isValid([floors, elevator]) {
    return 0 <= elevator && elevator < floors.length && floors.every(floor => {
        let generators = floor.filter(([, type]) => type == 'generator')

        return generators.length == 0 || floor.every(([el, type]) => type == 'generator' || generators.some(([x, ]) => x == el))
    })
}

function* powerSet(array, n) {
    if (n == 0 || array.length == 0 || n > array.length) {
        yield []
        return
    }

    for (let i = 0; i < array.length - n + 1; i++) {
        for (let rest of powerSet(array.slice(i + 1), n - 1)) {
            rest.unshift(array[i])
            yield rest
        }
    }
}

function* listSteps(state) {
    let [floors, elevator] = state

    for (let n = 1; n <= 2; n++) {
        for (let objects of powerSet(floors[elevator], n)) {
            if (objects.length == 0) continue

            if (objects.length == 2) {
                let [
                    [a, b],
                    [c, d]
                ] = objects
                if (a != c && b != d) continue
            }

            for (let newElevator = elevator - 1; newElevator <= elevator + 1; newElevator += 2) {
                if (newElevator < 0 || newElevator >= floors.length)
                    continue
                if (newElevator < elevator && floors.slice(0, elevator).every(floor => floor.length == 0))
                    continue

                let newState = copy(state)
                let [newFloors, ] = newState
                newState[1] = newElevator

                for (let [el, type] of objects) {
                    let i = newFloors[elevator].findIndex(([x, y]) => x == el && y == type)
                    newFloors[newElevator].push(...newFloors[elevator].splice(i, 1))
                }

                newFloors[newElevator].sort()

                if (isValid(newState)) yield newState
            }
        }
    }
}

/**
 *
 * Genera una clave para usar en un map del estado especificado. La clave sera una cadena, en la que separada por ';',
 * cada componente tiene dos valores enteros separados por ','.
 *
 *
 * Ej:
 *      Dado el siguiente array de nombre: ["promethium","cobalt","curium","ruthenium","plutonium"]
 *      Si se genera esta clave: "0,0;1,2;1,2;1,2;1,2;0"
 *      Indica que: de promethium M y G estan en el piso 1, de cobalt el G esta en el piso 1 y el M esta en el piso 2, etc  
 *
 * @param [floors, elevator] Array con dos posiciones: POS0 Array con los pisos y POS1 piso del ascensor
 * @return Cadena con la clave de un estado
 *
 */
function eqClass([floors, elevator]) {

    // Calcula el numero de componentes / 2 (de cada componente hay microchipt y generador)
    let n = floors.reduce((sum, floor) => sum + floor.length, 0) / 2;

    // Crea un array de tamaño el numero de componentes y rellena cada posicion con un array de tamaño dos 
    let objects = [...Array(n)].map(_ => Array(2).fill(null));

    // Crea un array de nombres de componentes vacio
    let names = [];

    for (let i = 0; i < floors.length; i++) {   // Recorre el array de pisos del edificio
        for (let [el, type] of floors[i]) {     // Por cada piso, recorre los componentes del piso
            
            let j = names.indexOf(el);          // Busca la posicion del componente en el array de nombres

            if (j < 0) {                        // Si el elemento no se encuentra en el array de nombres -> Lo inserta
                names.push(el);                     // Inserta el elemento en el array de nombres
                j = names.length - 1;               // Establece j al incice de la ultima posicion del array
            }

            // Si el componente es generador -> En el array de componentes, en la posicion j y posicion 0 dentro de este, 
            // establece el valor del piso donde esta.
            // Si el componente es micochip lo hace en la posicion 1.
            objects[j][type == 'generator' ? 0 : 1] = i;
        }
    }

    return objects.sort().join(';') + ';' + elevator;
}

function bfs(state) {
    let queue = [state]
    let key = eqClass(state)
    let parents = {
        [key]: null
    }

    let getPath = function(end) {
        let path = [end]
        let key = eqClass(end)

        while (parents[key] != null) {
            path.push(parents[key])
            key = eqClass(parents[key])
        }

        return path.reverse()
    }

    while (queue.length > 0) {
        let current = queue.shift()

        if (isEndState(current)) return getPath(current)

        for (let neighbor of listSteps(current)) {
            let key = eqClass(neighbor)
            if (key in parents) continue
            parents[key] = current

            queue.push(neighbor)
        }
    }

    return null
}


function part1(input) {

    let state = parse(input);

    console.log('\n-------------------------------------------------');
    console.log('REPRESENTACION DE ESTADOS')
    console.log('-------------------------------------------------\n');

    console.log('  Array de dos posiciones');
    console.log('    POS 0: Array con la especificaciones de cada piso');
    console.log('    POS 1: Entero indicando el piso del ascensor [0-3]\n');
    
    console.log('  Especificacion de cada piso: Array de con la especificacion de cada elemento')
    console.log('  Especificacion de cada elemento: Array con dos posiciones string')
    console.log('    POS 0: Elemento. Ej: curium, ruthenium')
    console.log('    POS 1: Tipo elemento [generator/microchip]')

    console.log('\n\n');

    console.log('\n-------------------------------------------------');
    console.log('ESTADO INICIAL')
    console.log('-------------------------------------------------\n');

    console.log(JSON.stringify(state) + '\n\n');

    console.log('\n-------------------------------------------------');
    console.log('CLAVE DEL ESTADO INICIAL')
    console.log('-------------------------------------------------\n');

    console.log(JSON.stringify(eqClass(state)) + '\n\n');

    let path = bfs(state);

    console.log('\n-------------------------------------------------');
    console.log('SALIDA')
    console.log('-------------------------------------------------\n');

    console.log('Array con los estados por los que se pasa para ir del estado inicial al final.\n')

    console.log(JSON.stringify(path) + '\n\n');

    return (path.length - 1);
}

function part2(input) {
    let state = parse(input)

    state[0][0].push(
        ['elerium', 'generator'], ['elerium', 'microchip'], ['dilithium', 'generator'], ['dilithium', 'microchip']
    )

    let path = bfs(state)
    return (path.length - 1);
}


var input = fs.readFileSync('./input.txt', 'utf8');

console.log('Part1: ' + part1(input));
//console.log('Part2: ' + part2(input));