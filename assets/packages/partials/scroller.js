define(['require', 'exports', 'module', 'moment'], function( require, exports, module, moment ) {

exports.load = function(){

	Vue.component('scroller', {
		data : function(){
			return {
				shiftX : 0,
				is_mousedown : false,
			}
		},
		template : `<div id='scroller' 
					>
					<span class='scroll-handler'></span>
					</div>`,
		props : {
			scrollX : {
				type : Number,
				default : 0
			}
		},
		methods : {
			scrollMouseDown : function(event){
				
				
			},
		},
		mounted : function(){
			this.$nextTick(function () {
				var doc = document.getElementById("scroller")
				var month = document.getElementById('month-lists');
				var cal = document.getElementById('cal-lists');
				var calX = 0;
				var shiftX = 0;
				var sensitive = 1;
				var pos_dir = 0;
				var is_moving = false
				var is_move_left = false;

				function moveAt(pageX) {
					
					if(doc.offsetLeft < 280){
						doc.style.left = '280px'
						month.style.left = '0px'
						cal.style.left = '0px'
						return false;
					}

					else if(doc.offsetLeft >= 1374){
						month.style.left = -(cal.offsetWidth - (cal.offsetWidth / 11.5))+ 'px'
						cal.style.left = -(cal.offsetWidth - (cal.offsetWidth / 11.5)) + 'px'
						doc.style.left = '1370px'
						return false;
					}

					if(is_moving){
						
						if(!is_move_left){
							sensitive = 10.5
						}
						else{
							sensitive = 10.5
						}
						
						doc.style.left = (pageX - shiftX) + 'px';
						month.style.left = -(pageX * sensitive) + (310 * sensitive) + 'px';
						cal.style.left = -(pageX * sensitive) + (310 * sensitive) + 'px';
					}
					
				}

				function onMouseMove(event) {
					is_moving = true

				    moveAt(event.pageX);
				    
				    if(pos_dir < event.pageX){
				    	is_move_left = false
				    }
				    else
				    {
				    	is_move_left = true
				    }

				    pos_dir = event.pageX

				}
				
				doc.onmousedown = function(event) {
					
					is_moving = false
					
					shiftX = event.clientX - doc.offsetLeft;

					moveAt(event.pageX)
					
					document.addEventListener('mousemove', onMouseMove);

					doc.onmouseup = function() {
						is_moving = false
					    document.removeEventListener('mousemove', onMouseMove);
					    doc.onmouseup = null;
					};
				}
				
				document.addEventListener('click', function(e){
					is_moving = false
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