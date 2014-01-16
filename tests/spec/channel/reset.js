describe('Running `resetChannel`', function() {

    var
    ch,
    v1Stub, v2Stub, cStub, rStub,
    v, c, r,
    ret;

    beforeEach(function() {

      ch = new Backbone.WreqrChannel( 'test' );
      v = ch.vent;
      c = ch.commands;
      r = ch.reqres;
      v1Stub = sinon.stub( v, "off");
      v2Stub = sinon.stub( v, "stopListening");
      cStub  = sinon.stub( c, "removeAllHandlers");
      rStub  = sinon.stub( r, "removeAllHandlers");

      ret = ch.reset();

    });

    it( 'should call the reset functions for each messaging system', function() {
      expect( v1Stub ).to.have.been.calledOnce;
      expect( v2Stub ).to.have.been.calledOnce;
      expect( cStub ).to.have.been.calledOnce;
      expect( rStub ).to.have.been.calledOnce;
    });

    it( 'should return the Channel', function() {
        expect( ret ).to.equal( ch );
    });

});