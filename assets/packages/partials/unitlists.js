define(['require', 'exports', 'module', 'moment'], function( require, exports, module, moment ) {


exports.load = function(){

	Vue.component('unit-lists', {
		template : `<td class="unit-name" :data-id="unit.unit_id"><div>{{unit.unit_name}}</div></td>`,
		props : {
			unit : {
				type : Object,
				default : {}
			}
		},
		created : function(){

		}
	})

}


})