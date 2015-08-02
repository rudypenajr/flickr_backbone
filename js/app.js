var $ = require( 'jquery' )(window);
var FlickrCollection = require( './FlickrCollection' );
var FlickrList = require( './FlickrList' );

( function () {
	'use strict';

  var ul = document.getElementById( 'photo-list' );
  var FlickrCollectionInstance = new FlickrCollection();
  var FlickrView = new FlickrList( { model: FlickrCollectionInstance } );
  
  FlickrView.setElement( ul );
} )();
