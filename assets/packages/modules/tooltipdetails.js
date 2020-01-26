define(['require', 'exports', 'module', 'moment'], function( require, exports, module, moment ) {

var db = require('property-db').property_db();

exports.load = function(){

	Vue.component('tooltipdetails', {
		data : function(){
			return {
				first_name : '',
				last_name : '',
				start_date : '',
				end_date : '',
				rent_amnt : 0
			}
		},
		template : `<div class='tooltip-wrapper'>
			<div class='tooltip-content'>
				<div class='tooltip-details'>
					<div>First name: <span>{{first_name}}</span></div>
					<div>Last name: <span>{{last_name}}</span></div>
					<div>Start Date: <span>{{start_date}}</span></div>
					<div>End Date: <span>{{end_date}}</span></div>
					<div>Rent Amount: <span>{{rent_amnt}}</span></div>
				</div>
			</div>
		</div>`,
		props : {
			tenancies : {
				type : Object,
				default : {}
			},
			tenant_id : {
				type : Number,
				default : []	
			}
		},
		watch : {
			tenancies : function(_n, _o){
				console.log(_n)	
			}
		},
		beforeUpdate : function(){
			
		},
		created : function(){
			var tenants = this.tenancies
			for(var t in tenants){
				if(tenants[t].id == this.tenant_id){
					var data = tenants[t].tenants[0];
					this.first_name = data.first_name
					this.last_name = data.last_name
					this.rent_amnt = tenants[t].rent_amount
					this.start_date = moment(tenants[t].start_date).format("MMM DD, YYYY")
					this.end_date = moment(tenants[t].end_date).format("MMM DD, YYYY")
				}
			}
		}
	})

}



})
