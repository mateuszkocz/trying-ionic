angular.module( 'app.views.slide-box', ['ionic'] )
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'app.slide-box', {
			url: '/slide-box',
			views: {
				main: {
					controller: 'SlideBoxViewController as ctrl',
					templateUrl: 'views/slide-box/slide-box.html'
				}
			}
		} );
	} ).controller( 'SlideBoxViewController', ['$ionicSlideBoxDelegate', function ( $ionicSlideBoxDelegate ) {
		var slideBox = $ionicSlideBoxDelegate.$getByHandle( 'slider' );

		this.changeSlide = function ( index ) {
			console.log( slideBox );
			slideBox.slide( index, 1000 );
		}
	}] );
