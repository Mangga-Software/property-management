<template lang="pug">
bContainer
  bRow
    div(id='login-form', class='form-wrapper')
      bFormRow
        div(class='login-header')
          h1 Mangga Property Management
      bFormRow
        bFormGroup(id='fieldset-horizontal', class='user-input', label-for="username") 
          bFormInput(id="username", placeholder="Username")
      bFormRow
        bFormGroup(id='fieldset-horizontal', class='user-input', label-for="password") 
          bFormInput(id="password", placeholder="Password")
      bFormRow
        bButton(variant="primary", class='user-login-btn') Login
      div(class='col-sep') or
      div(class='col-sep') Connect with:
      bFormRow
        bButton(variant="success", class='user-login-btn', @click="openArthur()") Arthuronline

</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      is_login : false
    }
  },
  props : {

  },
  methods : {
      openArthur: function(){
          var win =  window.open(`https://auth.arthuronline.co.uk/oauth/authorize?
client_id=43177e3924eb24c873aed2df6eff6b69f6a2afc26328f526ff0904c07c9f41cc&redirect_uri=https://localhost.test/manggahomes/TokenCallback.php`, "", "resizable,scrollbars,status");
      }
  },
  created : function(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-wrapper{
    width: 60%;
    background-color: #d8d8d8;
    padding: 30px;
    margin: auto;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
}
.login-header{
    width: 80%;
    margin: auto;
    border-bottom: solid 1px #9e9e9e;
    margin-bottom: 30px;
}
.login-header h1{
  font-size: 20pt;
}
.user-input{
    width: 50%;
    margin: auto;
}
.user-input .form-control{
    width: 100%;
}
.form-group{
  margin-bottom:20px;
}
.user-login-btn{
    text-align:center;
    width: 50%;
    margin: auto;
}
</style>
