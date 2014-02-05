describe('Executing `connectRequests` with a hash as the first argument', function() {

  var
  ch,
  label1 = 'one',
  label2 = 'two',
  cbOne,
  cbTwo,
  p,
  ret,
  requestsHash;

  beforeEach(function() {

    cbOne = function() {};
    cbTwo = function() {};
    ch = Backbone.radio.channel();

    requestsHash = {};
    requestsHash[label2] = cbOne;
    requestsHash[label1] = cbTwo;

    ret = ch.connectRequests( requestsHash );

    p = ch.reqres._wreqrHandlers || {};

  });

  afterEach(function() {
    ch.reset();
  });

  it( 'should attach the listeners to the Channel', function() {
      expect(p).to.contain.keys( label1, label2 );
  });

  it( 'should return the Channel', function() {
      expect( ret ).to.equal( ch );
  });

});