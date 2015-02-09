describe( 'View: Content', function () {
	var ctrl;
	var $state;
	var $ionicScrollDelegate;
	var $cordovaToast;

	beforeEach( function () {
		module( 'app.views.content', 'mocks.menu', function ( $provide ) {
			$provide.factory( '$ionicScrollDelegate', function () {
				return {
					$getByHandle: jasmine.createSpy().and.returnValue( {
						scrollBy: jasmine.createSpy()
					} )
				}
			} );

			$provide.factory( '$cordovaToast', function () {
				return {
					show: jasmine.createSpy()
				}
			} )
		} );

		inject( function ( $controller, _$state_, _$ionicScrollDelegate_, _$cordovaToast_ ) {
			ctrl = $controller( 'ContentViewController' );
			$state = _$state_;
			$ionicScrollDelegate = _$ionicScrollDelegate_;
			$cordovaToast = _$cordovaToast_;
		} );
	} );

	it( 'has the properly defined state.', function () {
		var stateData = $state.get( 'app.content' );
		expect( stateData.url ).toEqual( '/content' );
		expect( stateData.views ).toEqual( jasmine.objectContaining( {
			main: {
				controller: 'ContentViewController as ctrl',
				templateUrl: 'views/content/content.html'
			}
		} ) );
	} );

	it( 'has the controller.', function () {
		expect( ctrl ).toBeDefined();
	} );

	it( 'has a handle of the content area.', function () {
		expect( $ionicScrollDelegate.$getByHandle.calls.any() ).toBeTruthy();
		expect( ctrl.scrollArea ).toBeDefined()
	} );

	it( 'can scroll the scrollable area .', function () {
		expect( ctrl.scrollArea.scrollBy.calls.any() ).toBeFalsy();
		ctrl.scrollViewBy();
		expect( ctrl.scrollArea.scrollBy.calls.any() ).toBeTruthy();
	} );

	it( 'scrolls the scrollable area by provided distance in the y direction.', function () {
		ctrl.scrollViewBy( 100 );
		var calledArgs = ctrl.scrollArea.scrollBy.calls.argsFor( 0 );
		expect( calledArgs[0] ).toBe( 0 );
	} );

	it( 'doesn\'t scroll when not called with a number', function () {
		ctrl.scrollViewBy( null );
		ctrl.scrollViewBy( undefined );
		ctrl.scrollViewBy( NaN );
		ctrl.scrollViewBy( '' );
		ctrl.scrollViewBy( 'string' );
		ctrl.scrollViewBy( Infinity );
		ctrl.scrollViewBy( -Infinity );
		ctrl.scrollViewBy( true );
		ctrl.scrollViewBy( false );
		ctrl.scrollViewBy( [] );
		ctrl.scrollViewBy( {} );

		var allCalledArgs = ctrl.scrollArea.scrollBy.calls.allArgs();
		for ( var i = 0, l = allCalledArgs.length; i < l; i++ ) {
			expect( allCalledArgs[i][1] ).toBe( 0 );
		}
	} );

	it( 'animates the scroll effect.', function () {
		ctrl.scrollViewBy( 100 );
		var calledArgs = ctrl.scrollArea.scrollBy.calls.argsFor( 0 );
		expect( calledArgs[2] ).toBe( true );
	} );

	it( 'scrolls the area when user requests it.', function () {
		spyOn( ctrl, 'scrollViewBy' );
		expect( ctrl.scrollViewBy.calls.any() ).toBeFalsy();
		ctrl.distance = 99;
		ctrl.submitScrollBy();
		expect( ctrl.scrollViewBy.calls.any() ).toBeTruthy();
		expect( ctrl.scrollViewBy.calls.mostRecent().args[0] ).toEqual( 99 );
	} );

	it( 'has a handler for the scroll complete event that shows a toast.', function () {
		expect( $cordovaToast.show.calls.any() ).toBeFalsy();
		ctrl.onScrollComplete();
		expect( $cordovaToast.show.calls.any() ).toBeTruthy();
	} );

	it( 'shows a toast after scrolling in the center for short amount of time with a message.', function () {
		expect( $cordovaToast.show.calls.any() ).toBeFalsy();
		ctrl.onScrollComplete();
		var args = $cordovaToast.show.calls.mostRecent().args;
		expect( args[0] ).toBeTruthy();
		expect( args[0] ).toEqual( jasmine.any( String ) );
		expect( args[1] ).toBe( 'short' );
		expect( args[2] ).toBe( 'center' );
	} )
} );