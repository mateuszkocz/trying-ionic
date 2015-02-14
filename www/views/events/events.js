angular.module( 'app.views.events', ['ionic'] )
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'app.events', {
			url: '/events',
			views: {
				main: {
					controller: 'EventsViewController as ctrl',
					templateUrl: 'views/events/events.html'
				}
			}
		} );
	} ).controller( 'EventsViewController', ['$ionicScrollDelegate', function ($ionicScrollDelegate) {
		var self = this;

		this.currentEvent = 'None at this time';

		this.events = {
			touch: function ( e ) {
				console.log( 'Touch', e );
			},
			tap: function ( e ) {
				console.log( 'Tap', e );
			},
			hold: function ( e ) {
				console.log( 'Hold', e );
			},
			release: function ( e ) {
				console.log( 'Release', e );
			},
			drag: function ( e ) {
				console.log( 'Drag', e );
				// Hack to disable scrolling while dragging.
				$ionicScrollDelegate.getScrollView().__enableScrollY = false;
			},
			swipe: function ( e ) {
				console.log( 'Swipe', e );
			}
		}
	}] );
