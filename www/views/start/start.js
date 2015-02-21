angular.module( 'app.views.start', ['ionic'] )
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'app.start', {
			url: '/start',
			views: {
				main: {
					controller: 'StartViewController as ctrl',
					templateUrl: 'views/start/start.html'
				}
			}
		} );
	} ).controller( 'StartViewController', ['$ionicNavBarDelegate', '$ionicLoading', function ( $ionicNavBarDelegate, $ionicLoading ) {
		var showBar = true;
		this.toggleNavBar = function () {
			showBar = !showBar;
			$ionicNavBarDelegate.showBar( showBar );
		};
		this.toggleLoading = function () {
			$ionicLoading.show( {duration: 3000, template: 'Loading\u2026'} );
		}
	}] );
