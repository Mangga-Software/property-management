define(['require', 'exports', 'module', 'moment'], function( require, exports, module, moment ) {

var api = require('property-api').property_api();
var db = require('property-db').property_db();

	exports.load = function(){

		Vue.component('calendarview', {
			data : function(){
				return {
					units : [],
					months : ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
					year : '',
					days : 0,
					print_unit : true,
					marker_type : 'current'
				}
			},
			template : `
			<div class='cal-wrapper'>
				<div class='cal-content'>
					<div class="cal-content-scroll">
						<table class='month-wrapper'>
							<tr>
								<td><select v-model="selprop">
									<option v-for="property in properties" v-bind:value="property.id">
										{{property.ref}}
									</option>
								</select>
								</td>
								<td class='month-name' v-for="(month, index) in months" v-bind:colspan="getMaxDays(index)">{{month}}</td>
							</tr>
							<tr>
								<td></td>
								<td v-for="(day, index) in getDaysMonth()">{{day}}</td>
							</tr>
							<tr v-for="unit in getUnitsAvail">
								<td>{{unit.unit_name}}</td>
								<td v-for="day in unit['days']" v-bind:colspan="day.total_span">
									<div v-if="day.is_start" v-bind:class="'marker marker-'+day.marker">{{day.marker}}</div>
								</td>
							</tr>
						</table>	
					</div>
				</div>
			</div>
			`,
			props : {
				start_date : {
					type : String,
					default : ""
				},
				end_date : {
					type : String,
					default : ""	
				},
				temp_units : {
					type : Object,
					default : {}
				},
				tenancies : {
					type : Object,
					default : {}
				},
				properties : {
					type : Object,
					default : 0
				},
				selprop : {
					type : String,
					default : ""
				}
			},
			watch : {
				selprop : function(newVal, oldVal){
					this.units = [];
					this.getUnits(newVal)
				}
			},
			methods : {
				getUnits : function(propId){
					var $this = this
					var units = $this.temp_units;
					for(var i in units){
							if(units[i].property_id == propId){
								$this.units.push(units[i])
							}
						}
				},
				getMaxDays : function(month){
					return moment().month(month).daysInMonth()
				},
				getDaysMonth : function(){
					var obj = [];
					for(var i in this.months){
						var days = moment().month(i).daysInMonth()
						for(var a = 1; a <= days; a++){
							obj.push(a)
						}
					}
					return obj
				},
				getDateDiff : function(start_date, end_date){
					var _s_date = moment(start_date);
					var _e_date = moment(end_date);
					var end = moment([
							_e_date.get('year'), 
							_e_date.get('month'),  
							_e_date.get('date')
						]);
					
					var start = moment([
							_s_date.get('year'), 
							_s_date.get('month'),  
							_s_date.get('date')
						]);

					return end.diff(start, 'days')
				},
				getTenancyDate : function(month, day, unit){
					var tenants = this.tenancies
					var marker = '';
					for(var i in tenants){
						if(tenants[i].status == "Current"){
							marker = 'current'
						}
						else if(tenants[i].status == "Approved"){
							marker = 'approved'
						}
						else if(tenants[i].status == "Past"){
							marker = 'past'
						}
						if(tenants[i].unit_id == unit.id && tenants[i].start_date != ""){
							var date = moment(tenants[i].start_date);
							var _mon = date.get("month");
							var _day = date.get("date");
							if(_mon == month && _day == day){
								var diff = this.getDateDiff(tenants[i].start_date, tenants[i].end_date)
								var data = {
									diff : diff,
									marker : marker
								}
								return data;
							}
						}
					}
					return false
				}
			},
			computed : {
				getUnitsAvail : function(){
					var obj = [];
					if(this.units.length){
						for(var a in this.units){
							var data = {}
							data['unit_id'] = this.units[a].id
							data['unit_name'] = this.units[a].unit_ref
							data['days'] = [];
							data['has_start'] = [];
							for(var b in this.months){
								var max_days = moment().month(b).daysInMonth()
								for(var c = 1; c <= max_days; c++ ){
									
									var has_start = {
										is_start : false,
										total_span : 0,
										marker : '',
										day : c
									};

									if(this.getTenancyDate(b, c, this.units[a])){
										var tenant = this.getTenancyDate(b, c, this.units[a]);
										has_start.is_start = true
										has_start.total_span = tenant.diff
										has_start.marker = tenant.marker
									}

									data['days'].push(has_start)
								}
							}
							obj.push(data)
						}
					}
					return obj
				}
			},
			beforeUpdate : function(){
				var tenants = this.tenancies
				for(var i in tenants){
					// console.log(tenants[i].status)
					if(tenants[i].status == "Current"){
						console.log(tenants[i])
					}
				}
			},
			created : function(){
				var initdb = db.init();
				initdb(function(dbres){
					db.database = dbres
				});
			}
		});

	}

})