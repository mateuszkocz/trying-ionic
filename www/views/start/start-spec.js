describe( 'View: Start Page', function () {
	var ctrl;
	var $state;
	var $ionicNavBarDelegate;
	var $ionicLoading;

	beforeEach( function () {
		module( 'app.views.start', 'mocks.menu', function ( $provide ) {
			$provide.factory( '$ionicNavBarDelegate', function () {
				return {
					showBar: jasmine.createSpy()
				}
			} );
		} );

		inject( function ( $controller, _$state_, _$ionicNavBarDelegate_, _$ionicLoading_ ) {
			ctrl = $controller( 'StartViewController' );
			$state = _$state_;
			$ionicNavBarDelegate = _$ionicNavBarDelegate_;
			$ionicLoading = _$ionicLoading_;
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

	it( 'can toggle the navigation bar', function () {
		ctrl.toggleNavBar();
		expect( $ionicNavBarDelegate.showBar ).toHaveBeenCalled();
		expect( $ionicNavBarDelegate.showBar.calls.mostRecent().args[0] ).toBe( false );
		ctrl.toggleNavBar();
		expect( $ionicNavBarDelegate.showBar.calls.mostRecent().args[0] ).toBe( true );
	} );

	it( 'can show the loading overlay for a short time.', function () {
		spyOn( $ionicLoading, 'show' );
		ctrl.toggleLoading();
		expect( $ionicLoading.show ).toHaveBeenCalledWith( jasmine.objectContaining( {
			duration: jasmine.any( Number )
		} ) );
	} );
} );