define(['require', 'exports', 'module', 'moment'], function( require, exports, module, moment ) {

	exports.load = function(){

		Vue.component('calendarview', {
			data : function(){
				return {
					month : ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
					year : '',
					days : 0
				}
			},
			template : `
			<div class='cal-wrapper'>
				<div class='cal-content'>
					<div class='month-wrapper'>
						
						{{month}} - {{getDateDiff}}
					</div>
					<div class='cal-content-scroll'>
						<div class='cal-days-wrapper'>
							<div class='cal-day' v-for="day in days">{{day}}</div>
						</div>
					</div>
				</div>
			</div>
			`,
			props : {
				start_date : {
					type : Array,
					default : []
				},
				end_date : {
					type : Array,
					default : []	
				}
			},
			computed : {
				getDateDiff : function(){
					if(this.start_date != ''){
						var _s_date = moment(this.start_date);
						var _e_date = moment(this.end_date);
						
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
					}
				}
			},
			created : function(){
				var _m = moment();
				this.month = _m.format('MMMM');
				this.days = moment().daysInMonth();
			}
		});

	}

})