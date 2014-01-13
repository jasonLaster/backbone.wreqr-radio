describe('Creating a Channel and passing only a name', function() {

    var
    ch,
    chName,
    name = 'test',
    v, c, r;

    beforeEach(function() {

      ch = new Backbone.WreqrChannel( name );
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

describe('Creating a Channel and passing three messaging systems', function() {

    var
    ch,
    vT, cT, rT,
    v, c, r;

    beforeEach(function() {

      vT = new Backbone.Wreqr.EventAggregator();
      cT = new Backbone.Wreqr.Commands();
      rT = new Backbone.Wreqr.RequestResponse();

      ch = new Backbone.WreqrChannel( 'test', vT, cT, rT );
      v = ch.vent;
      c = ch.commands;
      r = ch.reqres;

    });

    it( 'should attach them to the Channel', function() {
      expect( v ).to.equal( vT );
      expect( c ).to.equal( cT );
      expect( r ).to.equal( rT );
    });

});

describe('Creating a Channel and only passing some messaging systems', function() {

    var
    ch,
    vT, cT, rT,
    v, c, r;

    beforeEach(function() {

      vT = new Backbone.Wreqr.EventAggregator();
      cT = new Backbone.Wreqr.Commands();
      rT = new Backbone.Wreqr.RequestResponse();

      ch = new Backbone.WreqrChannel( 'test', vT, cT );
      v = ch.vent;
      c = ch.commands;
      r = ch.reqres;

    });

    it( 'should instantiate a brand new set', function() {
      expect( v ).to.be.instanceof( Backbone.Wreqr.EventAggregator );
      expect( c ).to.be.instanceof( Backbone.Wreqr.Commands );
      expect( r ).to.be.instanceof( Backbone.Wreqr.RequestResponse );
      expect( v ).to.not.equal( vT );
      expect( c ).to.not.equal( cT );
      expect( r ).to.not.equal( rT );
    });

});

describe('Creating a Channel and not passing messaging systems as arguments', function() {

    var
    ch,
    vT, cT, rT,
    v, c, r;

    beforeEach(function() {

      vT = 'test';
      cT = true;
      rT = Backbone;

      ch = new Backbone.WreqrChannel( 'test', vT, cT, rT );
      v = ch.vent;
      c = ch.commands;
      r = ch.reqres;

    });

    it( 'should ignore the arguments and instantiate a new set', function() {
      expect( v ).to.be.instanceof( Backbone.Wreqr.EventAggregator );
      expect( c ).to.be.instanceof( Backbone.Wreqr.Commands );
      expect( r ).to.be.instanceof( Backbone.Wreqr.RequestResponse );
      expect( v ).to.not.equal( vT );
      expect( c ).to.not.equal( cT );
      expect( r ).to.not.equal( rT );
    });

});