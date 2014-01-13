describe('Passing a channelName to `detachChannel`', function() {

    var m, ch, ch1, name = 'test', chs, ret;

    beforeEach(function() {

      m  = _.extend( new Backbone.Model(), Backbone.WreqrStation );
      ch = new Backbone.WreqrChannel( name );
      m.attachChannel( ch );
      ret = m.detachChannel( name );
      chs = m._channels;
    });

    it( 'should remove the channel', function() {
      expect( chs ).to.have.length( 0 );
    });
    it( 'should return the removed channel', function() {
      expect( ret ).to.equal( ch );
    });

});

describe('Passing off as true when calling `detachChannel`', function() {

    var m, ch, ch1, name = 'test', chs, stub;

    beforeEach(function() {

      m  = _.extend( new Backbone.Model(), Backbone.WreqrStation );
      ch = new Backbone.WreqrChannel( name );
      ch1 = m.attachChannel( ch );
      stub = sinon.stub( ch1, 'reset' );
      m.detachChannel( name, true );
    });

    it( 'should shut down the channel', function() {
      expect( stub ).to.have.been.calledOnce;
    });

});