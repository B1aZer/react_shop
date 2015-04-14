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
  handleCommentSubmit: function(comment) {
    $.ajax({
      url: '/api/products',
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        var items = this.state.data;
        items.push(comment);
        this.setState({data: items});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
	render: function() {
		return (
      <div className="app">
        <ItemList data={this.state.data} />
        <AddForm onFormSubmit={this.handleCommentSubmit}/>
      </div>
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

var AddForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var price = React.findDOMNode(this.refs.price).value.trim();
    if (!name || !price) {
      return;
    }
    console.log('go');
    this.props.onFormSubmit({name: name, price: price});
    React.findDOMNode(this.refs.name).value = '';
    React.findDOMNode(this.refs.price).value = '';
    return;
  },
  render: function() {
    return (
      <form className="add-form" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Product name" ref="name"/>
        <input type="number" placeholder="Your price" ref="price"/>
        <input type="submit" value="Post" />
      </form>
    );
  }
});

module.exports = App;
