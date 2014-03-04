/*
 * Wreqr Radio
 * -----------
 * v1.2.0
 *
 * Copyright (c) 2014 Jmeas
 * Distributed under the MIT license
 *
 */

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

  var WreqrRadio = (function(_, Backbone, undefined) {
  
    'use strict';
  
    var radio = {
  
      _channels: {},
  
      vent: {},
      commands: {},
      reqres: {},
  
      // Get a channel
      channel: function( channelName ) {
        
        channelName = channelName || '/';
        return this._getChannel( channelName );
  
      },
  
      // Return the channel if it exists; otherwise make a new one
      _getChannel: function( channelName ) {
  
        var channel;
  
        if ( !_.has(this._channels, channelName) ) {
          channel = new Channel( channelName );
          this._channels[ channelName ] = channel;
        } else {
          channel = this._channels[ channelName ];
        }
  
        return channel;
  
      },
  
      _forwardFn: function( channelName, ms, fn ) {
  
        ms = this._getChannel( channelName )[ ms ];
        var args = Array.prototype.slice.call( arguments, 3 );
  
        ms[fn].apply( ms, args );
  
      }
  
    };
  
    var methods = {
    vent: [
      'on',
      'off',
      'trigger',
      'once',
      'stopListening',
      'listenTo',
      'listenToOnce'
    ],
    handler: [
      'setHandler',
      'setHandlers',
      'removeHandler',
      'removeAllHandlers'
    ],
    commands: [
      'execute'
    ],
    reqres: [
      'request',
    ]
    };
  
    var vent     = methods.vent;
    var commands = _.union( methods.commands, methods.handler );
    var reqres   = _.union( methods.reqres, methods.handler );
  
    _.each( vent, function( fn ) {
    radio.vent[fn] = function( channelName ) {
      var args = Array.prototype.slice.call( arguments, 1 );
      args.unshift( channelName, 'vent', fn );
      radio._forwardFn.apply( radio, args );
    };
    });
  
    _.each( commands, function( fn ) {
    radio.commands[fn] = function( channelName ) {
      var args = Array.prototype.slice.call( arguments, 1 );
      args.unshift( channelName, 'commands', fn );
      radio._forwardFn.apply( radio, args );
    };
    });
  
    _.each( reqres, function( fn ) {
    radio.reqres[fn] = function( channelName ) {
      var args = Array.prototype.slice.call( arguments, 1 );
      args.unshift( channelName, 'reqres', fn );
      radio._forwardFn.apply( radio, args );
    };
    });
  
    var Channel = function( channelName ) {
  
    this.vent        = new Backbone.Wreqr.EventAggregator();
    this.reqres      = new Backbone.Wreqr.RequestResponse();
    this.commands    = new Backbone.Wreqr.Commands();
    this.channelName = channelName;
  
    };
  
    _.extend( Channel.prototype, {
  
    // Remove all handlers from the messaging systems of this channel
    reset: function() {
  
      this.vent.off();
      this.vent.stopListening();
      this.reqres.removeAllHandlers();
      this.commands.removeAllHandlers();
      return this;
  
    },
  
    // Connect a hash of events; one for each messaging system
    connectEvents: function( hash, context ) {
      this._connect( 'vent', hash, context );
      return this;
    },
    connectCommands: function( hash, context ) {
      this._connect( 'commands', hash, context );
      return this;
    },
    connectRequests: function( hash, context ) {
      this._connect( 'reqres', hash, context );
      return this;
    },
  
    // Attach the handlers to a given message system `type`
    _connect: function( type, hash, context ) {
  
      if ( !hash ) { return; }
      context = context || this;
      var method = ( type === 'vent' ) ? 'on' : 'setHandler';
      _.each( hash, function(fn, eventName) {
        this[type][method]( eventName, _.bind(fn, context) );
      }, this);
  
    }
  
    });
  
    var WreqrRadio = {
  
      radio: radio,
      Channel: Channel,
      VERSION: '1.2.0'
  
    };
  
    return WreqrRadio;
  
  })( _, Backbone );

  return WreqrRadio;

}));