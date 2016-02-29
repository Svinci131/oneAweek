var request = require('superagent');
var url = "http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
// var wordObj = {};


var wordObj =  new Promise(function(resolve, reject) {
        request
         .get(url)
         .end(function(err, res) {
         if (err || !res.ok) {
               console.log('Oh no! error');
             } else {
             // wordObj = res.body 
             resolve (res.body)
            }
        });
});

wordObj.then (function (val) {
    console.log( val);
})
