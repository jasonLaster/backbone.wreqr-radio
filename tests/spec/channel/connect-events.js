describe('Executing `connectEvents` with a hash as the first argument', function() {

  var
  ch,
  label1 = 'one',
  label2 = 'two',
  label3 = 'three',
  obj,
  p,
  commandsHash;

  beforeEach(function() {

    obj = {
      lala: function() {},
      lalala: function() {}
    };

    ch = _.extend( new Backbone.Wreqr.Channel( 'test' ), obj);

    eventsHash = {};
    eventsHash[label1] = 'lala';
    eventsHash[label2] = ch.lalala;
    eventsHash[label3] = 'alala';

    ret = ch.connectEvents( eventsHash );

    p = ch.vent._events || {};

  });

  it( 'should attach the listeners to the Channel', function() {
      expect(p).to.contain.keys( label1, label2 );
      expect(p).to.not.contain.keys( label3 );
  });

  it( 'should return the Channel', function() {
      expect( ret ).to.equal( ch );
  });

});