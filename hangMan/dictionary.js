// var request = require('superagent');
// xml2jsParser = require('superagent-xml2jsparser');
// // npm install mw-dictionary
// var url = 'http://www.dictionaryapi.com/api/v1/references/sd2/xml/test?key=5590eec7-58b6-40f8-b912-60c2e61c7f6a';
	
// //var url = "http://www.omdbapi.com/?t=godfather&y=&plot=short&r=json"
// request
// 	.get(url)
// 	.accept('xml')
// 	.parse(xml2jsParser)
// 	.end(function(err, res) {
// 	if (err || !res.ok) {
//        console.log('Oh no! error');
//      } else {
//     	console.log( res );
//     }
// });

// //http://www.multiasking.com/blog/xml2js-sax-js-non-whitespace-before-first-tag/

// // connection, Socket, _readableState, 

// //http://www.dictionaryapi.com/api/v1/references/sd2/xml/food?key=5590eec7-58b6-40f8-b912-60c2e61c7f6a


// // 8:46- switch

//  Endpoints
var MW_ROOT = 'http://www.dictionaryapi.com/api/v1/references/sd2/xml/';
//http://www.dictionaryapi.com/api/v1/references//xml/test?key=5590eec7-58b6-40f8-b912-60c2e61c7f6a
//  Dependencies
var request = require('request'),
    xml     = require('xml2js');
  
//  Dictionary constructor
var Dictionary = function (config) {  
    this.key = config.key;
}

//  Dictionary functions
Dictionary.prototype = {

    //returns a word's definition
    define: function(word, callback){
        console.log("WORD", word)
        this.raw(word, function(error, result){
            if (error === null) {
                var results = [];

                if (result.entry_list.entry != undefined) {
                    var entries = result.entry_list.entry;
                    for (var i=0; i<entries.length; i++){

                        //remove erroneous results (doodle != Yankee Doodle)
                        if (entries[i].ew == word) {

                            //construct a more digestable object
                            console.log("ENTRIES", entries[i].hw, "ENTRIES")
                            var definition = entries[i].def[0].dt;
                            var partOfSpeech = entries[i].fl;
                            switch (typeof definition) {
                                case "object":
                                    for (var i=0; i<definition.length; i++){
                                        var definitionStr = "";
                                        if (definition[i]["_"].length > 1) definitionStr += " "+definition[i]["_"];
                                    }
                                    definition = definitionStr;
                                    break;
                                case "string":
                                default:
                                    break;
                            }

                            results.push({
                                partOfSpeech: partOfSpeech,
                                definition: definition
                            });
                        }
                    }
                    callback(null, results);
                }
                else if (result.entry_list.suggestion != undefined) {
                    callback('suggestions', result.entry_list.suggestion);
                }
                
            }
            else callback(error);
        });
    },

    //return a javascript object equivalent to the XML response from M-W
    raw: function(word, callback){
        request(this.getSearchUrl(word), function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
                xml.parseString(body, function(error, result){
                    if (error === null) callback(null, result);
                    else if (response.statusCode != 200) console.log("here", response.statusCode);
                    else {
                        console.log(error);
                        callback('XML Parsing error.');
                    }
                });
            }
            else callback('API connection error.')
        });
    },

    //constructs the search url
    getSearchUrl: function(word){
                console.log("WRD", word)
        return MW_ROOT+word+'?key='+this.key;
    }
}

module.exports = Dictionary;