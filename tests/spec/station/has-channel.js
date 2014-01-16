describe('Passing a channel name to `channel`', function() {

    var n,
    t1 = 'test',
    t2 = 'test2',
    t3 = 'test3',
    ch1, ch2,
    r1, r2, r3;

    beforeEach(function() {

      n = _.extend( new Backbone.Model(), Backbone.WreqrStation );
      ch1 = new Backbone.WreqrChannel( t1 );
      ch2 = new Backbone.WreqrChannel( t2 );
      n.attachChannel( ch1 );
      n.attachChannel( ch2 );

      r1 = n.hasChannel( t1 );
      r2 = n.hasChannel( t2 );
      r3 = n.hasChannel( t3 );

    });

    it( 'should return true if you have the channel', function() {
        expect( r1 ).to.be.true;
        expect( r2 ).to.be.true;
    });
    it( 'and false when you don\'t', function() {
        expect( r3 ).to.be.false;
    });

});