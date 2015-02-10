angular.module( 'app.views.colours', ['ionic'] )
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'app.colours', {
			url: '/colours',
			views: {
				main: {
					controller: 'ColoursViewController as ctrl',
					templateUrl: 'views/colours/colours.html'
				}
			}
		} );
	} ).controller( 'ColoursViewController', ['$timeout', '$scope', function ( $timeout, $scope ) {
		var self = this;

		this.rgb = [128,128,128];

		$scope.$watchCollection( function () {
			return self.rgb;
		}, function () {
			self.background = {
				background: 'rgb(' + self.rgb.join( ',' ) + ')'
			};
		} );
	}] );
