describe('Creating a Channel', function() {

  var
  ch,
  chName,
  name = 'test',
  v, c, r;

  beforeEach(function() {

    ch = new Backbone.Wreqr.Channel( name );
    chName = ch.channelName;
    v = ch.vent;
    c = ch.commands;
    r = ch.reqres;

  });

  it( 'should set the name', function() {
    expect( chName ).to.equal( name );
  });

  it( 'should instantiate a new instance of each messaging system', function() {
    expect( v ).to.be.instanceof( Backbone.Wreqr.EventAggregator );
    expect( c ).to.be.instanceof( Backbone.Wreqr.Commands );
    expect( r ).to.be.instanceof( Backbone.Wreqr.RequestResponse );
  });

});