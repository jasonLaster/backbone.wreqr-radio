beforeEach(function() {

  // The handlers on messaging systems can create cyclic structures.
  // To run tests involving them, simply run it through this function, which
  // strips out the handlers
  this.clearHandlers = function( ch ) {
    var w = Backbone.Wreqr;
    _.each( ch, function( ms ) {
      if ( ms instanceof w.EventAggregator ) {
        ms.stopListening();
        ms.off();
      } else if ( ms instanceof w.Commands || ms instanceof w.RequestResponse ) {
        ms.removeAllHandlers();
        // Removes those pesky listeners from Commands, which extends the EventAggregator
        if ( ms.stopListening ) {
          ms.stopListening();
          ms.off();
        }
      }
    });
  };

});