define(['require', 'exports', 'module', 'moment'], function( require, exports, module, moment ) {

var api = require('property-api').property_api();
var db = require('property-db').property_db();
var tooltip = require('tooltipdetails').load();
var unitlists = require('unitlists').load();
var unitinfos = require('unitinfos').load();
var scroller = require('scroller').load();
var vscroller = require('vscroller').load();
	exports.load = function(){

		Vue.component('calendarview', {
			data : function(){
				return {
					units : [],
					months : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
					days : 0,
					current_year : 0,
					print_unit : true,
					marker_type : 'current',
					is_hover : false,
					posX : 0,
					posY : 0,
					scrollX : 0,
					tenant_id : 0,
					property_id : 0
				}
			},
			template : `
			<div class='cal-wrapper'>
				<div class='cal-content'>
					<div class='cal-content-row'>
						<div class="cal-content-left">
							<div class='top-selection-props'>
								<table class='month-wrapper left-selection'>
									<tr><td><div class='adjust-left-top'></div></tr>
									<tr>
										<td>
										<select v-model="selprop">
											<option v-for="property in properties" v-bind:value="property.id">
												{{property.ref}}
											</option>
										</select>
										</td>
									</tr>
								</table>
							</div>
						</div>
						<div class="cal-content-right">
							<table class='month-wrapper date-list' id="month-lists">
							<tr>
								<td></td>
									<td class='month-name' v-for="(month, index) in months" v-bind:colspan="getMaxDays(index)">{{month + ' ' + current_year}}</td>
								</tr>
								<tr class="month-days">
									<td><div class='adjust-top-month'></div></td>
									<td v-for="(day, index) in getDaysMonth()">{{day}}</td>
								</tr>
							</table>
						</div>
					</div>
					<div class='cal-content-row  content-scroll'>
						<div class="cal-content-left">
							<div id="scroll-unit-lists">
								<table>
								<tbody>
								<tr v-for="(unit, index) in units">
									<unit-lists v-bind:unit="unit"></unit-lists>
								</tr>
								</tbody>
								</table>
							</div>
						</div>
						<div class="cal-content-right">
							<table class='month-wrapper unit-lists' id="cal-lists">
								<tr class="month-days">
									<td><div class='adjust-top-month'></div></td>
									<td v-for="(day, index) in getDaysMonth()" class='hide-date'>{{day}}</td>
								</tr>
								<tr class='unit-row' v-for="(unit, index) in units">
									<td><div class='adjust-first-col'></div></td>
									<td v-for="info in unit['days']" 
									v-bind:colspan="info.total_span" class='day-border'>
										<unit-infos v-bind:info="info" 
										v-bind:hoverInfo="getDetailsHover"
										v-bind:Unhover="getUnHover"></unit-infos>
									</td>
								</tr>
							</table>
							<scroller></scroller>
							
						</div>
					</div>
				</div>
				<div v-if="is_hover" :style="'position:absolute;top:'+posY+'px;left:'+posX+'px;z-index:99999;'">
					<tooltipdetails v-bind:tenancies="tenancies" v-bind:tenant_id="tenant_id"></tooltipdetails>
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
					this.property_id = newVal
				},
				scrollX : function(newVal, oldVal){
					console.log(newVal)
				}
			},
			methods : {
				getDetailsHover : function(e){
					this.is_hover = true
					this.posX = e.pageX
					this.posY = e.target.getBoundingClientRect().top + (window.scrollY + 30)
					this.tenant_id = e.target.getAttribute("data-id")
				},
				getUnHover : function(e){
					this.is_hover = false					
				},
				getUnits : function(propId){
					var $this = this
					var units = $this.temp_units;
					for(var i in units){
						if(units[i].property_id == propId){
							$this.units.push($this.format_unit(units[i]))
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
						if(tenants[i].unit_id == unit.id && tenants[i].end_date != "" && tenants[i].status != "Past"){
							var date = moment(tenants[i].end_date);
							var _mon = date.get("month");
							var _day = date.get("date");
							var _yr = date.get("year")
							if(_mon == month && _day == day && _yr == moment().get('year')){
								var diff = this.getDateDiff(tenants[i].start_date, tenants[i].end_date)
								var data = {
									diff : diff,
									marker : marker,
									tenant_id : tenants[i].id,
									tenant_name : tenants[i].tenants,
									start_date : tenants[i].start_date,
									end_date : tenants[i].end_date,
									status : tenants[i].status
								}
								return data;
							}
						}
					}
					return false
				},
				filter_yrstart : function(data){
					var days = data['days']
					var has_start = false;
					var total_days = 0;
					
					for(var i in this.months){
						var day_in_year = moment([2019, i]).daysInMonth();
						total_days += day_in_year
					}

					var prev_yrs = days.splice(0, total_days);
					for(var i in prev_yrs){
						// console.log(prev_yrs[i])
					}
					return data

				},
				format_unit : function(unit){
					var data = {}
					data['unit_id'] = unit.id
					data['unit_name'] = unit.unit_ref
					data['days'] = [];
					var count_diff = 0
					var yr = moment().get('year')
					for(var b in this.months){
						var max_days = moment([yr, b]).daysInMonth()
						for(var c = 1; c <= max_days; c++ ){
							if(count_diff > 1){
								count_diff--;
								continue;
							}else{
								count_diff = 0
							}

							var has_start = {
								is_start : false,
								total_span : 0,
								marker : '',
								day : c,
								tenant_id : 0,
								tenant_name : []
							};

							if(this.getTenancyDate(b, c, unit)){
								var tenant = this.getTenancyDate(b, c, unit);
								var days_length = data['days'].length
								if(tenant.diff > days_length){
									data['days'][0].is_start = true
									data['days'][0].total_span = days_length
									data['days'][0].marker = tenant.marker
									data['days'][0].tenant_name = tenant.tenant_name
									data['days'][0].tenant_id = tenant.tenant_id
									data['days'].splice(1, days_length - 1)
								}
								else if(tenant.diff < days_length){
									has_start.is_start = true
									has_start.total_span = tenant.diff
									has_start.marker = tenant.marker
									has_start.tenant_name = tenant.tenant_name
									has_start.tenant_id = tenant.tenant_id
									data['days'].splice(days_length - tenant.diff, tenant.diff - 1)
								}

							}

							data['days'].push(has_start)
						}
					}
					return data
				}
			},
			computed : {

			},
			beforeUpdate : function(){
				// console.log(this.units)
			},
			created : function(){
				this.current_year = moment().get('year')
				var initdb = db.init();
				initdb(function(dbres){
					db.database = dbres
				});
			}
		});

	}

})