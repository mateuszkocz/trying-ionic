exports.config = {
	seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
	specs: ['./e2e/start-page-spec.js'],
	baseUrl: 'http://localhost:8100/' // Ionic's live reload URL
};