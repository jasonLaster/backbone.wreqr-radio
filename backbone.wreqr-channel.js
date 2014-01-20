/*
 * Backbone.WreqrChannel
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
    root.Backbone = root._.extend( root.Backbone, factory(root, {}, root._, root.Backbone) );
  } 

}(this, function(root, WreqrChannel, _, Backbone) {

  'use strict';

  var WreqrExtension = {};

  // The channel object. All that it does is hold an instance of each messaging system
  WreqrExtension.WreqrChannel = function( name, vent, commands, reqres ) {

    // Channels need a name
    if ( !name ) {
      return;
    }

    var
    createNew = false,
    w = Backbone.Wreqr;

    // Instantiate new messaging systems if all 3 aren't passed,
    // or if they aren't instances of the messaging systems.
    if ( !vent || !commands || !reqres  ) {
      createNew = true;
    } else if ( !(vent instanceof w.EventAggregator) ) {
      createNew = true;
    } else if ( !(commands instanceof w.Commands) ) {
      createNew = true;
    } else if ( !(reqres instanceof w.RequestResponse) ) {
      createNew = true;
    }

    if ( createNew ) {
      vent = new w.EventAggregator();
      reqres = new w.RequestResponse();
      commands = new w.Commands();
    }

    this.vent     = vent;
    this.reqres   = reqres;
    this.commands = commands;
    this.channelName = name;

  };

  _.extend( WreqrExtension.WreqrChannel.prototype, {

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
      hash = this._methodsFromHash( hash );
      var method = ( type === 'vent' ) ? 'on' : 'setHandler';
      _.each( hash, function(fn, name) {
        this[type][method]( name, _.bind(fn, this) );
      }, this);

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

      var newHash = {}, method;
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

  });

  WreqrExtension.WreqrStation = {

    // Attach a channel to this station
    attachChannel: function( channel ) {

      if ( !channel || !(channel instanceof Backbone.WreqrChannel) ) {
        return;
      }

      // Ensure the channels container
      this._channels = this._channels || [];

      if ( !_.contains(this._channels, channel) ) {
        this._channels.push( channel );
      }

      return channel;

    },

    // Safely remove a channel. Pass `true` to
    // remove all listeners from the channel
    detachChannel: function( channelName, off ) {

      // There are no channels set up; ignore the request
      if ( !this._channels || !channelName ) {
        return;
      }

      // Get the channel by name
      var channel = this.channel( channelName );

      if ( !channel ) {
        return;
      }

      // Reset the channel if `off` is passed as true
      if ( off === true ) {
        channel.reset();
      }

      // Remove the channel, then return it
      this._channels = _.without( this._channels, channel );

      return channel;

    },

    detachAllChannels: function( off ) {

      if ( !this._channels ) {
        return;
      }
      var channelName;
      _.each( this._channels, function(channel) {
        channelName = channel.channelName;
        this.detachChannel( channelName, off );
      }, this);

    },

    // Return a channel by name
    channel: function( channelName ) {
      if ( !this._channels ) {
        return;
      }
      return _.findWhere( this._channels, { channelName: channelName } );
    },

    // Determine if you have a channel by the passed-in name
    hasChannel: function( channelName ) {

      if ( !this._channels ) {
        return;
      }
      var length = _.findWhere( this._channels, { channelName: channelName } );

      return length ? true : false;
    }

  };

  return WreqrExtension;

}));