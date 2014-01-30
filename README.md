backbone.wreqr-radio
================

`backbone.wreqr-radio` is a library that allows you to organize multiple instances of `Backbone.Wreqr` into groups called Channels.

## About

The three messaging systems of `Wreqr`, an event aggregator, commands, and request-response, are convenient ways to communicate information within your application. `wreqr-radio` introduces a new concept called a Channel, which is simply a collection of those three messaging systems bundled together with an associated name.

With `wreqr-radio` you can manage as many Channels as you'd like throughout your application. An example use case is having a Channel for each component of your application and a single global Channel that connects them.

## Installation

Clone this repository or install via bower: `bower install backbone.wreqr-radio`

Include the file `backbone.wreqr-radio.js` in your application's scripts bundle.

## Nomenclature

This library consistently uses the following naming convention for each instance of messaging system:

`vent: EventAggregator`

`commands: Commands`

`reqres: RequestResponse`

## Usage

### Accessing a channel

`Backbone.radio.channel( [channelName] );`

Returns the channel with the supplied `channelName`. If no `channelName` is supplied the default channel is returned.

### Channels Wreqr

A channel is just an object with an instance of `vent`, `commands`, and `reqres` attached to it. You can use these messaging systems on each channel as you're accustomed to.

```js
var channel = Backbone.radio.channel();

channel.vent.on( 'some:event', someCb );
channel.commands.setHandler( 'someCommand', commandCb );
channel.reqres.setHandler( 'aRequest', requestCb );
```

### Connect Events to the Channel

Channels have three convenience functions to make this a bit more tolerable when attaching a large number of events:

`connectEvents( ventsHash )`

`connectComands( commandsHash )`

`connectRequests( requestsHash )`

The first argument of these functions are hashes of events.

```js
// Access the 'lala' channel
var someChannel = Backbone.radio.channel( 'lala' );

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

Remove all of the listeners and handlers for each messaging system on the Channel. Returns the Channel.

## Global API

If you want to communicate on a channel but don't want to keep a reference of it, you can do so through the `radio` object directly.

```js
// Attach a listener on the vent of `someChannel`
Backbone.radio.vent.on( 'someChannel', 'some:event', callbackFn );

// Send a command to `someChannel`s commands
Backbone.radio.commands.execute( 'someChannel', 'myCommand' );

// Attach a handler to the reqres of `someChannel`
Backbone.radio.reqres.setHandler( 'someChannel', 'aRequest', requestCb );
```
