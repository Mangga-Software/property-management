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
				temp_properties : [],
				selprop : '',
				units : [],
				temp_units : [],
				tenancies : [],
				temp_tenancies : [],
				total_units : 0,
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
						
					</div>
				</div>
				<div class='right-content'>
					<div class='top-settings'>
						<calendarview 
						v-bind:start_date="start_date" 
						v-bind:end_date="end_date" 
						v-bind:total_units="total_units" 
						v-bind:temp_units="temp_units" 
						v-bind:tenancies="temp_tenancies"
						v-bind:properties="properties"
						v-bind:selprop="selprop"></calendarview>
					</div>
				</div>	
			</div>
		</div>`,
		methods : {
			selProperties : function(e){
				console.log(e.target.value)
			},
			getTenancies : function(unitId){

			}
		},
		created : function(){
			var $this = this
			var initdb = db.init();
			initdb(function(dbres){
				db.database = dbres;
				//properties
				var properties = db.getCountAll('properties')
				properties(function(count){
					if(!count){
						var props = api.getPropertyList()
						props(function(res){
							var add_db = db.addData('properties', 'readwrite', res);
							add_db(function(success){
								console.log(success)
							})
						})
					}
					else{
						db.getResults('properties', function(res){
							$this.properties.push(res.value)
						})
					}
				})
				//units
				var units = db.getCountAll('units')
				units(function(count){
					if(!count){
						var props = api.getAllUnits()
						props(function(res){
							var add_db = db.addData('units', 'readwrite', res);
							add_db(function(success){
								console.log(success)
							})
						})
					}else{

						db.getResults('units', function(res){
							$this.temp_units.push(res.value)
						})	
					}
				})

				var tenants = db.getCountAll('tenancies')
				tenants(function(count){
					if(!count){
						var props = api.getAllTenancies()
						props(function(res){
							var add_db = db.addData('tenancies', 'readwrite', res);
							add_db(function(success){
								console.log(success)
							})
						})
					}
					else{
						db.getResults('tenancies', function(res){
							$this.temp_tenancies.push(res.value)
						})	
					}
				})
			})
			//end db
		}

	})
}

})