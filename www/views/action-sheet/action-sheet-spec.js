describe( 'View: Action Sheet', function () {
	beforeEach( module( 'app.views.action-sheet' ) );

	var ctrl;

	beforeEach( inject( function ( $controller ) {
		ctrl = $controller( 'ActionSheetViewController' );
	} ) );

	it( 'Controller should be defined', function () {
		expect( ctrl ).toBeDefined();
	} );

	it( 'Taken actions\' labels should be initially empty', function () {
		expect( ctrl.actionTakenInIonicSheet ).toEqual( '' );
		expect( ctrl.actionTakenInCordovaActionSheet ).toEqual( '' );
	} );

	// TODO: test calling the action sheets
} );