requirejs.config({
	baseUrl: '/manggahomes/assets/packages',
	deps : ['main'],
	packages: [{
		name: 'moment',
		location : '../js/moment',
		main : 'moment.min'
	}],
	paths : {
		'header' : 'partials/header',
		'login' : 'login-template',
		'dashboard' : 'dashboard-template',
		'propertylist' : 'modules/propertylist',
		'calendarview' : 'modules/calendarview',
		'app' : 'app'
	},
	shim : {
		propertylist : {
			deps : ['calendarview'],
			exports : 'propertylist'
		},
		dashboard : {
			deps : ['header', 'propertylist'],
			exports : 'dashboard'
		},
		app : {
			deps : [ 'login', 'dashboard' ],
			exports : 'app'
		}
	},
    waitSeconds : 20
})