//var mW = http://www.dictionaryapi.com/api/v1/references/sd2/xml/test?key=5590eec7-58b6-40f8-b912-60c2e61c7f6a
// var setgetgo = "http://randomword.setgetgo.com/get.php"
module.exports = {
	setWord: function (obj, str, cb) {
		console.log("HERE", obj.word, str)
		obj.word = str;
	}
}



















// var request = require("superagent");

// request(this.getSearchUrl(word), function (error, response, body) {
// request
// 		  .get('http://www.omdbapi.com/')
// 		  .query({t: url})
// 		  .end(function(err, response){
// 		  	//console.log( _.where(response.body) )
// 		    // Calling the end function will send the request

// 		    res.writeHead(200);
// 		    res.end( JSON.stringify( _.where(response.body )) );
// 		  });
// 		  return;

// function RandomWord() {
//     var requestStr = "http://randomword.setgetgo.com/get.php";
//     $.ajax({
//         type: "GET",
//         url: requestStr,
//         dataType: "jsonp",
//         jsonpCallback: 'RandomWordComplete'
//     });
// }

// function RandomWordComplete(data) {
//     alert(data.Word);
// }