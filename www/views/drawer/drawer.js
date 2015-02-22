angular.module( 'app.views.drawer', ['ionic', 'ionic.contrib.drawer'] )
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'drawer', {
			url: '/drawer',
			controller: 'drawerViewController as ctrl',
			templateUrl: 'views/drawer/drawer.html'
		} );
	} ).controller( 'drawerViewController', [function () {

	}] );
