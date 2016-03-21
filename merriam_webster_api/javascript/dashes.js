var React = require('react');

module.exports = React.createClass({
	dashes:function () {
		console.log(this.props.data.word)
		var arr = this.props.data.word.split("")
		var spaces = arr.map(function(l){ 
				return (<span className="blank" id={l}>_</span>)
			}.bind(this));
		return (spaces)
	},
	render:function(){
		// console.log("test")
		var word = this.props.data.word;
		return (<div>
			<p>{this.dashes()}</p>
			</div>)
	}
});


	// render:function(){
	// 	// console.log("test")
	// 	var word = this.props.data.word;
	// 	return (<div>{word.map(function(l){
	// 		var isGuessed = this.props.data.lettersShown[l]
	// 		// console.log("test", isGuessed, l)
	// 		if (!isGuessed) {
	// 			return (<span className='blank' >_</span>)
	// 		}
	// 		else {
	// 			return (<span className='blank' >{l}</span>)
	// 		}
	// 	}.bind(this))}</div>)
	// }