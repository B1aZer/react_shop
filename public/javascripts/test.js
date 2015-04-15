var App = {};

App.createClass = function(obj) {
  var rerender = function(domEl) {
    setInterval(function() {
      domEl.innerHTML = obj.render();
    }, 100);
  };
  var domEl = document.createElement(obj.template);
  rerender(domEl);
  domEl.onclick = function(e) { obj.onClick.call(obj, e);};
  var renderTo = document.getElementById(obj.id);
  renderTo.appendChild(domEl);
};

var comp = App.createClass({
  template: 'div',
  state: {
    text: 'some text'
  },
  onClick: function(e) {
    var self = this;
    var changeText = function() {
      self.state.text += ' another';
    };
    changeText();
  },
  render: function () {
    return this.state.text;
  },
  id: 'view'
});
