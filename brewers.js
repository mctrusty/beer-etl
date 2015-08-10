/**
 * Wait until the test condition is true or a timeout occurs. Useful for waiting
 * on a server response or for a ui change (fadeIn, etc.) to occur.
 *
 * @param testFx javascript condition that evaluates to a boolean,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param onReady what to do when testFx condition is fulfilled,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param timeOutMillis the max amount of time to wait. If not specified, 3 sec is used.
 */
function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 30000, //< Default Max Timout is 3s
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function() {
		console.log(condition);
            if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
		console.log('cur ms: ' + (new Date().getTime() - start));
		console.log('max ms: ' + maxtimeOutMillis);
                // If not time-out yet and condition not yet fulfilled
                condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
            } else {
                if(!condition) {
                    // If condition still not fulfilled (timeout but condition is 'false')
                    console.log("'waitFor()' timeout");
                    phantom.exit(1);
                } else {
                    // Condition fulfilled (timeout and/or condition is 'true')
                    console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                    typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval); //< Stop this interval
                }
            }
        }, 250); //< repeat check every 250ms
};

/*
* Begin the page parsing work.
*/
var page = require('webpage').create();		

page.onConsoleMessage = function(msg) { console.log(msg); }

page.onInitialized = function() {
	console.log('page.onInitialized');
}
page.onLoadStarted = function() {
	console.log('page.onLoadStarted');
}
page.onLoadFinished = function() {
	console.log('page load finished');
}


function hasBrewerySearchFunction(){
	return page.evaluate(function() { 
		if (typeof(get_breweries) === "function"){
			console.log('get_breweries found');
			get_breweries('country', 'United States');
			return true;
		}	
		else{
			console.log("not a click fnx");
			return false;
		}
	});
}

function resultsReturn(){
	return page.evaluate(function() {
		console.log('checking on status-bar');
		return $("#status-bar").is(":visible");
	});
}

page.open('https://www.brewersassociation.org/directories/breweries/', function(status) {
	console.log('opening page...\n');
	console.log("Status: " + status);
	if (status === "success"){
		hasBrewerySearchFunction();
		waitFor(resultsReturn, 
			function(){ 
				console.log('wait over');
			}
		);
	}
	 setTimeout(function(){
         	phantom.exit();
         }, 30000);

});
        
