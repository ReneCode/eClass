
/*

*/

var EClassReadContent = require('./eClassReadContent.js');

if (!process.argv[2]) {
	process.argv.push('./try/ESPRIT_TEST.xml');
}

if (process.argv.length <= 2) {
	console.log("usage: 'node dump.js <eclass-file>'");
	return 1;
}

var fname = process.argv[2];
console.dir("working on file: " + fname);


var readContent = new EClassReadContent();
readContent.readFile(fname, function(d) {
	console.dir(d);
});

