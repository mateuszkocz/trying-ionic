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

			// Avoid the fail by the ui-router that asks for template on $timeout.
			$templateCache.put( 'views/backdrop/backdrop.html', '' );

			/*
			 Other possible solutions to avoid the ui-routers' request for template:

			 beforeEach(module(function($ionicConfigProvider) {
			 $ionicConfigProvider.templates.maxPrefetch(0);
			 })));

			 If that doesn't work, nuke the $ionicTemplateCache service by stubbing it out:

			 beforeEach(module(function($provide) {
			 $provide.value('$ionicTemplateCache', function(){} );
			 }));

			 Source: https://github.com/angular-ui/ui-router/issues/212
			 */

		} )
	} );

	it( 'should have a properly defined state.', function () {
		var stateData = $state.get( 'app.backdrop' );
		expect( stateData.url ).toEqual( '/backdrop' );
		expect( stateData.views ).toEqual( jasmine.objectContaining( {
			main: {
				controller: 'BackdropViewController as ctrl',
				templateUrl: 'views/backdrop/backdrop.html'
			}
		} ) );
	} );

	it( 'should have a defined controller.', function () {
		expect( ctrl ).toBeDefined();
	} );

	it( 'should have a method `showBackdrop` in the controller.', function () {
		expect( ctrl.showBackdrop ).toEqual( jasmine.any( Function ) );
	} );

	it( 'should call the $ionicBackdrop.retain method when calling `showBackdrop` ', function () {
		expect( $ionicBackdrop.retain.calls.any() ).toEqual( false );
		ctrl.showBackdrop();
		expect( $ionicBackdrop.retain.calls.any() ).toEqual( true );
	} );

	it( 'should hide the requested backdrop after 2 seconds.', inject( function ( $httpBackend ) {
		ctrl.showBackdrop();
		expect( $ionicBackdrop.release.calls.any() ).toEqual( false );
		$timeout.flush( 1 );
		expect( $ionicBackdrop.release.calls.any() ).toEqual( false );
		$timeout.flush( 1999 );
		expect( $ionicBackdrop.release.calls.any() ).toEqual( true );
	} ) );
} );