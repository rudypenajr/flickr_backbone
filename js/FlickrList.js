var $ = require( 'jquery' )(window);
var _ = require( 'underscore' );
var Backbone = require( 'backbone' );

var FlickrItem = require( './FlickrItem' );

Backbone.$ = $;

module.exports = Backbone.View.extend({

  tagName: 'ul',

  initialize: function( options ) {
    // model is collection
    if ( options ) {
      this.model = options.model;
    }

    _.bindAll(this, 'render');

    if ( this.model ) {
      this.model.fetch({
        success: function(response, xhr) {
          FlickrView.render();
        }
      });
    }
  },

  render: function() {
    for ( var i = 0; i < FlickrCollectionInstance.length; i++ ) {
      var currentModel = FlickrCollectionInstance.models[i];
      var flickrItem = new FlickrItem( { model: currentModel } );

      this.$el.append( flickrItem.render().el );
    }

    return this;
  }

});
