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
	} )
	.value( 'ionicASProperties', {
		cancelOnStateChange: true, // This is the default. Just left for reference.
		cssClass: 'custom-class', // Adds a custom class to the sheet.
		buttons: [
			{text: '<b>Bold Button</b>'},
			{text: 'Normal button'},
			{text: '<i class="icon ion-game-controller-b"></i> Icon button'}
		],
		destructiveText: 'Warning!',
		titleText: 'Ionic Action Sheet',
		cancelText: 'Close the sheet'
	} )
	.value( 'cordovaASProperties', {
		title: 'Cordova Action Sheet',
		buttonLabels: [
			'<b>Bold Button</b>',
			'Normal button',
			'<i class="icon ion-game-controller-b"></i> Icon button'
		],
		addCancelButtonWithLabel: 'Close the sheet',
		androidEnableCancelButton: true,
		addDestructiveButtonWithLabel: 'Warning!'
	} )
	.controller( 'ActionSheetViewController',
	['$ionicActionSheet', '$cordovaActionSheet', 'ionicASProperties', 'cordovaASProperties',
		function ( $ionicActionSheet, $cordovaActionSheet, ionicASProperties, cordovaASProperties ) {

			var self = this;

			// The Ionic's Action Sheet
			this.actionTaken = '';

			// Action taken after when the action sheet is hidden.
			this.cancelAction = function () {
				self.actionTaken = 'Clicked cancel button';
			};

			// Normal button action.
			this.buttonAction = function ( index, button ) {
				self.actionTaken = 'Clicked the ' + button.text;

				// Don't hide the sheet (only applies to the Ionic's implementation).
				return false;
			};

			// Destructive button action.
			this.destructiveAction = function () {
				self.actionTaken = 'Clicked the destructive button';

				// Hide the sheet (only applies to the Ionic's implementation).
				return true;
			};

			// Normalizes the AS cordova plugin way of handling the buttons index.
			this.cordovaButtonActionProxy = function ( index ) {
				if ( !index ) return;

				// The first button is the destructive one.
				if ( index === 1 )
					return self.destructiveAction();

				// The last button is the close button.
				if ( index === cordovaASProperties.buttonLabels.length + 2 )
					return self.cancelAction();

				// Indexes in between are the normal buttons.
				var idx = index - 2;
				return self.buttonAction( idx, {text: cordovaASProperties.buttonLabels[idx]} );
			};

			this.showIonicActionSheet = function () {
				$ionicActionSheet.show( angular.extend( ionicASProperties, {
					cancel: self.cancelAction,
					buttonClicked: self.buttonAction,
					destructiveButtonClicked: self.destructiveAction
				} ) );
			};

			this.showCordovaActionSheet = function () {
				$cordovaActionSheet.show( cordovaASProperties ).then( this.cordovaButtonActionProxy );
			}
		}] );
