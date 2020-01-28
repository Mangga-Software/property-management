define(['require', 'exports', 'module', 'moment'], function( require, exports, module, moment ) {

exports.load = function(){

	Vue.component('vscroller', {
		data : function(){
			return {
				sensitive : 1
			}
		},
		template : `<div id='vscroller' v-bind:style="'height:' + maxUnits + 'px;'">
						<span class='scroll-handler'></span>
					</div>`,
		props : {
			units : {
				type : Object,
				default : {}
			}
		},
		computed : {
			maxUnits : function(){
				if(this.units.length <= 8 && this.units.length > 0){
					return this.units.length * 40
				}
				else if(this.units.length > 8){
					this.sensitive = 6.5
					return this.units.length * ( 40 / this.units.length )
				}else{
					return 400
				}
			}
		},
		methods : {
			
		},
		mounted : function(){
			var $this = this
			this.$nextTick(function () {
				var doc = document.getElementById("vscroller")
				var cal = document.getElementById('cal-lists');
				var unit_list = document.getElementById('scroll-unit-lists');
				var shiftY = 0;
				var calY = 0;
				var unitY = 0;
				function moveAt(pageY) {
					
					if(doc.offsetTop < 53){
						doc.style.top = '53px'
						cal.style.top = '27px';
						unit_list.style.top = '0px'
						return false;
					}
					else if(doc.offsetTop > 53 && doc.offsetHeight == 400){
						doc.style.top = '53px'
						cal.style.top = '27px';
						unit_list.style.top = '0px';
						return false;
					}
					else if(doc.offsetHeight < 400){
						doc.style.top = (pageY - shiftY) + 'px';
						cal.style.top = -((pageY - calY) * $this.sensitive) + 'px';
						unit_list.style.top = -((pageY - unitY) * $this.sensitive) + 'px';
					}
				}

				function onMouseMove(event) {
				    moveAt(event.pageY);
				}
				
				doc.onmousedown = function(event) {
					shiftY = event.clientY - doc.offsetTop;
					calY = 	event.clientY - cal.offsetTop + ( 27 * 2 )
					unitY =	event.clientY - cal.offsetTop + 27

					moveAt(event.pageY)
					
					document.addEventListener('mousemove', onMouseMove);

					doc.onmouseup = function() {
					    document.removeEventListener('mousemove', onMouseMove);
					    doc.onmouseup = null;
					};
				}
				
				document.addEventListener('click', function(e){
					doc.onmouseup = null;
					document.removeEventListener('mousemove', onMouseMove);
				})

				doc.ondragstart = function() {
				  return false;
				};
			})
		}
	});


}


});