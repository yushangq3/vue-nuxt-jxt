<template>
	<div>
        
        <nuxt></nuxt>
	</div>
</template>

<script>
    import {getUserInfo} from '~/service/getData.js'
	export default {
        
        async fetch ({ store, route }) {
            //TODO暂时有坑，浏览器会自动查找favicon,此时会监听到
            if(route.path.lastIndexOf('favicon.ico')<=0){
                let userid=route.query.userid?route.query.userid:'100000002607';
                store.dispatch('getUserId',userid)
                let res=await getUserInfo(userid);
                console.log(465789)
                store.dispatch('changeUserInfo',res.data)
            }
        },
        data(){
            return {
                userInfo:this.$store.state
            }
        },
		computed:{
			
		},
		mounted(){
			
		}
	}
</script>

<style scoped>

</style>