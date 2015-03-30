//  .-. .-. .---. .-..-.    .----.
//  | { } |{_   _}| || |   { {__  
//  | {_} |  | |  | || `--..-._} }
//  `-----'  `-'  `-'`----'`----' 
// function to load json file list
function loadJSONFiles(files){
	var jsonFiles = { };
	for (fileName in files){
		jsonFiles[fileName] = { 
			fileName : files[fileName] , 
			file: httpGetData(files[fileName]) 
		};
	}
	console.info("loadJSONFiles(...) JSON files loaded",jsonFiles );
	return jsonFiles;
}

// utility function for loading assets from server
function httpGet(theUrl) {
	var xmlHttp = null;
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, false);
	xmlHttp.send(null);
	return xmlHttp.responseText;
}

// utility function for loading json data from server
function httpGetData(theUrl) {
	var responseText = httpGet(theUrl);
	return JSON.parse(responseText);
}
