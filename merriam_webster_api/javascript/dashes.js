var React = require('react');

module.exports = React.createClass({
	dashes:function () {
		var isGuessed = this.props.data.keysGuessed;
		var arr = this.props.data.word.split("")
		var spaces = arr.map(function(l){ 
				l = l.toLowerCase()
				if (!isGuessed[l]) {
					return (<span className="blank" >_</span>)
				}
				else {
					return (<span className="blank" >{l}</span>)
				}
			});
		return (spaces)
	},
	render:function(){
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