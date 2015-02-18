describe( 'View: Colours', function () {
	var ctrl;
	var $scope;
	var $state;

	beforeEach( function () {
		module( 'app.views.colours', 'mocks.menu' );

		inject( function ( $controller, $rootScope, _$state_, $templateCache ) {
			$scope = $rootScope.$new();
			ctrl = $controller( 'ColoursViewController', {$scope: $scope} );
			$state = _$state_;

			$templateCache.put( 'views/colours/colours.html', '' );
		} );
	} );

	it( 'has the properly defined state', function () {
		var stateData = $state.get( 'app.colours' );
		expect( stateData.url ).toEqual( '/colours' );
		expect( stateData.views ).toEqual( jasmine.objectContaining( {
			main: {
				controller: 'ColoursViewController as ctrl',
				templateUrl: 'views/colours/colours.html'
			}
		} ) );
	} );

	it( 'has the controller', function () {
		expect( ctrl ).toBeDefined();
	} );

	it( 'has the initially defined RGB values', function () {
		expect( ctrl.rgb.length ).toBe( 3 );
		for ( var i = 0, l = ctrl.rgb.length; i < l; i++ ) {
			expect( ctrl.rgb[i] ).toEqual( jasmine.any( Number ) );
		}
	} );

	it( 'changes the background color when the RGB values change.', function () {
		// Initially...
		expect( ctrl.background ).toBeUndefined();
		$scope.$digest();
		expect( ctrl.background.background ).toBeDefined();

		// And after the update.
		ctrl.rgb = [100, 100, 100];
		$scope.$digest();
		expect( ctrl.background.background ).toEqual( 'rgb(100,100,100)' );
	} );
} );