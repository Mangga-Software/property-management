define(['require', 'exports', 'module'], function( require, exports, module ) {

require('calendarview').load();

exports.load = function(){

	Vue.component('propertylist', {
		data : function(){
			return {
				id : '',
				properties : [],
				selprop : '',
				units : [],
				token : '',
				start_date : "",
				end_date : ""
			}
		},
		template : `
		<div class="module-wrapper">
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
						<div class='lists-wrapper'>
							<div class='list-content'>
								 <div class='unit-name' v-for="unit in units">
									 <a href="javascript:void(0)" v-on:click="getTenancies(unit.id)">
									 	{{unit.ref}}
									 </a>
								 </div>
							</div>
						</div>
					</div>
				</div>
				<div class='right-content'>
					<div class='top-settings'>
						<calendarview v-bind:start_date="start_date" v-bind:end_date="end_date"></calendarview>
					</div>
				</div>	
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
				  	'X-EntityID' : '17152'
				  }
				}).then(function(res){
					var data = res['data'];
					console.log(data)
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
			},
			getTenancies : function(unitId){
				var $this = this
				axios({
				  method: 'get',
				  url: 'https://api.arthuronline.co.uk/v2/units/'+unitId+'/tenancies',
				  headers : {
				  	'Authorization' : 'Bearer ' + this.token,
				  	'X-EntityID' : '17152'
				  }
				}).then(function(res){
					var data = res['data'];
					if(data['status']){
						var obj = data['data'][0];
						$this.start_date = obj['start_date'];
						$this.end_date = obj['end_date']
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
				  	'X-EntityID' : '17152'
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