angular.module( 'module.start', ['ionic'] )
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'app.start', {
			url: '/start',
			views: {
				main: {
					controller: 'startController',
					templateUrl: 'modules/start/start.html'
				}
			}
		} );
	} ).controller( 'startController', [function () {

	}] );
