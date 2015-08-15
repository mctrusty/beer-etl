var fs = require('fs'),
cheerio = require('cheerio'),
$ = cheerio.load(fs.readFileSync('brewers'));
names = [];
$('.vcard').not('.col2').each(function(i, elem) {
	names[i] = 'brewery: ' + $('.name', this).text();
	names[i] += ',address: ' + $('.address', this).text();
	//https://github.com/cheeriojs/cheerio#attr-name-value-
	names[i] += ', googlemap: ' + $('a', this).attr('href');
	names[i] += ', tel: ' + $('.telephone', this).text();
	names[i] += ', type: ' + $('.brewery_type', this).text();
	names[i] += ', url: ' + $('.url', this).find('a').attr('href');

});
console.log(names.join('\n'));
