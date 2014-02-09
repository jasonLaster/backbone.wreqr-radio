describe('Executing `connectEvents` with a hash as the first argument', function() {

  var
  ch,
  label1 = 'one',
  label2 = 'two',
  cbOne,
  cbTwo,
  p,
  ret,
  eventsHash;

  beforeEach(function() {

    cbOne = function() {};
    cbTwo = function() {};
    ch = WreqrRadio.radio.channel();

    eventsHash = {};
    eventsHash[label2] = cbOne;
    eventsHash[label1] = cbTwo;

    ret = ch.connectEvents( eventsHash );

    p = ch.vent._events || {};

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