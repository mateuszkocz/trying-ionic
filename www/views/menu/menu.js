angular.module( 'app.views.menu', ['ionic'] )
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'app', {
			abstract: true,
			url: '/app',
			templateUrl: 'views/menu/menu.html',
			controller: 'menuViewController as ctrl'
		} )
	} )
	.controller( 'menuViewController', [function () {

	}] );