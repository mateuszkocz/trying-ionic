angular.module( 'app.views.css', ['ionic'] )
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'app.css', {
			url: '/css',
			views: {
				main: {
					controller: 'CssViewController as ctrl',
					templateUrl: 'views/css/css.html'
				}
			}
		} );
	} ).controller( 'CssViewController', [function () {

	}] );
