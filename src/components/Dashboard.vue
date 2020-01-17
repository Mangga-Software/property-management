<template lang="pug">
	bContainer
		bRow
			div testing
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

export default {
	name: 'Dashboard',
	created : function(){
		var h = Vue.axios({
		  method: 'get',
		  url: 'https://api.arthuronline.co.uk/v2/properties?Property_Type=Mixed',
		  headers: {'Authorization': 'Bearer 747323e49e1b6cb36fe857266c2ddca3906532d34cd19ba3507e86f5f5f48c33',
			'X-EntityID' : '89441'}
		}).then(function(response) {
			console.log(response)
		})
		
	}
}
</script>