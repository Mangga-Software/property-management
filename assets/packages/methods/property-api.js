define(['require', 'exports', 'module'], function( require, exports, module ) {

var entityId = '17152'

function property_api(){
	var access = JSON.parse(localStorage.getItem('users_access'));
	var token = access['access_token'];

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
				promise(result)
			})
		}
	}

	this.getUnits = function(propId){
		return function(promise){
			axios({
			  method: 'get',
			  url: 'https://api.arthuronline.co.uk/v2/properties/'+propId+'/units',
			  headers : {
			  	'Authorization' : 'Bearer ' + token,
			  	'X-EntityID' : '17152'
			  }
			}).then(function(res){
				var data = res['data'];
				if(data['status']){
					for(var i in data['data']){
						var obj = {};
						var a = data['data'][i];
						obj['id'] = a['id'] 
						obj['ref'] = a['unit_ref']
						promise(obj);
					}
				}
			})
		}
	}

	this.getTenancies = function(unitId){
		return function(promise){
			axios({
			  method: 'get',
			  url: 'https://api.arthuronline.co.uk/v2/units/'+unitId+'/tenancies',
			  headers : {
			  	'Authorization' : 'Bearer ' + token,
			  	'X-EntityID' : '17152'
			  }
			}).then(function(res){
				var data = res['data'];
				if(data['status']){
					var obj = data['data'][0];
					promise(obj)
				}
			})
		}
	}
}

exports.property_api = function(){
	return new property_api();
}

})