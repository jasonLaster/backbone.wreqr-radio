describe('Calling `execute` from the radio.commands object', function() {

  var ch, chName, commandName, stub;

  beforeEach(function() {

    chName = 'test';
    commandName = 'some:command';

    ch = Backbone.radio.channel( chName );

    stub = sinon.stub( ch.commands, 'execute' );
    Backbone.radio.commands.execute( chName, commandName );

  });

  afterEach(function() {

    stub.restore();

  });

  it( 'should forward the call to the Channel\'s commands execute function', function() {
    expect( stub ).to.be.calledOnce;
  });

  it( 'should pass the correct arguments to commands.execute', function() {
    expect( stub ).to.always.have.been.calledWithExactly( commandName );
  });

});

describe('Calling `setHandler` from the radio.commands object', function() {

  var ch, chName, fn, commandName, stub;

  beforeEach(function() {

    chName = 'test';
    fn = function() {};
    commandName = 'some:command';

    ch = Backbone.radio.channel( chName );

    stub = sinon.stub( ch.commands, 'setHandler' );
    Backbone.radio.commands.setHandler( chName, commandName, fn );

  });

  afterEach(function() {

    stub.restore();

  });

  it( 'should forward the call to the Channel\'s commands object', function() {
    expect( stub ).to.be.calledOnce;
  });

  it( 'should pass the correct arguments to commands.setHandler', function() {
    expect( stub ).to.always.have.been.calledWithExactly( commandName, fn );
  });

});

describe('Calling `setHandlers` from the radio.commands object', function() {

  var ch, chName, obj, commandName, stub;

  beforeEach(function() {

    chName = 'test';
    obj = {
      some1: function() {},
      some2: function() {}
    };
    commandName = 'some:command';

    ch = Backbone.radio.channel( chName );

    stub = sinon.stub( ch.commands, 'setHandlers' );
    Backbone.radio.commands.setHandlers( chName, commandName, obj );

  });

  afterEach(function() {

    stub.restore();

  });

  it( 'should forward the call to the Channel\'s commands object', function() {
    expect( stub ).to.be.calledOnce;
  });

  it( 'should pass the correct arguments to commands.setHandlers', function() {
    expect( stub ).to.always.have.been.calledWithExactly( commandName, obj );
  });

});

describe('Calling `removeHandlers` from the radio.commands object', function() {

  var ch, chName, commandName, stub;

  beforeEach(function() {

    chName = 'test';
    commandName = 'some:command';

    ch = Backbone.radio.channel( chName );

    stub = sinon.stub( ch.commands, 'removeHandler' );
    Backbone.radio.commands.removeHandler( chName, commandName );

  });

  afterEach(function() {

    stub.restore();

  });

  it( 'should forward the call to the Channel\'s commands object', function() {
    expect( stub ).to.be.calledOnce;
  });

  it( 'should pass the correct arguments to commands.removeHandler', function() {
    expect( stub ).to.always.have.been.calledWithExactly( commandName );
  });

});

describe('Calling `removeAllHandlers` from the radio.commands object', function() {

  var ch, chName, stub;

  beforeEach(function() {

    chName = 'test';

    ch = Backbone.radio.channel( chName );

    stub = sinon.stub( ch.commands, 'removeAllHandlers' );
    Backbone.radio.commands.removeAllHandlers( chName );

  });

  afterEach(function() {

    stub.restore();

  });

  it( 'should forward the call to the Channel\'s commands object', function() {
    expect( stub ).to.be.calledOnce;
  });

});