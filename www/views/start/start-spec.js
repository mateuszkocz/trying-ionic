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

	it( 'State is properly defined.', function () {
		var stateData = $state.get( 'app.start' );
		expect( stateData.url ).toEqual( '/start' );
		expect( stateData.views ).toEqual( jasmine.objectContaining({
			main: {
				controller: 'StartViewController as ctrl',
				templateUrl: 'views/start/start.html'
			}
		}) );
	} );

	it( 'Controller should be defined', function () {
		expect( ctrl ).toBeDefined();
	} );
} );