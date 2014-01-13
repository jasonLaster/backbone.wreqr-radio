describe('Loading the script', function() {

    it('should set the WreqrChannel object on the Backbone object', function() {
        expect(Backbone).to.have.property( 'WreqrChannel' );
    });
    it('should set the WreqrStation object on the Backbone object', function() {
        expect(Backbone).to.have.property( 'WreqrStation' );
    });

});