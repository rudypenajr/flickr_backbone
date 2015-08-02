var $ = require( 'jquery' )(window);
var _ = require( 'underscore' );
var Backbone = require( 'backbone' );

Backbone.$ = $;

module.exports = Backbone.View.extend({

  tagName: 'li',

  template: _.template( '<div class="img-holder"><a href="#<%= id %>"><img src="https://farm<%= farm %>.staticflickr.com/<%= server %>/<%= id %>_<%= secret %>.jpg" /></div><div class="img-content"><h3><%= title %></h3></div></a>' ),

  initialize: function ( options ) {
    if ( options ) {
      this.model = options.model;
    }
  },

  render: function () {
    this.$el.html( this.template( this.model.toJSON() ) );
    return this;
  }
});
