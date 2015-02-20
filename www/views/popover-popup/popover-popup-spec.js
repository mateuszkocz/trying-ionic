describe( 'View: Popover & Popup', function () {
	var ctrl;
	var $state;

	beforeEach( function () {
		module( 'app.views.popover-popup', 'mocks.menu', function ( $provide ) {

		} );

		inject( function ( $controller, _$state_ ) {
			ctrl = $controller( 'PopoverPopupViewController' );
			$state = _$state_;
		} );
	} );

	it( 'has the properly defined state.', function () {
		var stateData = $state.get( 'app.popover-popup' );
		expect( stateData.url ).toEqual( '/popover-popup' );
		expect( stateData.views ).toEqual( jasmine.objectContaining( {
			main: {
				controller: 'PopoverPopupViewController as ctrl',
				templateUrl: 'views/popover-popup/popover-popup.html'
			}
		} ) );
	} );

	it( 'has the controller.', function () {
		expect( ctrl ).toBeDefined();
	} );
} );