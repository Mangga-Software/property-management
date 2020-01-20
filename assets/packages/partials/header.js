define(['require', 'exports', 'module'], function( require, exports, module ) {

exports.display = function(){

	Vue.component('header-template', {
		template : `<div class='header-wrapper'>
				<div class='header-content'>
					<div class='logo'><img src='/manggahomes/static/mangga-logo21.png' /></div>
					<div class='navigation'>
						<ul class='menu'>
							<li><a><span>Menu 1</span></a></li>
							<li><a><span>Menu 2</span></a></li>
							<li><a><span>Menu 3</span></a></li>
						</ul>
					</div>
				</div></div>
		`,
		created : function(){
			console.log("asdasda")
		}
	})

}

})