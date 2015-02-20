angular.module( 'app.views.tabs', ['ionic'] )
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'app.tabs', {
			url: '/tabs',
			views: {
				main: {
					controller: 'tabsViewController as ctrl',
					templateUrl: 'views/tabs/tabs.html'
				}
			}
		} );
	} ).controller( 'tabsViewController', [function () {

	}] );
