var places = require('googleplaces');
var pl = places('AIzaSyD9CupmcH4DhHBmHM0z-qe-3GSWcGLxSq4', 'json');
var ac = pl.placeAutocomplete;
var deets = pl.placeDetailsRequest;

var params = { input: '10 Barrel Brewing Co'};

function findPlaceId(paramsi, cb) {
	ac(params, function(err, res) {
		if (err) throw err;
		results = [];
		for (i = 0; i < res.predictions.length; i++)
		{
			place_details = {};
			place_details.description = res.predictions[i].description;
			place_details.place_id = res.predictions[i].place_id;
			console.log(res.predictions[i].description);
			console.log(res.predictions[i].place_id);
			debugger;
			deets({ placeid: res.predictions[i].place_id }, function(err, res) {
				place_details.vicinity = res.result.vicinity;
				place_details.website = res.result.website;	
				console.log(res.result.vicinity);
				console.log(res.result.website);
			});
			results.push(place_details);
		};
		cb(results);
	});
};

exports.findPlaceId = findPlaceId


