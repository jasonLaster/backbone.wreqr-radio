describe('Calling `request` from the radio object', function() {

  var ch, chName, reqName, stub;

  beforeEach(function() {

    chName = 'test';
    reqName = 'some:request';

    ch = Backbone.radio.channel( chName );

    stub = sinon.stub( ch.reqres, 'request' );
    Backbone.radio.reqres.request( chName, reqName );

  });

  afterEach(function() {

    stub.restore();

  });

  it( 'should forward the call to the Channel\'s reqres request function', function() {
    expect( stub ).to.be.calledOnce;
  });

  it( 'should pass the correct arguments to reqres.request', function() {
    expect( stub ).to.always.have.been.calledWithExactly( reqName );
  });

});

describe('Calling `setHandler` from the radio.reqres object', function() {

  var ch, chName, fn, commandName, stub;

  beforeEach(function() {

    chName = 'test';
    fn = function() {};
    commandName = 'some:command';

    ch = Backbone.radio.channel( chName );

    stub = sinon.stub( ch.reqres, 'setHandler' );
    Backbone.radio.reqres.setHandler( chName, commandName, fn );

  });

  afterEach(function() {

    stub.restore();

  });

  it( 'should forward the call to the Channel\'s reqres object', function() {
    expect( stub ).to.be.calledOnce;
  });

  it( 'should pass the correct arguments to reqres.setHandler', function() {
    expect( stub ).to.always.have.been.calledWithExactly( commandName, fn );
  });

});

describe('Calling `setHandlers` from the radio.reqres object', function() {

  var ch, chName, obj, commandName, stub;

  beforeEach(function() {

    chName = 'test';
    obj = {
      some1: function() {},
      some2: function() {}
    };
    commandName = 'some:command';

    ch = Backbone.radio.channel( chName );

    stub = sinon.stub( ch.reqres, 'setHandlers' );
    Backbone.radio.reqres.setHandlers( chName, commandName, obj );

  });

  afterEach(function() {

    stub.restore();

  });

  it( 'should forward the call to the Channel\'s reqres object', function() {
    expect( stub ).to.be.calledOnce;
  });

  it( 'should pass the correct arguments to reqres.setHandlers', function() {
    expect( stub ).to.always.have.been.calledWithExactly( commandName, obj );
  });

});

describe('Calling `removeHandler` from the radio.reqres object', function() {

  var ch, chName, commandName, stub;

  beforeEach(function() {

    chName = 'test';
    commandName = 'some:command';

    ch = Backbone.radio.channel( chName );

    stub = sinon.stub( ch.reqres, 'removeHandler' );
    Backbone.radio.reqres.removeHandler( chName, commandName );

  });

  afterEach(function() {

    stub.restore();

  });

  it( 'should forward the call to the Channel\'s reqres object', function() {
    expect( stub ).to.be.calledOnce;
  });

  it( 'should pass the correct arguments to reqres.removeHandler', function() {
    expect( stub ).to.always.have.been.calledWithExactly( commandName );
  });

});

describe('Calling `removeAllHandlers` from the radio.reqres object', function() {

  var ch, chName, stub;

  beforeEach(function() {

    chName = 'test';

    ch = Backbone.radio.channel( chName );

    stub = sinon.stub( ch.reqres, 'removeAllHandlers' );
    Backbone.radio.reqres.removeAllHandlers( chName );

  });

  afterEach(function() {

    stub.restore();

  });

  it( 'should forward the call to the Channel\'s reqres object', function() {
    expect( stub ).to.be.calledOnce;
  });

});