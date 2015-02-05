describe( 'View: Backdrop', function () {
	var ctrl;
	var $ionicBackdrop;
	var $timeout;
	var $state;

	beforeEach( function () {
		module( 'app.views.backdrop', 'mocks.menu', function ( $provide ) {
			$provide.factory( '$ionicBackdrop', function () {
				return {
					retain: jasmine.createSpy(),
					release: jasmine.createSpy()
				}
			} );
		} );

		inject( function ( $controller, _$ionicBackdrop_, _$timeout_, _$state_, $templateCache ) {
			ctrl = $controller( 'BackdropViewController' );
			$ionicBackdrop = _$ionicBackdrop_;
			$timeout = _$timeout_;
			$state = _$state_;

			$templateCache.put('views/backdrop/backdrop.html', '');
		} )
	} );

	it( 'State is properly defined.', function () {
		var stateData = $state.get( 'app.backdrop' );
		expect( stateData.url ).toEqual( '/backdrop' );
		expect( stateData.views ).toEqual( jasmine.objectContaining({
			main: {
				controller: 'BackdropViewController as ctrl',
				templateUrl: 'views/backdrop/backdrop.html'
			}
		}) );
	} );

	it( 'Controller should be defined.', function () {
		expect( ctrl ).toBeDefined();
	} );

	it( 'Controller should have a method `showBackdrop`.', function () {
		expect( ctrl.showBackdrop ).toEqual( jasmine.any( Function ) );
	} );

	it( 'Calling `showBackdrop` should call the $ionicBackdrop.retain method.', function () {
		expect( $ionicBackdrop.retain.calls.any() ).toEqual( false );
		ctrl.showBackdrop();
		expect( $ionicBackdrop.retain.calls.any() ).toEqual( true );
	} );

	it( 'Backdrop should hide after 2 seconds.', inject( function ( $httpBackend ) {
		ctrl.showBackdrop();
		expect( $ionicBackdrop.release.calls.any() ).toEqual( false );
		$timeout.flush( 1 );
		expect( $ionicBackdrop.release.calls.any() ).toEqual( false );
		$timeout.flush( 1999 );
		expect( $ionicBackdrop.release.calls.any() ).toEqual( true );
	} ) );
} );