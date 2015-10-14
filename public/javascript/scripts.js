// scripts.js


var showHandler = function() {
	console.log("hallo Click");
}

function FileDragHover(e) {
	e.stopPropagation();
	e.preventDefault();
	e.target.className = (e.type == "dragover" ? "hover" : "");
}

function FileSelectHandler(e) {
	// cancel event and hover styling
	FileDragHover(e);

	// fetch FileList object
	var files = e.target.files || e.dataTransfer.files;

	// process all File objects
	for (var i = 0, f; f = files[i]; i++) {
		console.log(f);
		//ParseFile(f);
	}	
}

$( function() {
	// DOM is ready
	$('#show').click( showHandler );

	var dropElement = $('#drop')[0];

	dropElement.addEventListener("dragover", FileDragHover, false);
	dropElement.addEventListener("dragleave", FileDragHover, false);
	dropElement.addEventListener("drop", FileSelectHandler, false);


});