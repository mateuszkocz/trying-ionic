describe( 'View: List', function () {
	var ctrl;
	var $state;

	beforeEach( function () {
		module( 'app.views.list', 'mocks.menu' );

		inject( function ( $controller, _$state_ ) {
			ctrl = $controller( 'ListViewController' );
			$state = _$state_;
		} );
	} );

	it( 'has the properly defined state.', function () {
		var stateData = $state.get( 'app.list' );
		expect( stateData.url ).toEqual( '/list' );
		expect( stateData.views ).toEqual( jasmine.objectContaining( {
			main: {
				controller: 'ListViewController as ctrl',
				templateUrl: 'views/list/list.html'
			}
		} ) );
	} );

	it( 'has the controller.', function () {
		expect( ctrl ).toBeDefined();
	} );

	it( 'is initiated with a non empty array of items', function () {
		expect( ctrl.items ).toEqual( jasmine.any( Array ) );
		expect( ctrl.items.length ).toBeTruthy();
	} );

	it( 'reorders items.', function () {
		ctrl.items = [0,1,2];
		ctrl.reorderItem( ctrl.items[0], 0, 1 );
		expect( ctrl.items ).toEqual( [1, 0, 2] );
	} );
} );