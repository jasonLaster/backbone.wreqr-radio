describe('Loading the script', function() {

    it('should set the WreqrChannel object on the Backbone object', function() {

        expect( Backbone.Wreqr ).to.have.property( 'Channel' );

    });
    
    it('should set the WreqrStation object on the Backbone object', function() {

        expect( Backbone.Wreqr ).to.have.property( 'Station' );

    });

});