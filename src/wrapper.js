<%= banner %>

(function (root, factory) {
  if ( typeof define === 'function' && define.amd ) {

    // AMD. Register as an anonymous module.
    define( ['underscore', 'backbone'], function (_, backbone) {
        return ( root.WreqrRadio = factory(_, backbone) );
    });

  } else if ( typeof exports === 'object' ) {

    var
    _ = require( 'underscore' ),
    Backbone = require( 'backbone' );

    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory( _, Backbone );

  } else {
    // Browser globals
    root.Backbone.Wreqr = root._.extend( root.Backbone.Wreqr, factory(root._, root.Backbone) );
    root.Backbone.radio = root.Backbone.Wreqr.radio;
  }
}(this, function (_, Backbone) {

  // @include backbone.wreqr-radio.js

  return WreqrRadio;

}));