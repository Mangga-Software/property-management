define(['require', 'exports', 'module'], function( require, exports, module ) {

var entityId = '17152'

function property_api(){
	var access = "";
	var token = "";
	if(localStorage.getItem('users_access') != null){
		access = JSON.parse(localStorage.getItem('users_access'));
		token = access['access_token'];
	}

	this.getPropertyList = function(){
		return function(promise){
			axios({
			  method: 'get',
			  url: 'https://api.arthuronline.co.uk/v2/properties?Property_Type=Mixed',
			  headers : {
			  	'Authorization' : 'Bearer ' + token,
			  	'X-EntityID' : entityId
			  }
			}).then(function(result){
				var data = res['data'];
				if(data['status']){
					for(var i in data['data']){
						promise(data['data'][i]);
					}
				}
			})
		}
	}

	this.getAllUnits = function(propId){
		return function(promise){
			axios({
			  method: 'get',
			  url: 'https://api.arthuronline.co.uk/v2/units',
			  headers : {
			  	'Authorization' : 'Bearer ' + token,
			  	'X-EntityID' : '17152'
			  }
			}).then(function(res){
				var data = res['data'];
				if(data['status']){
					for(var i in data['data']){
						promise(data['data'][i]);
					}
				}
			})
		}
	}

	this.getAllTenancies = function(unitId){
		return function(promise){
			axios({
			  method: 'get',
			  url: 'https://api.arthuronline.co.uk/v2/tenancies',
			  headers : {
			  	'Authorization' : 'Bearer ' + token,
			  	'X-EntityID' : '17152'
			  }
			}).then(function(res){
				var data = res['data'];
				if(data['status']){
					for(var i in data['data']){
						promise(data['data'][i]);
					}
				}
			})
		}
	}
}

exports.property_api = function(){
	return new property_api();
}

})