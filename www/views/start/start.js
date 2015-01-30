angular.module( 'app.views.start', ['ionic'] )
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'app.start', {
			url: '/start',
			views: {
				main: {
					controller: 'startViewController',
					templateUrl: 'views/start/start.html'
				}
			}
		} );
	} ).controller( 'startViewController', [function () {

	}] );
