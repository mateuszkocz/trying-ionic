angular.module( 'app.views.start', ['ionic'] )
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'app.start', {
			url: '/start',
			views: {
				main: {
					controller: 'StartViewController as ctrl',
					templateUrl: 'views/start/start.html'
				}
			}
		} );
	} ).controller( 'StartViewController', [function () {

	}] );
