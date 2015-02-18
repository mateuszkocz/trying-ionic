angular.module( 'app.views.modal', ['ionic'] )
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'app.modal', {
			url: '/modal',
			views: {
				main: {
					controller: 'ModalViewController as ctrl',
					templateUrl: 'views/modal/modal.html'
				}
			}
		} );
	} ).controller( 'ModalViewController', ['$ionicModal', '$scope', function ( $ionicModal, $scope ) {
		var self = this;

		this.modals = [];
		this.number = 0;

		this.closeModal = function () {
			this.modals.pop().remove();
		};

		this.increaseNumber = function () {
			this.number++;
		};

		this.showModals = function ( times ) {
			while ( times-- ) {
				$ionicModal.fromTemplateUrl( 'views/modal/modal-view.html', {
					scope: $scope,
					//animation: 'slide-in-up'
					//animation: 'fade-in'
					animation: 'slide-in-down'
				} ).then( self.initializeModalInstance );
			}
		};

		this.initializeModalInstance = function ( instance ) {
			// Add the order number.
			instance.scope.modalNumber = self.number;
			self.increaseNumber();

			self.modals.push( instance );

			instance.show();

			return instance;
		}
	}] );
