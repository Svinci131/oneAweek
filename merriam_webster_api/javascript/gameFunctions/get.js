var xhr = new XMLHttpRequest();

module.exports = function (url) {
	return new Promise (function (resolve, reject){
		var xhr = new XMLHttpRequest();
			xhr.addEventListener('load', function(data){
				resolve(data.currentTarget.response)
			});
			xhr.open('GET', url);
			xhr.send();
	});
}