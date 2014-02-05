backbone.wreqr-radio
================

Wreqr Radio is a library that allows you to work with multiple instances of `Backbone.Wreqr`, organized into groups called Channels.

## Introduction

The three messaging systems of `Wreqr`, an event aggregator, commands, and request-response, are convenient ways to communicate information within your application. What's missing from `Wreqr`, however, is a convention for handling multiple instances of those messaging systems.

Wreqr Radio solves this issue by introducing a concept called a Channel. Channels are simply a collection of the three messaging systems bundled together with an associated name.

With Wreqr Radio you can manage as many Channels as you'd like throughout your application. An example use case is having a Channel for each component of your application and a single global Channel that connects them.

## Installation

Clone this repository or install via bower.

`bower install backbone.wreqr-radio`

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

_Wreqr Radio is also available via `Backbone.Wreqr.radio`_


## Channel Prototype

### Channels Wreqr

A channel is just an object with an instance of `vent`, `commands`, and `reqres` attached to it. You can use these messaging systems on each channel as usual.

```js
var channel = Backbone.radio.channel();

channel.vent.on( 'some:event', someCb );
channel.commands.setHandler( 'someCommand', commandCb );
channel.reqres.setHandler( 'aRequest', requestCb );
```

### Connect Events to the Channel

Channels have three convenience functions to attaching a large number of events a bit more tolerable.

`connectEvents( ventsHash )`

`connectComands( commandsHash )`

`connectRequests( requestsHash )`

The first argument of these functions are hashes of events.

```js
// Access the 'lala' channel
var someChannel = Backbone.radio.channel( 'lala' );

// Create the hash of events and their callbacks
var ventsHash = {
  'something:happened': someCallbackFn,
  'somethingElse:happened': anotherCallbackFn
};

// Attach them
someChannel.connectEvents( ventsHash );
```

All three connect functions will return the `channel`.

### Reset the Channel

`reset()`

Remove all of the listeners and handlers on the channel. Returns the Channel.

```js
// Get the channel
var ch = Backbone.radio.channel( 'myChannel' );

// Reset the channel
ch.reset();
```

## 'Top Level' API

If you want to communicate on a channel but don't need to keep a reference of it, you can do so through the `radio` object directly.

```js
// Attach a listener on the vent of `someChannel`
Backbone.radio.vent.on( 'someChannel', 'some:event', callbackFn );

// Send a command to `someChannel`s commands
Backbone.radio.commands.execute( 'someChannel', 'myCommand' );

// Attach a handler to the reqres of `someChannel`
Backbone.radio.reqres.setHandler( 'someChannel', 'aRequest', requestCb );
```
