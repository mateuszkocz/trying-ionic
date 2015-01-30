angular.module( 'app.views.css', ['ionic'] )
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'app.css', {
			url: '/css',
			views: {
				main: {
					controller: 'cssViewController as ctrl',
					templateUrl: 'views/css/css.html'
				}
			}
		} );
	} ).controller( 'cssViewController', [function () {

	}] );
