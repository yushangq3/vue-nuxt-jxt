import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)

const state =()=> {
    return {
        isLoading:false,
        userInfo:{},
        openId:null,
        userId:'',
        GluList:[] //用户血糖目标值
    }
}

export default ()=> new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
})