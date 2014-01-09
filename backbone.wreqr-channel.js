/*
 * Backbone.Channel
 * An organizational system for handling multiple Wreqr instances
 *
 */

// Set up WreqrChannel for the appropriate environment
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
    root.Backbone = root._.extend( root.Backbone, factory(root, {}, root._, root.Backbone) );
  } 

}(this, function(root, WreqrChannel, _, Backbone) {

  var Wreqr = Backbone.Wreqr;

  Backbone.WreqrChannel = {

    // Set up a channel on this object, defaulting to a new `local` channel
    // Returns the newly created channel
    attachChannel: function( channelName, vent, commands, reqres ) {

      // If a channel is passed as the first argument attach it directly
      if ( !_.isString( channelName ) ) {
        var channel = channelName;
        var newName = vent;
        if ( channel.channelName ) {
          this._channels[ channel.channelName ] = channel;
        }
      }

      // Default the channel name to local
      channelName  = channelName  || 'local';

      if ( !vent || !commands || !reqres ) {
        vent     = new Wreqr.EventAggregator();
        commands = new Wreqr.Commands();
        reqres   = reqres   || new Wreqr.RequestResponse();
      }

      this._channels = this._channels || {};

      this._channels[channelName] = {
        channelName: channelName,
        vent: vent,
        commands: commands,
        reqres: reqres
      };

      return this._channels[ channelName ];

    },

    resetChannel: function( channelName ) {

      // Reset all channels if no name is supplied
      if ( !channelName ) {
        _.each( this._channels, function(channel) {
          this.resetChannel( channel.channelName );
        }, this);
      }

      // Otherwise, reset the specified channel
      var channel = this.channel( channelName );

      if ( !channel ) {
        return;
      }

      channel.vent.off();
      channel.reqres.removeAllHandlers();
      channel.commands.removeAllHandlers();

    },

    // Safely remove a channel. Pass `true` to
    // remove all listeners from the channel
    detachChannel: function( channelName, off ) {

      // Detach all channels if no `channelName` is passed
      if ( !channelName ) {
        _.each( this._channels, function(channel) {
          this.detachChannel( channel.channelName, off );
        }, this);
      }

      var channel = this.channel( channelName );

      if ( !channel ) {
        return;
      }

      if ( off ) {
        this.resetChannel( channelName );
      }

      delete this._channels[ channelName ];

    },

    // Return the channel so you can emit events like
    // this.channel('global').vent('eventName')
    channel: function( name ) {
      return this._channels[ name ];
    },

    // Attach events from a hash to a channel, defaulting to local
    connectEvents: function( vents, channel ) {

      channel  = channel || 'local';
      vents = this._methodsFromHash( vents );

      _.each( vents, function(fn, ventName) {
        this.channel( channel ).vent.on( ventName, _.bind(fn, this) );
      }, this);

      return this;

    },

    // Attach commands from a hash to a channel, defaulting to local
    connectCommands: function( commandsHash, channel ) {

      channel = channel || 'local';
      commandsHash = this._methodsFromHash( commandsHash );

      _.each( commandsHash, function(fn, commandName) {
        this.channel( channel ).commands.setHandler( commandName, _.bind(fn, this) );
      }, this);

      return this;

    },

    connectRequests: function( requestsHash, channel ) {

      channel = channel || 'local';
      requestsHash = this._methodsFromHash( requestsHash );

      _.each( requestsHash, function(fn, requestName) {
        this.channel( channel ).reqres.setHandler( requestName, _.bind(fn, this) );
      }, this);

      return this;

    },

    // Sets up the listeners on the channel by merging `this._defaultEvents`
    // with `this.channelsHash` and applying them
    _configChannel: function( channel ) {

      if ( !channel ) {
        return;
      }

      var
      channelName = channel.channelName,
      channelVent = channel.vent,
      channelCommands = channel.commands,
      channelReqres = channel.reqres;

      var defaultVent, defaultCommands, defaultRequests, nVent, nCommands, nRequests;

      // Get the default event hash
      if ( this._defaultEvents && this._defaultEvents[channelName] ) {
        var channelDefaults = this._defaultEvents[channelName];
        defaultVent = channelDefaults.vent;
        defaultCommands = channelDefaults.commands;
        defaultRequests = channelDefaults.requests;
      }
      // Get events set up later; perhaps in an `initialize` function
      if ( this.channelsHash ) {
        nVent = this.channelsHash.vent;
        nCommands = this.channelsHash.commands;
        nRequests = this.channelsHash.requests;
      }

      var ventHash = _.extend({}, defaultVent, nVent );
      var commandsHash = _.extend({}, defaultCommands, nCommands );
      var requestsHash = _.extend({}, defaultRequests, nRequests );

      this.connectEvents( ventHash, channelName )
          .connectCommands( commandsHash, channelName )
          .connectRequests( requestsHash, channelName );

    },

    // Parse channel hashes of the form
    // {
    //   'someEvent'     : fnReference,
    //   'someOtherEvent': 'fnName'
    // }
    // returning an object of the same form
    // with actual function references (when they exist)
    // instead of strings
    _methodsFromHash: function( hash ) {

      var newHash = {};
      _.each( hash, function(fn, name) {
        method = fn;
        if ( !_.isFunction(method) ) {
          method = this[method];
        }
        if ( !method ) {
          return;
        }
        newHash[name] = method;
      }, this);
      return newHash;

    }

  };

  return Backbone.WreqrChannel;

}));