define(['require', 'exports', 'module'], function( require, exports, module ) {

require('header').display();
require('propertylist').load();

exports.load = function() {
	Vue.component('dashboard-template', {
		inject : ['initIndexDb'],
		provide : function(){
			return {
				countRecord : function(store){
					var promise = new Promise(function(_res, _err){
						var count = store.count();
						count.onsuccess = function() {
					    	_res(count.result);
						}
					})
					return promise
				}
			}
		},
		data : function(){
			return {
				db : ''
			}
		},
		template : `<div>
				<header-template></header-template>
					<div class='section'>
						<propertylist></propertylist>
					</div>
				</div>`,
		created : function(){

			
		}
	})

}

})