$(function () {
	'use strict';

	var Sidebar = Backbone.View.extend({

		tagName: 'ul',

		template: _.template( '<li><a href="#<%= id %>"><%= title %></a></li>' ),

    render: function () {
			for ( var i = 0; i < this.model.length; i++ ) {
				var currentModel = this.model.models[i];
				this.$el.append( this.template( currentModel.attributes ) );
			}

			return this;
    }

  });

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

    template: _.template( '<div class="img-holder"><img src="https://farm<%= farm %>.staticflickr.com/<%= server %>/<%= id %>_<%= secret %>.jpg" /></div><div class="img-content"><h3><%= title %></h3></div>' ),

    initialize: function ( options ) {
      if ( options ) {
        this.model = options.model;
      }
    },

    render: function () {
			this.$el.attr( 'id', this.model.get( 'id' ) );
      this.$el.html( this.template( this.model.toJSON() ) );
      return this;
    }
  });

  var FlickrList = Backbone.View.extend({

    initialize: function() {
      _.bindAll(this, 'render');

      FlickrCollectionInstance.fetch({
        success: function(response, xhr) {
          FlickrListView.render();

					var aside = document.getElementsByTagName( 'aside' );
					$(aside).append( SidebarView.render().$el );
        }
      });
    },

    render: function() {
      for ( var i = 0; i < this.model.length; i++ ) {
        var currentModel = this.model.models[i];
        var flickrItem = new FlickrItem( { model: currentModel } );

        this.$el.append( flickrItem.render().el );
      }

      return this;
    }

  });

	var ul = document.getElementById( 'photo-list' );
  var FlickrCollectionInstance = new FlickrCollection();
  var FlickrListView = new FlickrList( { model: FlickrCollectionInstance } );
	var SidebarView = new Sidebar( { model: FlickrCollectionInstance } );

	FlickrListView.setElement( ul );
});
