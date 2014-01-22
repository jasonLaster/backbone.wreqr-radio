describe('Calling `removeAllChannels` when there are 2 channels', function() {

    var n,
    t1 = 'test',
    t2 = 'test2',
    ch1, ch2,
    chs,
    stub,
    r1, r2;

    beforeEach(function() {

      n = _.extend( new Backbone.Model(), Backbone.Wreqr.Station );
      stub = sinon.stub( n, 'detachChannel' );
      ch1 = new Backbone.Wreqr.Channel( t1 );
      ch2 = new Backbone.Wreqr.Channel( t2 );
      n.attachChannel( ch1 );
      n.attachChannel( ch2 );

      n.detachAllChannels();
      chs = n._channels;

    });

    it( 'should have called `detachChannel` exactly two times', function() {
        expect( stub ).to.have.been.calledTwice;
    });
    it( 'and with the proper arguments', function() {
        expect( stub ).to.have.been.calledWithExactly( t1, undefined );
        expect( stub ).to.have.been.calledWithExactly( t2, undefined );
    });

});

describe('Passing `off` as `true` to `removeAllChannels` when there are 2 channels', function() {

    var n,
    t1 = 'test',
    t2 = 'test2',
    t3 = 'test3',
    ch1, ch2,
    chs,
    stub,
    r1, r2, r3;

    beforeEach(function() {

      n = _.extend( new Backbone.Model(), Backbone.Wreqr.Station );
      stub = sinon.stub( n, 'detachChannel' );
      ch1 = new Backbone.Wreqr.Channel( t1 );
      ch2 = new Backbone.Wreqr.Channel( t2 );
      n.attachChannel( ch1 );
      n.attachChannel( ch2 );

      n.detachAllChannels( true );
      chs = n._channels;

    });

    it( 'should have called `detachChannel` exactly two times', function() {
        expect( stub ).to.have.been.calledTwice;
    });
    it( 'should have called `detachChannel` with the proper arguments', function() {
        expect( stub ).to.have.been.calledWithExactly( t1, true );
        expect( stub ).to.have.been.calledWithExactly( t2, true );
    });

});