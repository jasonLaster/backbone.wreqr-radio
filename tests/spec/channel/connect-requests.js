describe('Executing `connectRequests` with a hash as the first argument', function() {

  var
  ch,
  label1 = 'one',
  label2 = 'two',
  label3 = 'three',
  obj,
  p,
  ret,
  requestsHash;

  beforeEach(function() {

    obj = {
      lala: function() {},
      lalala: function() {}
    };

    ch = _.extend( new Backbone.Wreqr.Channel( 'test' ), obj);

    requestsHash = {};
    requestsHash[label1] = 'lala';
    requestsHash[label2] = ch.lalala;
    requestsHash[label3] = 'alala';

    ret = ch.connectRequests( requestsHash );

    p = ch.reqres._wreqrHandlers || {};

  });

  it( 'should attach the listeners to the Channel', function() {
      expect(p).to.contain.keys( label1, label2 );
      expect(p).to.not.contain.keys( label3 );
  });

  it( 'should return the Channel', function() {
      expect( ret ).to.equal( ch );
  });

});