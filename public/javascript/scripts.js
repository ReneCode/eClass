// scripts.js


var showHandler = function() {
	console.log("hallo Click");
}

$( function() {
	// DOM is ready
	$('#show').click( showHandler );
});