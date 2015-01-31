describe( 'View: CSS', function () {

	beforeEach( module( 'app.views.css' ) );

	var ctrl;

	beforeEach( inject( function ( $controller ) {
		ctrl = $controller( 'CssViewController' );
	} ) );

	it( 'Controller should be defined', function () {
		expect( ctrl ).toBeDefined();
	} )
} );