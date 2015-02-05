angular.module( 'mocks.menu', [] )
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'app', {
			abstract: true,
			template: '<ion-nav-view name="main"></ion-nav-view>'
		} );
	} );