angular.module( 'app.views.menu', ['ionic'] )
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'app', {
			abstract: true,
			url: '/app',
			controller: 'MenuViewController as ctrl',
			templateUrl: 'views/menu/menu.html'
		} )
	} )
	.controller( 'MenuViewController', [function () {

	}] );