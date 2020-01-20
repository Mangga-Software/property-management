define(['require', 'exports', 'module'], function( require, exports, module ) {

require('login').load();
require('dashboard').load();

exports.load = function(){

	return new Vue({
	    el : '#app',
	    data : function(){
	    	return {
	    		has_access : false
	    	}
	    },
	    components : {
	    	'login' : {
	    		template : '<login-template></login-template>'
	    	},
	    	'dashboard' : {
	    		template : '<dashboard-template></dashboard-template>'	
	    	}
	    },
	    created : function(){
	    	
	    	var access = JSON.parse(localStorage.getItem('users_access'));
	    	if(access['access_token']){
	    		this.has_access = true;
	    	}

	    }
	})
}

})