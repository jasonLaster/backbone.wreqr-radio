describe('Loading the script', function() {

  it('should set the Radio object on the Backbone object', function() {
      expect(Backbone).to.have.property( 'radio' );
  });
  it('should set the Radio object on Backbone.Wreqr', function() {
      expect(Backbone.Wreqr).to.have.property( 'radio' );
  });
  it('should set the Channel object on Backbone.Wreqr', function() {
      expect(Backbone.Wreqr).to.have.property( 'Channel' );
  });

});