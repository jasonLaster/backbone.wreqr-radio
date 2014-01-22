describe('Passing a Channel to `attachChannel`', function() {

    var m, ch, ch1, name = 'test', chs, ret;

    beforeEach(function() {

      m  = _.extend( new Backbone.Model(), Backbone.Wreqr.Station );
      ch = new Backbone.Wreqr.Channel( name );
      console.log( 'Wreqr:', ch );
      ret = m.attachChannel( ch );
      ch1 = m.channel( name );
      chs = m._channels;

    });

    it( 'should attach the channel', function() {
        expect( ch1 ).to.equal( ch );
        expect( chs ).to.have.length( 1 );
    });

    it( 'should return the newly-attached channel', function() {
        expect( ret ).to.equal( ch );
    });

});