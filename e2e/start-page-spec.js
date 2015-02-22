describe( 'the app', function () {
	it( 'redirects to the start view on root.', function () {
		browser.get( '/' );
		expect( browser.getLocationAbsUrl() ).toMatch( '/app/start' );
	} );
} );

describe('Start Page', function () {
	var fs = require( 'fs' );

	function writeScreenShot(data, filename) {
		var stream = fs.createWriteStream(filename);

		stream.write(new Buffer(data, 'base64'));
		stream.end();
	}

	beforeEach( function () {
		browser.get( '#/app/start' );
	} );

	it( 'has buttons on the start page', function () {
		expect( element.all( by.css( '.scroll .button' ) ).count() ).toEqual( 3 );

		browser.takeScreenshot().then(function (png) {
			writeScreenShot(png, 'exception.png');
		});
	} );

	//it( 'hides the title bar', function () {
	//	element( by.css( '[ng-click="ctrl.toggleNavBar()"]' ) ).click();
	//	expect( element(by.css('.nav-bar-container')) ) // to be hidden
	//} );


});