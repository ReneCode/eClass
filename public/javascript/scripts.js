// scripts.js

// Dropzone.options.eclass =  {
// 	url: "/uploadfile",
// 	maxFileszie: 100

// };

var showHandler = function() {
	console.log("hallo Click");
}

function FileDragHover(e) {
	e.stopPropagation();
	e.preventDefault();
	e.target.className = (e.type == "dragover" ? "hover" : "");
}

function FileDropHandler(e) {
	// cancel event and hover styling
	FileDragHover(e);

	// fetch FileList object
	var files = e.target.files || e.dataTransfer.files;

	sendFileToServer(files);

	// process all File objects
	for (var i = 0, f; f = files[i]; i++) {
		console.log(f.name);
	}
	return false;	
}

function sendFileToServer(files) {
	if (window.FormData != undefined) {
		var data = new FormData();
		for (i=0; i<files.length; i++) {
			data.append("file"+i, files[i]);
		}
		$.ajax({
			type: "POST",
			url: "/upload",
			contentType: false,
			processData: false,
			data: data,
			success: function(res) {
				console.log(res);
			}
		});
	}
}


$( function() {
	// DOM is ready
	$('#show').click( showHandler );

	var dropElement = $('#drop')[0];

	dropElement.addEventListener("dragover", FileDragHover, false);
	dropElement.addEventListener("dragleave", FileDragHover, false);
	dropElement.addEventListener("drop", FileDropHandler, false);


});