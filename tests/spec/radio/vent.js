describe('Calling `on` from the Radio object', function() {

    var
    ch,
    onStub;

    beforeEach(function() {

      ch = Backbone.Radio.
      onStub = sinon.stub( ch.vent.on );
      Backbone.Radio.on('test', )

    });

    it( 'should forward the call to the Channel vent', function() {
      expect( ch ).to.be.instanceOf( Backbone.Wreqr.Channel );
    });

});