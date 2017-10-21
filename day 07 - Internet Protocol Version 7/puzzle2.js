var fs = require('fs');


function calculateNumberIPSupportSSL (listIP){

	var numberIP = 0;

	var i = 0;
	while (i < listIP.length){

		if (ipSupportSSL(listIP[i])){
			numberIP++;
		}

		i++;
	}
	
	return numberIP;

}

function ipSupportSSL(ip){

	var ret = false;

	var supernetParts = new Array(); // Array with the strings outside of brackets
	var hypernetParts = new Array(); // Array with the strings inside of brackets

	// Process the IP with a regex -> Fill arrays of supernetParts and hypernetParts
	var re = new RegExp('(\\w+)?(\\[(\\w+)\\])?');
	var match;

	var ipAux = ip;

	while (ipAux != '' && (match = re.exec(ipAux)) != null) {
    	
		if (match[1] != null){
			supernetParts.push(match[1]);
		}

		if (match[3] != null){
			hypernetParts.push(match[3]);
		} 

		ipAux = ipAux.replace(match[0], '');

	}

	var abaSupernetParts = getAbaOfArrayString(supernetParts);

	var i = 0;
	var re2 = null;
	while (i < abaSupernetParts.length && !ret){

		re2 = new RegExp(abaSupernetParts[i].charAt(1) + abaSupernetParts[i].charAt(0) + abaSupernetParts[i].charAt(1));

		if (matchRegExpAnyStringOfArray(re2, hypernetParts)){
			ret = true;
		}

		i++;

	}

	return ret;

}

function getAbaOfArrayString(strArray){

	var aba = new Array();

	var i = 0;
	while (i < strArray.length){
		
		var j = 0;
		while (j < strArray[i].length - 2) {
        	
        	if (strArray[i].charAt(j) == strArray[i].charAt(j + 2) && strArray[i].charAt(j) != strArray[i].charAt(j + 1)){
                aba.push(strArray[i].charAt(j) + strArray[i].charAt(j + 1) + strArray[i].charAt(j + 2));
            }

            j++;

        }

		i++;

	}

	return aba;

}

function matchRegExpAnyStringOfArray(regexp, strArray){

	var ret = false;

	var i = 0;
	while (i < strArray.length && !ret){
		
		if (regexp.test(strArray[i])){
			ret = true;
		}

		i++;

	}

	return ret;

}


var input = fs.readFileSync('./input.txt', 'utf8');
var listIP = input.split('\r\n');


console.log('\n-------------------------------------------');
console.log('                 PART 2                      ');
console.log('-------------------------------------------\n');

var test1 = ['aba[bab]xyz',
			 'xyx[xyx]xyx',
			 'aaa[kek]eke',
			 'zazbz[bzb]cdb'];

console.log('NUMBER IPs TEST1 -> ' + calculateNumberIPSupportSSL(test1));

console.log('\nNUMBER IPs  -> ' + calculateNumberIPSupportSSL(listIP) + '\n'); 
