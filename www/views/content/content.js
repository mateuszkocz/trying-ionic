angular.module( 'app.views.content', ['ionic'] )
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'app.content', {
			url: '/content',
			views: {
				main: {
					controller: 'ContentViewController as ctrl',
					templateUrl: 'views/content/content.html'

				}
			}
		} );
	} ).controller( 'ContentViewController', ['$ionicScrollDelegate', '$cordovaToast',
		function ( $ionicScrollDelegate, $cordovaToast ) {

			this.scrollArea = $ionicScrollDelegate.$getByHandle( 'content-view' );
			this.scrollViewBy = function ( distance ) {
				if ( !angular.isNumber( distance ) || !isFinite( distance ) || !isNaN( distance ) ) distance = 0;
				this.scrollArea.scrollBy( 0, distance, true );
			};

			this.submitScrollBy = function () {
				this.scrollViewBy( this.distance );
			};

			this.onScrollComplete = function () {
				$cordovaToast.show( 'Scrolled!', 'short', 'center' );
			}
		}] );
