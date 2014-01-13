Backbone.WreqrChannel
================

Backbone.WreqrChannel is a pattern for organizing multiple instances of `Backbone.Wreqr` in a single object called a Channel.

## About

The three messaging systems of `Wreqr`, an event aggregator, commands, and request-response, are convenient ways to communicate information within your application. `WreqrChannel` introduces a new concept called a Channel, which is simply a collection of those three messaging systems bundled together with an associated name. It also lets you attach Channels onto any other object in your application, which are called Stations.

With WreqrChannel you can manage as many Channels as you'd like throughout your application. An example use case is having a Channel for each component of your application and a single global Channel that connects them.

## Installation

Clone this repository or install via bower: `bower install backbone.wreqr-channel`

Include the file `backbone.wreqr-channel.js` in your application's scripts bundle.

## Nomenclature

This library consistently uses the following naming convention for each instance of messaging system:

`vent: EventAggregator`

`commands: Commands`

`reqres: RequestResponse`

## Channels

### Creating a New Channel

`new Backbone.WreqrChannel( channelName, [vent, commands, reqres ] )`

Create a new Channel with name `channelName`. If you also pass instances of all three messaging systems then they will be used to construct your Channel. If any are omitted then a new instance of all three will be set up for the Channel.

### Connect Events to the Channel

You may connect events as usual to your messaging systems on each channel. For instance, `myChannel.vent.on( 'someEvent', someCallback );` will attach listeners to the `vent`.

In addition, Channels have three convenience functions to make this a bit more tolerable when attaching a large number of events:

`connectEvents( ventsHash )`

`connectComands( commandsHash )`

`connectRequests( requestsHash )`

The first argument of these functions are hashes of events. An example hash might explain them best.

```
// Set up a new channel
var someChannel = new Backbone.WreqrChannel( 'someName' );

// Create the hash of events and their callbacks. The callback can
// either be the name of a function on `this`, or the function itself
var ventsHash = {
  'something:happened': 'fnName',
  'somethingElse:happened': this.callbackFn
};

// Attach them
someChannel.connectEvents( ventsHash );
```

All three connect functions will return the `channel`.

### Reset the Channel

`resetChannel()`

Remove all of the listeners and handlers for each messaging system on the Channel. The Channel itself is returned from the function.

## Stations

Stations are objects that attach to Channels. This allows them to communicate on those Channels with the other elements of your application.

### Create a Station

Any object at all can become a Station. Simply extend it with `Backbone.WreqrStation` using Underscore's `extend` method.

`_.extend( myObj, Backbone.WreqrStation );`

Once an object has been extended you're free to call any of the following methods on it.

### Attach a Channel

`attachChannel( channel )`

Attach an existing `channel` to your Station. Returns the newly attached Channel.

### Detach a Channel

`detachChannel( channelName [, off ] )`

Removes the Channel with `channelName` from the station, if it's attached. Pass `true` as the second argument to shut the Channel down by removing all of its listeners and handlers. Returns the detached Channel.

### Detach all Channels

`detachAllChannels( [ off ] )`

Detaches all Channels from the Station. Pass `off` as `true` to also reset the Channels, removing all of their listeners.

### Access a Channel

`channel( channelName )`

Returns a Channel by name.

### Check for a Channel

`hasChannel( channelName )`

Determine if you have a channel named `channelName`. Returns `true` or `false`.



### Internals

#### Storing Channels

Channels are stored in a `_channels` property on the Station. It is not recommended that you access this property directly.