$(function () {
	'use strict';

  var FlickrModel = Backbone.Model.extend({});

  var FlickrCollection = Backbone.Collection.extend({

    API_KEY: 'a5e95177da353f58113fd60296e1d250',
    USER_ID: '132365033@N08',

    model: FlickrModel,
    url: function ( ) {
      return 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=' + this.API_KEY + '&user_id=' + this.USER_ID + '&format=json&nojsoncallback=1';
    },

    parse: function(response) {
      return response.photos.photo;
    }
  });

  var FlickrItem = Backbone.View.extend({

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

  var FlickrList = Backbone.View.extend({

    // el: $('article ul'),

    initialize: function() {
      _.bindAll(this, 'render');

      FlickrCollectionInstance.fetch({
        success: function(response, xhr) {
          FlickrView.render();
        }
      });
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

	var article = document.getElementById( 'photo-list' );
  var FlickrCollectionInstance = new FlickrCollection();
  var FlickrView = new FlickrList();

	FlickrView.setElement( article );
});
