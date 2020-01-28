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
				temp_tenancies : [],
				total_units : 0,
				selprop : '',
				units : [],
				unit_page : 1,
				tenant_page : 1,
				temp_units : [],
				tenancies : [],
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
							$this.properties.push(res)
							var add_db = db.addData('properties', 'readwrite', res);
							add_db(function(success){
								// console.log(success)
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
						var props = api.getAllUnits($this.unit_page)
						props(function(res){
							var lists = res.lists;
							var page = res.pagination
							for( var i = $this.unit_page; i <= page.pageCount; i++){
								props = api.getAllUnits($this.unit_page)
								props(function(res){
									var _lists = res.lists;
									for(var a in _lists){
										var add_db = db.addData('units', 'readwrite', _lists[a]);
										add_db(function(success){
											console.log(success)
										})
										$this.temp_units.push(_lists[a])
									}
								})
								$this.unit_page++;
							}
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
						var props = api.getAllTenancies($this.tenant_page)
						props(function(res){
							var lists = res.lists;
							var page = res.pagination
							for( var i = $this.tenant_page; i <= page.pageCount; i++){
								props = api.getAllTenancies($this.tenant_page)
								props(function(res){
									var _lists = res.lists;
									for(var a in _lists){
										var add_db = db.addData('tenancies', 'readwrite', _lists[a]);
										add_db(function(success){
											// console.log(success)
										})
										$this.temp_tenancies.push(_lists[a])
									}
								})
								$this.tenant_page++;
							}
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