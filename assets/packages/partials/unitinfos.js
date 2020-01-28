define(['require', 'exports', 'module', 'moment'], function( require, exports, module, moment ) {


exports.load = function(){

Vue.component('unit-infos', {
	template : `<div v-bind:class="'spacing marker-' + info.marker"><div v-if="info.is_start" 
					v-bind:class="'marker marker-'+info.marker" 
					:data-id="info.tenant_id"
					v-on:mouseover="hoverInfo($event)"
					v-on:mouseleave="Unhover($event)"
					>
					
					<span :data-id="info.tenant_id" 
					>
					{{info.tenant_name[0].first_name + ' ' + info.tenant_name[0].last_name | stringConcat(info.total_span)}}
					</span>

				</div></div>`,
	props : {
		info : {
			type : Object,
			default : {}
		},
		hoverInfo : {
			type : Function,
		},
		Unhover : {
			type : Function
		}
	},
	filters : {
		stringConcat : function(val, colspan){
			if(colspan < 8){
				return val.substring(0, 5)
			}
			return val
		}
	}

})

}


})