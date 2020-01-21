define(['require', 'exports', 'module'], function( require, exports, module ) {

require('login').load();
require('dashboard').load();

exports.load = function(){

	return new Vue({
	    el : '#app',
	    provide : function(){
	    	return {
	    		initIndexDb : function(){
	    			
	    		}
	    	}
	    },
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
	    	if (typeof(Storage) !== "undefined") {
	    		if(!localStorage.getItem('users_access')){
	    			localStorage.setItem('users_access', '{"access_token":"4d9cd3f4d18933ee95809f90305054c8154487b34117b3c3cdc3211273557ef7","token_type":"Bearer","expires_in":1209599,"refresh_token":"903bbe8378d285228c0121ae1f84a8760ab1c5d4fd68c9217c56588262ffe7c1","scope":"read","info":{"user_id":7153,"email":"dave.nurse@manggaproperties.com"}}')
	    		}else{
	    			var user = localStorage.getItem('users_access');
	    			if(user){
	    				this.has_access = true
	    			}
	    		}
	    	}
	    }
	})
}

})