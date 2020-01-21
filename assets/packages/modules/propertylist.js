define(['require', 'exports', 'module'], function( require, exports, module ) {

require('calendarview').load();
var api = require('property-api').property_api();
var db = require('property-db').property_db();

exports.load = function(){

	Vue.component('propertylist', {
		inject : ['initIndexDb', 'countRecord'],
		data : function(){
			return {
				id : '',
				db : '',
				properties : [],
				selprop : '',
				units : [],
				token : '',
				start_date : [],
				end_date : []
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
					// this.getUnits(this.properties[0]['id'])
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
				var obj = api.getUnits(propId);
				obj(function(res){
					units.push(res)
				})
			},
			getTenancies : function(unitId){
				var obj = api.getTenancies(unitId);
				obj(function(res){
					console.log(res);
				})
			}
		},
		created : function(){
			var $this = this
			var initdb = db.init();
			db.parallel([initdb]).then(function(res){
				db.database = res[0];
				var count = db.getCount('properties')
				db.parallel([count]).then(function(_res){
					var res_count = _res[0];
					if(res_count){
						db.getProperties('properties', function(res){
							var data = {};
							var val = res.value;
							data['id'] = val['id'];
							data['ref'] = val['ref']
							$this.properties.push(data);
						})
					}
					else{
						var props = api.getPropertyList()
						props(function(res){
							var data = res['data'];
							if(data['status']){
								for(var i in data['data']){
									var add_db = db.addProperty(data['data'][i]);
									add_db(function(success){
										console.log(success)
									})
								}
							}
						})
					}
				});
			});
		}

	})
}

})