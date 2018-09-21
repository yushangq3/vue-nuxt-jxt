import * as types from './mutation-types.js'
import Vue from 'vue'

const setObjectValue=(obj,info)=>{
	if(typeof info ==='object'){
		for (let i in info){
			if(info.hasOwnProperty(i)){
				Vue.set(obj,i,info[i]);
			}
		}
	}
}

export default {
		[types.UPDATEUSERINFO](state,info){
			setObjectValue(state.userInfo,info)
		},
		[types.GETUSERID](state,info){
			state.userId=info
		},
		[types.GETOPENID](state,info){
			state.openId=info
		},
		[types.CHANGELOADING](state,info){
			state.isLoading=info
		},
		[types.CHANGEGLULIST](state,info){
			setObjectValue(state.GluList,info)
		},
		[types.CHANGECODE](state,info){
			state.code=info
		}
	}
