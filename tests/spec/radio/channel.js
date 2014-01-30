describe('Calling channel for a nonexistent channel', function() {

    var
    ch,
    chName;

    beforeEach(function() {

      ch = Backbone.Radio.channel();
      chName = ch.channelName;

    });

    it( 'should create a new instance of the channel for you', function() {
      expect( ch ).to.be.instanceOf( Backbone.Wreqr.Channel );
    });

});

describe('Calling channel with no arguments', function() {

    var chName;

    beforeEach(function() {

      chName = Backbone.Radio.channel().channelName;

    });

    it( 'should return an instance of the default channel', function() {
      expect( chName ).to.equal( '/' );
    });

});

describe('Calling channel with a name argument for a nonexistent channel', function() {

    var
    tName = 'lala',
    chName;

    beforeEach(function() {

      chName = Backbone.Radio.channel( tName ).channelName;

    });

    it( 'should return a channel by that name', function() {
      expect( chName ).to.equal( tName );
    });

});

describe('Calling channel twice with the same name', function() {

    var
    tName = 'lala',
    chOne,
    chTwo;

    beforeEach(function() {

      chOne = Backbone.Radio.channel( tName );
      chTwo = Backbone.Radio.channel( tName );

    });

    it( 'should return the same channel', function() {
      expect( chOne ).to.equal( chTwo );
    });

});