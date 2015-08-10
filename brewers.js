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
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 10000, //< Default Max Timout is 3s
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function() {
            if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
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
//	clickSelector();
	console.log('page load finished');
}

function evalClickSelector(){
	var li = $("li[data-state-id='United States']")[0];
	return (li && (typeof li.click == "function"));
}

function hasClickSelector(){
	return page.evaluate(function() { 
		//var li = $("li[data-state-id='United States']")[0];
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

function clickSelector() {
	var cs = page.evaluate(function() {
		return $("li[data-state-id='United States']")[0].innerText;
	});
	console.log(cs);
}
page.open('https://www.brewersassociation.org/directories/breweries/', function(status) {
	console.log('opening page...\n');
	console.log("Status: " + status);
	if (status === "success"){
		/*page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
			console.log('including jquery...\n');
            		page.evaluate(function() {
                		console.log('evaluating...\n');
				console.log("$(\".entry-title\").text() -> " + $(".entry-title").text());
          		});
		});*/

//		page.includeJs('
/*		var clicked = page.evaluate(function() {
 				return document.querySelectorAll("li[data-state-id='United States']")[0]; 
				/*if (el && el.click && el.click())
					return true;
				else
					return false;*/
//			}		
//		);
//		console.log('clicked: ' + clicked);
//		if (clicked){
//			console.log('clicked');
			waitFor(hasClickSelector, 
				function(){ 
					console.log('wait over');
				}
			);
//		}
/*		var title = page.evaluate(function() {
			return document.getElementsByClassName('entry-title');
		});*/
//		console.log('entry title: ' + title.textContent);
	}
	 setTimeout(function(){
         	phantom.exit();
         }, 1000);

});
        
