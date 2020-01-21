define(['require', 'exports', 'module'], function( require, exports, module ) {

exports.load = function() {
	Vue.component('login-template',
	{
		template : `<div class="container">
				<div class="row">
						<div class="form-wrapper" id="login-form">
							<div class="form-group">
								<div class="login-header"><h1>Demo Login</h1></div>
							</div>
							<div class='login-body'>
								<div class="form-group">
									<input type='text' class='form-control' id='username' placeholder='Username' />
								</div>
								<div class="form-group">
									<input type='text' class='form-control' id='password' placeholder='Password' />
								</div>
								<div class="form-group">
									<button class='btn btn-primary btn-md user-login-btn'>Login</button>
									<div class='col-sep'>or</div>
									<div class='col-sep'>Connect with:</div>
									<button class='btn btn-success btn-md user-login-btn' v-on:click="loginArthur($event)">Arthuronline</button>
								</div>
							</div>
						</div>
					</div>
				</div>`,
		methods : {
			loginArthur : function(){
				var win =  window.open(`https://auth.arthuronline.co.uk/oauth/authorize?
client_id=f4d49b8783e6f8e3f596cc06f4253d6c873f484fd3929480fa5edecba9d0a8b6&redirect_uri=https://localhost.test/manggahomes/TokenCallback.php`, "_self");  
			}
		},
		created : function(){
			
		}	
	})
}
});