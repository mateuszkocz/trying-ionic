angular.module( 'app.views.action-sheet', ['ionic', 'ngCordova'] )
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'app.action-sheet', {
			url: '/action-sheet',
			views: {
				main: {
					controller: 'ActionSheetViewController as ctrl',
					templateUrl: 'views/action-sheet/action-sheet.html'
				}
			}
		} );
	} ).controller( 'ActionSheetViewController', ['$ionicActionSheet', '$cordovaActionSheet', function ( $ionicActionSheet, $cordovaActionSheet ) {
		var self = this;

		// The Ionic's Action Sheet
		this.actionTakenInIonicSheet = '(Nothing for now)';

		this.showIonicActionSheet = function () {
			var hideSheet = $ionicActionSheet.show({
				cancelOnStateChange: true, // This is the default. Just left for reference.
				cssClass: 'custom-class', // Adds a custom class to the sheet.
				buttons: [
					{ text: '<b>Bold Button</b>' },
					{ text: 'Normal button' },
					{ text: '<i class="icon ion-game-controller-b"></i> Icon button'}
				],
				destructiveText: 'Warning!',
				titleText: 'Ionic Action Sheet',
				cancelText: 'Close the sheet',
				cancel: function () {
					// Function will be called when the sheet will have been closed.
				},
				buttonClicked: function ( index, button ) {
					self.actionTakenInIonicSheet = 'Clicked the ' + button.text;

					// Don't hide the sheet.
					return false;
				},
				destructiveButtonClicked: function () {
					self.actionTakenInIonicSheet = 'Clicked the destructive button';

					// Hide the sheet.
					return true;
				}
			});
		};

		// Cordova's Action Sheet
		this.actionTakenInCordovaActionSheet = '(Nothing yet)';

		this.showCordovaActionSheet = function () {
			// The HTML doesn't work. Just used for consistency.
			var buttons = [ '<b>Bold Button</b>', 'Normal button', '<i class="icon ion-game-controller-b"></i> Icon button'];

			$cordovaActionSheet.show({
				title: 'Cordova Action Sheet',
				buttonLabels: buttons,
				addCancelButtonWithLabel: 'Close the sheet',
				androidEnableCancelButton: true,
				addDestructiveButtonWithLabel: 'Warning!'
			} ).then( function ( index ) {
				// First button will be the destructive one.
				if ( index === 1 )
					self.actionTakenInCordovaActionSheet = 'Clicked the destructive button';
				// The last button is the close button.
				else if ( index === buttons.length + 2 )
					self.actionTakenInCordovaActionSheet = 'Clicked cancel button';
				// Indexes in between will be the normal buttons.
				else
					self.actionTakenInCordovaActionSheet = buttons[ index - 2 ];
			});
		}
	}] );
