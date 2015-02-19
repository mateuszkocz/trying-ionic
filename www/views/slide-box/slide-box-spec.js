describe( 'Vies: Slide Box', function () {
	var ctrl;
	var $state;
	var $ionicSlideBoxDelegate;

	beforeEach( function () {
		module( 'app.views.slide-box', 'mocks.menu', function ( $provide ) {
			$provide.factory( '$ionicSlideBoxDelegate', function () {
				return {
					$getByHandle: jasmine.createSpy().and.returnValue( {
						slide: jasmine.createSpy()
					} )
				}
			} );
		} );

		inject( function ( $controller, _$state_, _$ionicSlideBoxDelegate_ ) {
			ctrl = $controller( 'SlideBoxViewController' );
			$state = _$state_;
			$ionicSlideBoxDelegate = _$ionicSlideBoxDelegate_;
		} );
	} );

	it( 'has the properly defined state.', function () {
		var stateData = $state.get( 'app.slide-box' );
		expect( stateData.url ).toEqual( '/slide-box' );
		expect( stateData.views ).toEqual( jasmine.objectContaining( {
			main: {
				controller: 'SlideBoxViewController as ctrl',
				templateUrl: 'views/slide-box/slide-box.html'
			}
		} ) );
	} );

	it( 'has the controller.', function () {
		expect( ctrl ).toBeDefined();
	} );

	it( 'has a handle to the slider.', function () {
		expect( $ionicSlideBoxDelegate.$getByHandle.calls.any() ).toBeTruthy();
		expect( $ionicSlideBoxDelegate.$getByHandle.calls.mostRecent().args[0] ).toBe( 'slider' );
	} );

	it( 'slides to the requested slide when clicked the pager.', function () {
		ctrl.changeSlide( 123 );
		expect( $ionicSlideBoxDelegate.$getByHandle().slide.calls.mostRecent().args[0] ).toBe( 123 );
	} );
} );