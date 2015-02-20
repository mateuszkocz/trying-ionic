angular.module( 'app.views.popover-popup', ['ionic'] )
	.config( function ( $stateProvider ) {
		$stateProvider.state( 'app.popover-popup', {
			url: '/popover-popup',
			views: {
				main: {
					controller: 'PopoverPopupViewController as ctrl',
					templateUrl: 'views/popover-popup/popover-popup.html'
				}
			}
		} );
	} ).controller( 'PopoverPopupViewController', ['$ionicPopover', '$ionicPopup', function ( $ionicPopover, $ionicPopup ) {
		var self = this;

		this.showPopover = function ( event ) {
			if ( this.popover ) {
				this.popover.show( event );
			} else {
				$ionicPopover.fromTemplateUrl( 'views/popover-popup/popover.html' )
					.then( function ( popover ) {
						self.popover = popover;
						self.showPopover( event );
					} );
			}
		};

		this.showPopup = function ( event ) {
			$ionicPopup.show( {
				template: 'Hello from the normal popup!',
				title: 'I\'m a popup!',
				subTitle: 'Nice to meet you!',
				buttons: [
					{text: 'Button'},
					{
						text: 'Action Button',
						type: 'button-royal',
						onTap: function ( e ) {
							return 'Bye bye!';
						}
					}
				]
			} ).then( function ( response ) {
				console.log( response );
			} );
		};

		this.showConfirm = function () {
			$ionicPopup.confirm( {
				title: 'You sure?',
				okText: 'Yup!',
				cancelText: 'No way!'
			} ).then( function ( desission ) {
				console.log( desission ); // It's a boolean.
			} );
		}

	}] );
