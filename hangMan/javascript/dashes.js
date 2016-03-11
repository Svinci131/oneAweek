var React = require('react');

module.exports = React.createClass({
	render:function(){
		// console.log("test")
		var word = this.props.data.word;
		return (<div>{word.map(function(l){
			var isGuessed = this.props.data.lettersShown[l]
			// console.log("test", isGuessed, l)
			if (!isGuessed) {
				return (<span className='blank' >_</span>)
			}
			else {
				return (<span className='blank' >{l}</span>)
			}
		}.bind(this))}</div>)
	}
});
