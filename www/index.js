angular.module( 'app', [
	'ionic',
	'app.views.menu',
	'app.views.start',
	'app.views.css',
	'app.views.action-sheet',
	'app.views.backdrop',
	'app.views.content',
	'app.views.colours',
	'app.views.events',
	'app.views.modal',
	'app.views.slide-box',
	'app.views.popover-popup',
	'app.views.tabs',
	'app.views.list',
	'app.views.ions',
	'app.views.drawer'
] )

	.run( function ( $ionicPlatform ) {
		$ionicPlatform.ready( function () {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if ( window.cordova && window.cordova.plugins.Keyboard ) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar( true );
			}
			if ( window.StatusBar ) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}
		} );
	} )

	.config( function ( $urlRouterProvider ) {
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise( '/app/start' );
	} );
