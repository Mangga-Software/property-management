define(['require', 'exports', 'module'], function( require, exports, module ) {

exports.load = function(){

	Vue.component('availablemod', {
		data : function(){
			return {
				id : '',
				properties : [],
				selprop : '',
				units : [],
				token : ''
			}
		},
		template : `<div class="module-wrapper">
			<div class="module-content">
				<div class='left-content'>
					<div class='top-settings'>
					<select v-model="selprop">
						<option v-for="property in properties" v-bind:value="property.id">
							{{property.ref}}
						</option>
					</select>
					</div>
					<div class='units'>
						<ul class='lists'>
							<li v-for="unit in units">{{unit.ref}}</li>
						</ul>
					</div>
				</div>
				<div class='right-content'>left</div>	
			</div>
		</div>`,
		watch : {
			properties : function(newVal, oldVal){
				if(this.properties.length){
					this.getUnits(this.properties[0]['id'])
				}
			},
			selprop : function(newVal, oldVal){
				this.units = [];
				this.getUnits(newVal)
			}
		},
		methods : {
			selProperties : function(e){
				console.log(e.target.value)
			},
			getUnits : function(propId){
				var units = this.units;
				axios({
				  method: 'get',
				  url: 'https://api.arthuronline.co.uk/v2/properties/'+propId+'/units',
				  headers : {
				  	'Authorization' : 'Bearer ' + this.token,
				  	'X-EntityID' : '89441'
				  }
				}).then(function(res){
					var data = res['data'];
					if(data['status']){
						for(var i in data['data']){
							var obj = {};
							var a = data['data'][i];
							obj['id'] = a['id'] 
							obj['ref'] = a['unit_ref']
							units.push(obj)
						}
					}
				})
			}
		},
		created : function(){
			var access = JSON.parse(localStorage.getItem('users_access'));
			var properties = this.properties;
			if(access['access_token']){
				this.token = access['access_token']
				axios({
				  method: 'get',
				  url: 'https://api.arthuronline.co.uk/v2/properties?Property_Type=Mixed',
				  headers : {
				  	'Authorization' : 'Bearer ' + this.token,
				  	'X-EntityID' : '89441'
				  }
				}).then(function(res){
					var data = res['data'];
					if(data['status']){
						for(var i in data['data']){
							var obj = {};
							var a = data['data'][i];
							obj['id'] = a['id'] 
							obj['ref'] = a['ref']
							properties.push(obj)
						}
					}
				});
			}
		}

	})
}

})