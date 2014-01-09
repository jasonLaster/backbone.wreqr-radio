Backbone.Channel
================

Backbone.Channel is a pattern for organizing multiple instances of `Backbone.Wreqr` into groups called channels.

### About

You might know that `Wreqr` provides three messaging systems (vent, commands, and reqres) for communication in decoupled applications. `WreqrChannel` introduces a new concept called a channel, which is a simply a collection of those three messaging systems bundled together with an associated name.

With WreqrChannel you can manage as many of these channels as you'd like throughout your application. An example use case is having a channel for each component of your application and a single global channel that connects them.

### Installation

Clone this repository or install via bower: `bower install backbone.wreqr-channel`

Include the file `backbone.wreqr-channel.js` in your application.

### Basic Use

To begin, extend your object with the `WreqrChannel` functionality using Underscore's `extend` method.

`_.extend( myObj, Backbone.WreqrChannel );`

#### Attach a Channel

`attachChannel( [channelName] [, ventInstance, commandsInstance, reqresInstance ] )`

Attach a channel to your object. If `name` is omitted, `local` will be used as the name. If any one of the messaging systems are omitted, a new instance of all three will be created for you.

`~~attachChannel( [channel] [, newName] )~~`

~~Attach an existing channel to your object. Pass a `newName` if you'd like to reference it through a different name on this object.~~ (To do)

#### Detach a Channel

`detachChannel( [channelName] [, off ] )`

Removes a channel from the object. If `channelName` is omitted all channels will be removed. Pass `true` for the second argument to shut the channel down completely by removing all of its listeners.

#### Reset a Channel

`resetChannel( [channelName] )`

Remove all of the listeners from a channel. If a name is omitted, every channel on the object will be reset.

#### Access a Channel

`channel( channelName )`

Returns a channel by name.

#### Connect Events to a Channel

You may connect events as usual to your messaging systems on each channel. For instance, `this.channel( 'local' ).vent.on( 'someEvent', someCallback );` will attach listeners to the `vent` on the `local` channel. But WreqrChannel provides three convenience functions to make this a bit more tolerable when attaching a large number of events:

`connectEvents( ventsHash, channelName )`
`connectComands( commandsHash, channelName )`
`connectRequests( requestsHash, channelName )`

The first argument of these functions takes the same form as the `events` hash that can be passed into Backbone. An example might explain this better:

```
// Set up a new channel
this.attachChannel( 'someChannel' );

// Create the hash of events and their callbacks. The callback can
// either be the name of a function on `this`, or the function itself
var ventsHash = {
  'something:happened': 'fnName',
  'somethingElse:happened': this.callbackFn
};

// Attach them
this.connectEvents( ventsHash, 'someChannel' );
```

#### The `channel` object

A channel object has four properties:

`channelName` - The name of the channel
`vent` - An instance of Wreqr.Vent
`commands` - An instance of Wreqr.Commands
`reqres` - An instance of Wreqr.Reqres