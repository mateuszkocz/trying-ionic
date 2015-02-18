describe( 'View: Modal', function () {
	var ctrl;
	var $scope;
	var $state;
	var $ionicModal;

	beforeEach( function () {
		module( 'app.views.modal', 'mocks.menu' );

		inject( function ( $controller, $rootScope, _$state_, _$ionicModal_ ) {
			$scope = $rootScope.$new();
			$state = _$state_;
			$ionicModal = _$ionicModal_;
			ctrl = $controller( 'ModalViewController', {
				$scope: $scope
			} );
		} );
	} );

	it( 'has the properly defined state.', function () {
		var stateData = $state.get( 'app.modal' );
		expect( stateData.url ).toEqual( '/modal' );
		expect( stateData.views ).toEqual( jasmine.objectContaining( {
			main: {
				controller: 'ModalViewController as ctrl',
				templateUrl: 'views/modal/modal.html'
			}
		} ) );
	} );

	it( 'has the controller.', function () {
		expect( ctrl ).toBeDefined()
	} );

	it( 'has an empty modals store.', function () {
		expect( ctrl.modals ).toEqual([]);
	} );

	it( 'starts the modal counter from 0.', function () {
		expect( ctrl.number ).toEqual( 0 );
	} );

	it( 'has a method to increase the counter.', function () {
		expect( ctrl.number ).toEqual( 0 );
		ctrl.increaseNumber();
		expect( ctrl.number ).toEqual( 1 );
	} );

	it( 'calls as many modals as required.', function () {
		spyOn( $ionicModal, 'fromTemplateUrl' ).and.returnValue( {then: function () {}} );
		expect( $ionicModal.fromTemplateUrl.calls.any() ).toBeFalsy();
		ctrl.showModals( 2 );
		expect( $ionicModal.fromTemplateUrl.calls.count() ).toBe( 2 );
	} );

	it( 'calls modals with the controller\'s scope', function () {
		spyOn( $ionicModal, 'fromTemplateUrl' ).and.callThrough();
		ctrl.showModals( 1 );
		expect( $ionicModal.fromTemplateUrl.calls.mostRecent().args[1].scope ).toBe( $scope );
	} );

	it( 'calls the modal initialization method when the instance is ready.', function () {
		spyOn( $ionicModal, 'fromTemplateUrl' ).and.returnValue( {
			then: function ( callback ) {
				callback();
			}
		} );
		spyOn( ctrl, 'initializeModalInstance' );
		expect( ctrl.initializeModalInstance.calls.any() ).toBeFalsy();
		ctrl.showModals( 1 );
		expect( ctrl.initializeModalInstance.calls.any() ).toBeTruthy();
	} );

	it( 'increases the order of modals.', function () {
		expect( ctrl.number ).toBe( 0 );
		ctrl.initializeModalInstance( {scope: {}, show: function () {}} );
		expect( ctrl.number ).toBe( 1 );
	} );

	it( 'assigns the modal\'s order number to its scope.', function () {
		var instance = {scope: {}, show: function () {}};
		ctrl.number = 10;
		ctrl.initializeModalInstance( instance );
		expect( instance.scope.modalNumber ).toBe( 10 )
	} );

	it( 'shows the modal after its creation.', function () {
		var instance = {scope: {}, show: jasmine.createSpy()};
		ctrl.initializeModalInstance( instance );
		expect( instance.show.calls.any() ).toBeTruthy();
	} );

	it( 'stores the modals instances in the array.', function () {
		var instance = {scope: {}, show: function(){}};
		ctrl.initializeModalInstance( instance );
		expect( ctrl.modals[0] ).toBe( instance );
	} );

	it( 'removes the modals when they are closed from the view and the store.', function () {
		ctrl.modals[0] = {remove: jasmine.createSpy()};
		// Store the reference since it's removed from the modals array.
		var spy = ctrl.modals[0].remove;
		ctrl.closeModal();
		expect( spy.calls.any() ).toBeTruthy();
		expect( ctrl.modals ).toEqual( [] );
	} );
} );