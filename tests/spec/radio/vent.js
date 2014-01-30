describe('Calling `off` from the radio object', function() {

  var ch, chName, obj, fn, eventName, stub;

  beforeEach(function() {

    chName = 'test';
    fn = function() {};
    eventName = 'some:event';
    obj = { test: true, testTwo: false };

    ch = Backbone.radio.channel( chName );

    stub = sinon.stub( ch.vent, 'on' );
    Backbone.radio.vent.on( chName, eventName, fn, obj );

  });

  afterEach(function() {

    stub.restore();

  });

  it( 'should forward the call to the corresponding Channel vent method', function() {
    expect( stub ).to.be.calledOnce;
  });

  it( 'should pass the correct arguments to vent.on', function() {
    expect( stub ).to.always.have.been.calledWithExactly( eventName, fn, obj );
  });

});

describe('Calling `off` from the radio object with no additional arguments', function() {

  var ch, chName, stub;

  beforeEach(function() {

    chName = 'test';

    ch = Backbone.radio.channel( chName );

    stub = sinon.stub( ch.vent, 'off' );
    Backbone.radio.vent.off( chName );

  });

  afterEach(function() {

    stub.restore();

  });

  it( 'should forward the call to the Channel vent `off` method', function() {
    expect( stub ).to.be.calledOnce;
  });

});

describe('Passing additional arguments to the `off` function', function() {

  var ch, chName, obj, fn, eventName, stub;

  beforeEach(function() {

    chName = 'test';
    fn = function() {};
    eventName = 'some:event';

    ch = Backbone.radio.channel( chName );

    stub = sinon.stub( ch.vent, 'off' );
    Backbone.radio.vent.off( chName, eventName, fn );

  });

  afterEach(function() {

    stub.restore();

  });

  it( 'should pass them along to vent.off', function() {
    expect( stub ).to.always.have.been.calledWithExactly( eventName, fn );
  });

});

describe('Calling `once` from the radio object', function() {

  var ch, chName, obj, fn, eventName, stub;

  beforeEach(function() {

    chName = 'test';
    fn = function() {};
    eventName = 'some:event';
    obj = { test: true, testTwo: false };

    ch = Backbone.radio.channel( chName );

    stub = sinon.stub( ch.vent, 'once' );
    Backbone.radio.vent.once( chName, eventName, fn, obj );

  });

  afterEach(function() {

    stub.restore();

  });

  it( 'should forward the call to the Channel vent `once`', function() {
    expect( stub ).to.be.calledOnce;
  });

  it( 'should pass the correct arguments to vent.once', function() {
    expect( stub ).to.always.have.been.calledWithExactly( eventName, fn, obj );
  });

});

describe('Calling `trigger` from the radio object', function() {

  var ch, chName, obj, fn, eventName, stub;

  beforeEach(function() {

    chName = 'test';
    fn = function() {};
    eventName = 'some:event';
    obj = { test: true, testTwo: false };

    ch = Backbone.radio.channel( chName );

    stub = sinon.stub( ch.vent, 'trigger' );
    Backbone.radio.vent.trigger( chName, eventName, fn, obj, true, '2' );

  });

  afterEach(function() {

    stub.restore();

  });

  it( 'should forward the call to the Channel vent `trigger`', function() {
    expect( stub ).to.be.calledOnce;
  });

  it( 'should pass the correct arguments to vent.trigger', function() {
    expect( stub ).to.always.have.been.calledWithExactly( eventName, fn, obj, true, '2' );
  });

});

describe('Calling `stopListening` from the radio object with no extra arguments', function() {

  var ch, chName, stub;

  beforeEach(function() {

    chName = 'test';

    ch = Backbone.radio.channel( chName );

    stub = sinon.stub( ch.vent, 'stopListening' );
    Backbone.radio.vent.stopListening( chName );

  });

  afterEach(function() {

    stub.restore();

  });

  it( 'should forward the call to the Channel vent `stopListening`', function() {
    expect( stub ).to.be.calledOnce;
  });

});

describe('Passing additional arguments to `stopListening`', function() {

  var ch, chName, obj, fn, eventName, stub;

  beforeEach(function() {

    chName = 'test';
    fn = function() {};
    eventName = 'some:event';
    obj = { test: true, testTwo: false };

    ch = Backbone.radio.channel( chName );

    stub = sinon.stub( ch.vent, 'stopListening' );
    Backbone.radio.vent.stopListening( chName, eventName, fn, obj );

  });

  afterEach(function() {

    stub.restore();

  });

  it( 'should pass the correct arguments to vent.trigger', function() {
    expect( stub ).to.always.have.been.calledWithExactly( eventName, fn, obj );
  });

});

describe('Calling `listenTo` from the radio object', function() {

  var ch, chName, obj, fn, eventName, stub;

  beforeEach(function() {

    chName = 'test';
    fn = function() {};
    eventName = 'some:event';
    obj = { test: true, testTwo: false };

    ch = Backbone.radio.channel( chName );

    stub = sinon.stub( ch.vent, 'listenTo' );
    Backbone.radio.vent.listenTo( chName, eventName, fn, obj, true, '2' );

  });

  afterEach(function() {

    stub.restore();

  });

  it( 'should forward the call to the Channel vent `trigger`', function() {
    expect( stub ).to.be.calledOnce;
  });

  it( 'should pass the correct arguments to vent.trigger', function() {
    expect( stub ).to.always.have.been.calledWithExactly( eventName, fn, obj, true, '2' );
  });

});

describe('Calling `listenToOnce` from the radio object', function() {

  var ch, chName, obj, fn, eventName, stub;

  beforeEach(function() {

    chName = 'test';
    fn = function() {};
    eventName = 'some:event';
    obj = { test: true, testTwo: false };

    ch = Backbone.radio.channel( chName );

    stub = sinon.stub( ch.vent, 'listenToOnce' );
    Backbone.radio.vent.listenToOnce( chName, eventName, fn, obj, true, '2' );

  });

  afterEach(function() {

    stub.restore();

  });

  it( 'should forward the call to the Channel vent `listenToOnce`', function() {
    expect( stub ).to.be.calledOnce;
  });

  it( 'should pass the correct arguments to vent.listenToOnce', function() {
    expect( stub ).to.always.have.been.calledWithExactly( eventName, fn, obj, true, '2' );
  });

});