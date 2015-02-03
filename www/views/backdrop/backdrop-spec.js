describe( 'View: Backdrop', function () {
	var ctrl;
	var $ionicBackdrop;
	var $timeout;

	beforeEach( module( 'app.views.backdrop' ) );

	beforeEach( module( function ( $provide ) {
		$provide.factory( '$ionicBackdrop', function () {
			return {
				retain: jasmine.createSpy(),
				release: jasmine.createSpy()
			}
		} )
	} ) );

	beforeEach( inject( function ( $controller, _$ionicBackdrop_, _$timeout_ ) {
		ctrl = $controller( 'BackdropViewController' );
		$ionicBackdrop = _$ionicBackdrop_;
		$timeout = _$timeout_;
	} ) );

	it( 'Controller should be defined.', function () {
		expect( ctrl ).toBeDefined();
	} );

	it( 'Controller should have a method `showBackdrop`.', function () {
		expect( ctrl.showBackdrop ).toEqual( jasmine.any(Function) );
	} );

	it( 'Calling `showBackdrop` should call the $ionicBackdrop.retain method.', function () {
		expect( $ionicBackdrop.retain.calls.any() ).toEqual( false );
		ctrl.showBackdrop();
		expect( $ionicBackdrop.retain.calls.any() ).toEqual( true );
	} );

	it( 'Backdrop should hide after 2 seconds.', inject(function ( $httpBackend ) {
		// FIXME: Template of the view is GET-called using $timeout, so have to expect it.
		// Otherwise will throw. Obviously something is wrong here.
		$httpBackend.whenGET().respond('');

		ctrl.showBackdrop();
		expect( $ionicBackdrop.release.calls.any() ).toEqual( false );
		$timeout.flush( 1 );
		expect( $ionicBackdrop.release.calls.any() ).toEqual( false );
		$timeout.flush( 1999 );
		expect( $ionicBackdrop.release.calls.any() ).toEqual( true );
	}) );
} );