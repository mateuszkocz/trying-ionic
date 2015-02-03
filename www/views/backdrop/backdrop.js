angular.module( 'app.views.backdrop', ['ionic'] )
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'app.backdrop', {
			url: '/backdrop',
			views: {
				main: {
					controller: 'BackdropViewController as ctrl',
					templateUrl: 'views/backdrop/backdrop.html'
				}
			}
		} );
	} ).controller( 'BackdropViewController', [ '$ionicBackdrop', '$timeout', function ( $ionicBackdrop, $timeout ) {
		this.showBackdrop = function () {
			$ionicBackdrop.retain();
			$timeout( function () {
				$ionicBackdrop.release();
			}, 2000 );
		}
	}] );
