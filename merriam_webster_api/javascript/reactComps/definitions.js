var React = require('react');

module.exports = React.createClass ({
	defs: function () {
		var obj = this.props.data;
		var items = Object.keys(obj).map(function(item){
			return (<p className="definition" >{obj[item]}</p>)
		});
		return items
	},
	render: function (){
		return (<div>{this.defs()}</div>)
	}
})