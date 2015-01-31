describe( 'View: Base Menu', function () {

	beforeEach( module( 'app.views.menu' ) );

	var ctrl;

	beforeEach( inject( function ( $controller ) {
		ctrl = $controller( 'MenuViewController' );
	} ) );

	it( 'Controller should be defined', function () {
		expect( ctrl ).toBeDefined();
	} )
} );