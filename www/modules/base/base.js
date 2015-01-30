angular.module( 'module.base', ['ionic'] )
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'app', {
			abstract: true,
			url: '/app',
			templateUrl: 'modules/base/base.html',
			controller: 'baseController as ctrl'
		} )
	} )
	.controller( 'baseController', [function () {

	}] );