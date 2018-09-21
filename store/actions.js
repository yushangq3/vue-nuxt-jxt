import * as types from './mutation-types.js'

export default {
    nuxtServerInit ({ commit }, { req }) {
        // console.log(req)
    },
	changeUserInfo(context,flag){
		context.commit(types.UPDATEUSERINFO,flag);
	},
	hideLoading(context,info){
		context.commit(types.CHANGELOADING,false)
	},
	showLoading(context,info){
		context.commit(types.CHANGELOADING,true)
	},
	changeGLuList(context,info){
		context.commit(types.CHANGEGLULIST,info)
	},
	getOpenId(context,info){
		context.commit(types.GETOPENID,info)
	},
	getUserId(context,info){
		context.commit(types.GETUSERID,info)
	},
	changeCode(context,info){
		context.commit(types.CHANGECODE,info)
	}
}