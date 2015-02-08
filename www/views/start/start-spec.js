describe( 'View: Start Page', function () {
	var ctrl;
	var $state;

	beforeEach( function () {
		module( 'app.views.start', 'mocks.menu' );

		inject( function ( $controller, _$state_ ) {
			ctrl = $controller( 'StartViewController' );
			$state = _$state_;
		} )
	} );

	it( 'should have a properly defined state.', function () {
		var stateData = $state.get( 'app.start' );
		expect( stateData.url ).toEqual( '/start' );
		expect( stateData.views ).toEqual( jasmine.objectContaining({
			main: {
				controller: 'StartViewController as ctrl',
				templateUrl: 'views/start/start.html'
			}
		}) );
	} );

	it( 'should have a defined controller.', function () {
		expect( ctrl ).toBeDefined();
	} );
} );