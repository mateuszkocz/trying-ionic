describe( 'View: Base Menu', function () {
	var ctrl;
	var $state;

	beforeEach( function () {
		module( 'app.views.menu' );

		inject( function ( $controller, _$state_ ) {
			ctrl = $controller( 'MenuViewController' );
			$state = _$state_;
		} )
	} );

	it( 'should have a properly defined state.', function () {
		var stateData = $state.get( 'app' );
		expect( stateData.url ).toEqual( '/app' );
		expect( stateData.abstract ).toEqual( true );
		expect( stateData ).toEqual( jasmine.objectContaining({
			controller: 'MenuViewController as ctrl',
			templateUrl: 'views/menu/menu.html'
		}) );
	} );

	it( 'should have a defined controller.', function () {
		expect( ctrl ).toBeDefined();
	} );
} );