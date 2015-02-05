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
	});

	it( 'State is properly defined.', function () {
		var stateData = $state.get( 'app.action-sheet' );
		expect( stateData.url ).toEqual( '/action-sheet' );
		expect( stateData.views ).toEqual( jasmine.objectContaining({
			main: {
				controller: 'ActionSheetViewController as ctrl',
				templateUrl: 'views/action-sheet/action-sheet.html'
			}
		}) );
	} );

	it( 'Controller should be defined.', function () {
		expect( ctrl ).toBeDefined();
	} );

	it( 'Taken action\'s labels should be initially empty.', function () {
		expect( ctrl.actionTaken ).toEqual( '' );
	} );

	it( 'Ionic Action Sheet properties should be defined.', function () {
		expect( ionicASProps ).toEqual( jasmine.any( Object ) );
	} );

	it( 'Cordova Action Sheet properties should be defined.', function () {
		expect( cordovaASProps ).toBeDefined();
	} );

	it( 'Properties for both implementation of an AS should have the same number of normal buttons', function () {
		expect( cordovaASProps.buttonLabels.length ).toEqual( ionicASProps.buttons.length );
	} );

	it( 'There should be at least one normal button', function () {
		expect( ionicASProps.buttons.length ).toBeGreaterThan( 0 );
	} );

	it( 'All normal buttons should have a label.', function () {
		ionicASProps.buttons.forEach( function ( button ) {
			expect( button.text ).toEqual( jasmine.any( String ) );
			expect( button.text ).not.toEqual( '' );
		} );
		cordovaASProps.buttonLabels.forEach( function ( text ) {
			expect( text ).toEqual( jasmine.any( String ) );
			expect( text ).not.toEqual( '' );
		} );
	} );

	it( 'Cancel and destructive buttons should be defined.', function () {
		expect( ionicASProps.destructiveText ).toEqual( jasmine.any( String ) );
		expect( ionicASProps.destructiveText ).not.toEqual( '' );
		expect( ionicASProps.cancelText ).toEqual( jasmine.any( String ) );
		expect( ionicASProps.cancelText ).not.toEqual( '' );
	} );

	it( 'Tapping normal button should change the action indicator.', function () {
		ctrl.buttonAction( 0, {text: 'test'} );
		expect( ctrl.actionTaken ).toMatch( /test/ );
	} );

	it( 'Tapping destructive button should change the action indicator.', function () {
		ctrl.destructiveAction();
		expect( ctrl.actionTaken ).not.toBe( '' );
	} );

	it( 'Closing the sheet should change the action indicator.', function () {
		ctrl.cancelAction();
		expect( ctrl.actionTaken ).not.toBe( '' );
	} );

	it( 'Proxy for Cordova\'s AS plugin implementation should trigger the required valid action.', function () {
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

	it( 'Ionic\'s Action Sheet should be called when taping the action button.', function () {
		expect( $ionicActionSheet.show.calls.any() ).toEqual( false );
		ctrl.showIonicActionSheet();
		expect( $ionicActionSheet.show.calls.any() ).toEqual( true );
	} );

	it( 'Cordova\'s Action Sheet should be called when taping the action button.', function () {
		expect( $cordovaActionSheet.show.calls.any() ).toEqual( false );
		ctrl.showCordovaActionSheet();
		expect( $cordovaActionSheet.show.calls.any() ).toEqual( true );
	} );
} );