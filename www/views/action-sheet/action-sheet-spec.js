describe( 'View: Action Sheet', function () {
	var ctrl;
	var ionicASProps;
	var cordovaASProps;
	var $ionicActionSheet;
	var $cordovaActionSheet;
	var $state;

	beforeEach( function () {
		module( 'app.views.action-sheet', 'mocks.menu', function ( $provide ) {
			$provide.factory( '$ionicActionSheet', function () {
				return {
					show: jasmine.createSpy()
				}
			} );
			$provide.factory( '$cordovaActionSheet', function () {
				return {
					show: jasmine.createSpy().and.returnValue( {then: function () {}} )
				}
			} );
		} );

		inject( function ( $controller, _$state_, ionicASProperties, cordovaASProperties, _$ionicActionSheet_, _$cordovaActionSheet_ ) {
			ctrl = $controller( 'ActionSheetViewController' );
			$state = _$state_;
			ionicASProps = ionicASProperties;
			cordovaASProps = cordovaASProperties;
			$ionicActionSheet = _$ionicActionSheet_;
			$cordovaActionSheet = _$cordovaActionSheet_;
		} );
	} );

	it( 'has the properly defined state.', function () {
		var stateData = $state.get( 'app.action-sheet' );
		expect( stateData.url ).toEqual( '/action-sheet' );
		expect( stateData.views ).toEqual( jasmine.objectContaining( {
			main: {
				controller: 'ActionSheetViewController as ctrl',
				templateUrl: 'views/action-sheet/action-sheet.html'
			}
		} ) );
	} );

	it( 'has the controller.', function () {
		expect( ctrl ).toBeDefined();
	} );

	it( 'has the initially empty \'taken action\' label.', function () {
		expect( ctrl.actionTaken ).toEqual( '' );
	} );

	it( 'has the defined Ionic Action Sheet properties.', function () {
		expect( ionicASProps ).toEqual( jasmine.any( Object ) );
	} );

	it( 'has the defined Cordova Action Sheet properties.', function () {
		expect( cordovaASProps ).toBeDefined();
	} );

	it( 'has the equal amount of normal buttons defined in the properties.', function () {
		expect( cordovaASProps.buttonLabels.length ).toEqual( ionicASProps.buttons.length );
	} );

	it( 'has at least one normal button in the both properties objects.', function () {
		expect( ionicASProps.buttons.length ).toBeGreaterThan( 0 );
	} );

	it( 'has labels defined for all the normal buttons', function () {
		ionicASProps.buttons.forEach( function ( button ) {
			expect( button.text ).toEqual( jasmine.any( String ) );
			expect( button.text ).not.toEqual( '' );
		} );
		cordovaASProps.buttonLabels.forEach( function ( text ) {
			expect( text ).toEqual( jasmine.any( String ) );
			expect( text ).not.toEqual( '' );
		} );
	} );

	it( 'has the destructive and close buttons defined in the both properties objects.', function () {
		expect( ionicASProps.destructiveText ).toEqual( jasmine.any( String ) );
		expect( ionicASProps.destructiveText ).not.toEqual( '' );
		expect( ionicASProps.cancelText ).toEqual( jasmine.any( String ) );
		expect( ionicASProps.cancelText ).not.toEqual( '' );
	} );

	it( 'changes the action indicator when tapping normal button.', function () {
		ctrl.buttonAction( 0, {text: 'test'} );
		expect( ctrl.actionTaken ).toMatch( /test/ );
	} );

	it( 'changes the action indicator when the destructive button is tapped.', function () {
		ctrl.destructiveAction();
		expect( ctrl.actionTaken ).not.toBe( '' );
	} );

	it( 'changes the action indicator when closing the sheet.', function () {
		ctrl.cancelAction();
		expect( ctrl.actionTaken ).not.toBe( '' );
	} );

	it( 'normalizes the Cordova\'s AS plugin implementation.', function () {
		spyOn( ctrl, 'cancelAction' );
		spyOn( ctrl, 'buttonAction' );
		spyOn( ctrl, 'destructiveAction' );

		expect( ctrl.cordovaButtonActionProxy() ).toBe( undefined );

		// Also tests if the appropriate actions are called.
		ctrl.cordovaButtonActionProxy( 1 );
		expect( ctrl.destructiveAction ).toHaveBeenCalled();

		ctrl.cordovaButtonActionProxy( 2 );
		expect( ctrl.buttonAction ).toHaveBeenCalled();

		// Cancel is the last index, starting counting from 1.
		ctrl.cordovaButtonActionProxy( ionicASProps.buttons.length + 2 );
		expect( ctrl.cancelAction ).toHaveBeenCalled();
	} );

	it( 'calls the Ionic\'s Action Sheet when the action button is tapped.', function () {
		expect( $ionicActionSheet.show.calls.any() ).toEqual( false );
		ctrl.showIonicActionSheet();
		expect( $ionicActionSheet.show.calls.any() ).toEqual( true );
	} );

	it( 'calls the Cordova\'s Action Sheet when the action button is tapped.', function () {
		expect( $cordovaActionSheet.show.calls.any() ).toEqual( false );
		ctrl.showCordovaActionSheet();
		expect( $cordovaActionSheet.show.calls.any() ).toEqual( true );
	} );
} );