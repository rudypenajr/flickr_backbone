var $ = require('jquery')(window);
var Backbone = require('backbone');
var FlickrModel = require( './FlickrModel' );

Backbone.$ = $;

module.exports = Backbone.Collection.extend({

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
