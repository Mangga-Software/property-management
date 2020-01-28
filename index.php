<!doctype html>
<html lang="en">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link type="text/css" rel="stylesheet" href="assets/css/bootstrap.min.css" />
<link type="text/css" rel="stylesheet" href="assets/css/bootstrap-vue.min.css" />
<link type="text/css" rel="stylesheet" href="assets/css/login.css" />
<link type="text/css" rel="stylesheet" href="assets/css/global.css" />
<link rel="stylesheet" href="assets/js/popper/vue-popper.min.css">
</head>
<body>
<div id="app">	
	<login v-if="has_access == false"></login>
	<dashboard v-else></dashboard>
</div>

<script src="assets/js/axios.min.js"></script>
<script src="//polyfill.io/v3/polyfill.min.js?features=es2015%2CIntersectionObserver" crossorigin="anonymous"></script>
<script src="assets/js/vue/vue.min.js"></script>
<script src="assets/js/popper/vue-popper.min.js"></script>
<script data-main="assets/requirejs/config" src="assets/requirejs/require.js"></script>
</body>
</html>