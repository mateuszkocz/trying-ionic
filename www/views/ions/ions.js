angular.module( 'app.views.ions', ['ionic', 'ionic.ion.headerShrink', 'ionic.contrib.ui.cards'] )
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'app.ions', {
			url: '/ions',
			views: {
				main: {
					controller: 'IonsViewController as ctrl',
					templateUrl: 'views/ions/ions.html'
				}
			}
		} );
	} ).controller( 'IonsViewController', [function () {
		this.cards = [
			{
				name: 'Card 1'
			}, {
				name: 'Card 2'
			}, {
				name: 'Card 3'
			}
		]
	} ] );
