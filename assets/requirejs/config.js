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
		'tooltipdetails' : 'modules/tooltipdetails',
		'unitlists' : 'partials/unitlists',
		'unitinfos' : 'partials/unitinfos',
		'property-api' : 'methods/property-api',
		'property-db' : 'methods/property-db',
		'app' : 'app'
	},
	shim : {
		calendarview : {
			deps : ['property-api', 'property-db', 'unitlists', 'tooltipdetails', 'unitinfos'],
			exports : 'calendarview'
		},
		propertylist : {
			deps : ['calendarview', 'property-api', 'property-db'],
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