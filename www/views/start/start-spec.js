describe( 'View: Start Page', function () {

	beforeEach( module( 'app.views.start' ) );

	var ctrl;

	beforeEach( inject( function ( $controller ) {
		ctrl = $controller( 'StartViewController' );
	} ) );

	it( 'Controller should be defined', function () {
		expect( ctrl ).toBeDefined();
	} )
} );