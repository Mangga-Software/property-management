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

	this.getAllUnits = function(pageNumber){
		return function(promise){
			axios({
			  method: 'get',
			  url: 'https://api.arthuronline.co.uk/v2/units?page='+pageNumber,
			  headers : {
			  	'Authorization' : 'Bearer ' + token,
			  	'X-EntityID' : '17152'
			  }
			}).then(function(res){
				var data = res['data'];
				result = {
					lists : [],
					pagination : {}
				}
				if(data['status']){
					result.lists = data['data']
					result.pagination = data['pagination'];
					promise(result)
				}
			})
		}
	}

	this.getPropUnits = function(propId, pageNumber){
		return function(promise){
			axios({
			  method: 'get',
			  url: 'https://api.arthuronline.co.uk/v2/properties/'+propId+'/units/?page='+pageNumber,
			  headers : {
			  	'Authorization' : 'Bearer ' + token,
			  	'X-EntityID' : '17152'
			  }
			}).then(function(res){
				var data = res['data'];
				var data_list = []
				var pagination = data['pagination'];
				var result = {
					lists : [],
					pagination : {}
				}
				if(data['status']){
					result.lists = data['data']
					result.pagination = pagination
					promise(result)
				}
			})
		}
	}


	this.getAllTenancies = function(pageNumber){
		return function(promise){
			axios({
			  method: 'get',
			  url: 'https://api.arthuronline.co.uk/v2/tenancies?page='+pageNumber,
			  headers : {
			  	'Authorization' : 'Bearer ' + token,
			  	'X-EntityID' : '17152'
			  }
			}).then(function(res){
				var data = res['data'];
				result = {
					lists : [],
					pagination : {}
				}
				if(data['status']){
					result.lists = data['data']
					result.pagination = data['pagination'];
					promise(result)
				}
			})
		}
	}
}

exports.property_api = function(){
	return new property_api();
}

})