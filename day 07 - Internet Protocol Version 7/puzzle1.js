var fs = require('fs');


function calculateNumberIPSupportTLS (listIP){

	var numberIP = 0;

	var i = 0;
	while (i < listIP.length){

		if (ipSupportTLS(listIP[i])){
			numberIP++;
		}

		i++;
	}
	
	return numberIP;

}

function ipSupportTLS(ip){

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

	var haveAbbaSupernetParts = checksAbbaOfArrayString(supernetParts);
	var haveAbbaHypernetParts = false;

	if (haveAbbaSupernetParts){

		haveAbbaHypernetParts = checksAbbaOfArrayString(hypernetParts);

		if (!haveAbbaHypernetParts){
			ret = true;
		}

	}

	return ret;

}

function checksAbbaOfArrayString(strArray){

	var ret = false;

	var re = new RegExp(".*((.)(.)(?!\\2)\\3\\2).*");

	var i = 0;
	while (i < strArray.length && !ret){
	
		if (re.test(strArray[i])){
			ret = true;
		}

		i++;

	}

	return ret;

}


var input = fs.readFileSync('./input.txt', 'utf8');
var listIP = input.split('\r\n');


console.log('\n-------------------------------------------');
console.log('                 PART 1                      ');
console.log('-------------------------------------------\n');

var test1 = ['abba[mnop]qrst',
			 'abcd[bddb]xyyx',
			 'aaaa[qwer]tyui',
			 'ioxxoj[asdfgh]zxcvbn'];

console.log('NUMBER IPs TEST1 -> ' + calculateNumberIPSupportTLS(test1));

console.log('\nNUMBER IPs  -> ' + calculateNumberIPSupportTLS(listIP) + '\n');
