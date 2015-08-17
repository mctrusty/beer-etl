var fs = require('fs'),
cheerio = require('cheerio'),
$ = cheerio.load(fs.readFileSync('brewers'));
names = [];

function setNullIfUndefined(value){
	if(value === undefined)
		return 'NULL';
	else
		return "'" + value + "'"; 
}

$('.vcard').not('.col2').each(function(i, elem) {
	names[i] = "INSERT into brewers (name, address, map_link, phone, type, url) VALUES ";
	names[i] += " ('" + $('.name', this).text() + "',";
	names[i] += "'" + $('.address', this).text() + "',";
	//https://github.com/cheeriojs/cheerio#attr-name-value-
	names[i] += setNullIfUndefined($('a', this).attr('href')) + ',';
	names[i] += "'" + $('.telephone', this).text() + "',";
	names[i] += "'" + $('.brewery_type', this).text() + "',";
	names[i] += setNullIfUndefined($('.url', this).find('a').attr('href')) + ')';

});
console.log(names.join('\n'));
