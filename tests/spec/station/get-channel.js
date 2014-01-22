describe('Passing a channel name to `channel`', function() {

    var n,
    t1 = 'test',
    t2 = 'test2',
    ch1, ch2,
    r1, r2;

    beforeEach(function() {

      n = _.extend( new Backbone.Model(), Backbone.Wreqr.Station );
      ch1 = new Backbone.Wreqr.Channel( t1 );
      ch2 = new Backbone.Wreqr.Channel( t2 );
      n.attachChannel( ch1 );
      n.attachChannel( ch2 );

      r1 = n.channel( t1 );
      r2 = n.channel( t2 );

      // Strip out the handlers ( see `helpers` for more )
      this.clearHandlers( ch1 );
      this.clearHandlers( ch2 );
      this.clearHandlers( r1 );
      this.clearHandlers( r2 );

    });

    it( 'should return the channel you requested when it exists', function() {
        expect( r1 ).to.be.instanceof( Backbone.Wreqr.Channel );
        expect( r1 ).to.equal( ch1 );
        expect( r2 ).to.equal( ch2 );
    });

});