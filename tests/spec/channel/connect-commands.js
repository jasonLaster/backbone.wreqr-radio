describe('Executing `connectCommands` with a hash as the first argument', function() {

    var
    ch,
    label1 = 'one',
    label2 = 'two',
    label3 = 'three',
    obj,
    p,
    ret,
    commandsHash;

    beforeEach(function() {

      obj = {
        lala: function() {},
        lalala: function() {}
      };

      ch = _.extend( new Backbone.WreqrChannel( 'test' ), obj);

      commandsHash = {};
      commandsHash[label1] = 'lala';
      commandsHash[label2] = ch.lalala;
      commandsHash[label3] = 'alala';

      ret = ch.connectCommands( commandsHash );

      p = ch.commands._wreqrHandlers || {};

    });

    it( 'should attach the listeners to the Channel', function() {
        expect(p).to.contain.keys( label1, label2 );
        expect(p).to.not.contain.keys( label3 );
    });

    it( 'should return the Channel', function() {
        expect( ret ).to.equal( ch );
    });

});