/*
 * Backbone.WreqrRadio
 * An organizational system for handling multiple Wreqr instances
 *
 */

// Set this up for the appropriate environment
(function(root, factory) {

  // AMD
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', 'exports'], function(_, backbone, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports, _, backbone);
    });

  // Node / CommonJS
  } else if (typeof exports !== 'undefined') {

    var
    _ = require('underscore'),
    Backbone = require('backbone');

    factory(root, exports, _, Backbone);

  // Otherwise, as a global variable
  } else {
    root.Backbone.Wreqr = root._.extend( root.Backbone.Wreqr, factory(root, {}, root._, root.Backbone) );
    root.Backbone.Radio = root.Backbone.Wreqr.Radio;
  } 

}(this, function(root, WreqrChannel, _, Backbone) {

  'use strict';

  var Radio = {

    _channels: {},

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

  _.each( methods.vent, function( fn ) {
    Radio[fn] = function( channelName ) {
      var args = Array.prototype.slice.call( arguments, 1 );
      args.unshift( channelName, 'vent', fn );
      Radio._forwardFn.apply( Radio, args );
    };
  });

  _.each( methods.commands, function( fn ) {
    Radio[fn] = function( channelName ) {
      var args = Array.prototype.slice.call( arguments, 1 );
      args.unshift( channelName, 'commands', fn );
      Radio._forwardFn.apply( Radio, args );
    };
  });

  _.each( methods.commands, function( fn ) {
    Radio[fn] = function( channelName ) {
      var args = Array.prototype.slice.call( arguments, 1 );
      args.unshift( channelName, 'reqres', fn );
      Radio._forwardFn.apply( Radio, args );
    };
  });

  _.each( methods.handlers, function( fn ) {
    Radio[fn] = function( channelName, type ) {
      var args = Array.prototype.slice.call( arguments, 2 );
      args.unshift( channelName, type, fn );
      Radio._forwardFn.apply( Radio, args );
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
    connectEvents: function( hash ) {
      this._connect( 'vent', hash );
      return this;
    },
    connectCommands: function( hash ) {
      this._connect( 'commands', hash );
      return this;
    },
    connectRequests: function( hash ) {
      this._connect( 'reqres', hash );
      return this;
    },

    // Attach the handlers to a given message system `type`
    _connect: function( type, hash ) {

      if ( !hash ) { return; }
      hash = this._normalizeMethods( hash );
      var method = ( type === 'vent' ) ? 'on' : 'setHandler';
      _.each( hash, function(fn, eventName) {
        this[type][method]( eventName, _.bind(fn, this) );
      }, this);

    },

    _attach: function( type, method, eventName, fn ) {
      this[type][method]( eventName, _.bind(fn, this) );
    },

    // Parse channel hashes of the form
    // {
    //   'someEvent'     : fnReference,
    //   'someOtherEvent': 'fnName'
    // }
    // returning an object of the same form
    // with actual function references (when they exist)
    // instead of strings
    _normalizeMethods: function( hash ) {

      var newHash = {}, method;
      _.each( hash, function(fn, eventName) {
        method = fn;
        if ( !_.isFunction(method) ) {
          method = this[method];
        }
        if ( !method ) {
          return;
        }
        newHash[eventName] = method;
      }, this);
      return newHash;

    }

  });

  var WreqrExtension = {};
  WreqrExtension.Radio = Radio;
  WreqrExtension.Channel = Channel;

  return WreqrExtension;

}));