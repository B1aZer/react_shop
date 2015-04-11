/** @jsx React.DOM */
var React = require('react');

var data = [
  {name: "Pete Hunt", price: 23.01},
  {name: "Jordan Walke", price: 11.00}
];

var App = React.createClass({
  getInitialState: function() {
    return {data: data};
  },
  componentDidMount: function() {
    $.ajax({
      url: '/api/products',
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
	render: function() {
		return (
      <ItemList data={this.state.data} />
		);
	}
});

var ItemList = React.createClass({
	render: function() {
    var itemNodes = this.props.data.map(function (item) {
      return (
        <div className="col-xs-4">
          <Item name={item.name} price={item.price} />
        </div>
      );
    });
    return (
      <div className="item-list">
        {itemNodes}
      </div>
    );
  }
});
	
var Item = React.createClass({
	render: function() {
		return (
      <div className="thumbnail">
        <img src="http://placehold.it/320x150" alt=""/>
          <div className="caption">
            <h4 className="pull-right">{this.props.price}<span>$</span></h4>
            <h4><a href="#">{this.props.name}</a>
            </h4>
            <p>See more snippets like this online store item at <a target="_blank" href="http://www.bootsnipp.com">Bootsnipp - http://bootsnipp.com</a>.</p>
          </div>
          <div className="ratings">
            <p className="pull-right">15 reviews</p>
            <p>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
            </p>
          </div>
        </div>
		);
	}
});

module.exports = App;
