angular.module( 'app.views.list', ['ionic'] )
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'app.list', {
			url: '/list',
			views: {
				main: {
					controller: 'ListViewController as ctrl',
					templateUrl: 'views/list/list.html'
				}
			}
		} );
	} ).controller( 'ListViewController', [function () {
		this.items = Array.apply( null, Array( 10 ) ).map( function ( v, i ) {return i} );
		this.reorderItem = function ( item, from, to ) {
			this.items.splice( from, 1 );
			this.items.splice( to, 0, item );
		}
	}] );
