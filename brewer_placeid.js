var places = require('googleplaces');
var pl = places('AIzaSyD9CupmcH4DhHBmHM0z-qe-3GSWcGLxSq4', 'json');
var ac = pl.placeAutocomplete;
var deets = pl.placeDetailsRequest;

var params = { input: '10 Barrel Brewing Co'};

function findPlaceId(params) {
	ac(params, function(err, res) {
		if (err) throw err;
		for (i = 0; i < res.predictions.length; i++)
		{
			console.log(res.predictions[i].description);
			console.log(res.predictions[i].place_id);
			debugger;
			deets({ placeid: res.predictions[i].place_id }, function(err, res) {
				console.log(res.result.vicinity);
				console.log(res.result.website);
			});
		};
	});
};

exports.findPlaceId = findPlaceId


