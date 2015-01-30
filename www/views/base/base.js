angular.module( 'app.views.base', ['ionic'] )
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'app', {
			abstract: true,
			url: '/app',
			templateUrl: 'views/base/base.html',
			controller: 'baseController as ctrl'
		} )
	} )
	.controller( 'baseController', [function () {

	}] );