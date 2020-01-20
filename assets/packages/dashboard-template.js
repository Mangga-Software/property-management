define(['require', 'exports', 'module'], function( require, exports, module ) {

require('header').display();
require('propertylist').load();

exports.load = function() {
	Vue.component('dashboard-template', {
		data : function(){
			return {}
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