import {fetch} from './index.js'

const fetchUrl=(url,parms)=>{
	let expra=''
	for (let i in parms){
		if(parms.hasOwnProperty(i)){
			expra+=i+'='+parms[i]+'&'
		}
	}
	if(expra){
		expra='?'+expra;
	}
	
	return fetch(url+expra,{},'post');
}


/*
 获取用户信息
 
 * */
export const getUserInfo = (userid) =>{
	return fetchUrl('/litapp/user/user/'+userid, {});
}

/*
 获取用户血糖目标值
 
 * */
export const getUserGLuList = (userid) =>{
	return fetchUrl('/litapp/goal/get/'+userid, {});
}

/* 获取用户血糖列表 */
export const getGluList =(data,userid)=>{
    console.log(userid,"userid")
	return fetch('/litapp/bldglucose/table/'+userid,data,'get');
}

/**
 * 
 * 保存用户血糖值
 */
export const toSaveGlu=(data,userid)=>{
	let dat=Object.assign({
		userid:userid
	},data)
	// data=JSON.stringify(data);
	return fetch('/litapp/bldglucose/add',dat,'post');
	
}


/* 获取随机数据 备注信息 */
export const getRadomTips=(data,userid)=>{
	let dat=Object.assign({
		userid:userid
	},data)
	return fetch('/litapp/bldglucose/randomData',dat,'post');	
}

/* 获取具体血糖数据 备注信息 */

export const getTipData=(data)=>{
	let dat=Object.assign({
		userid:userid
	},data)
	return fetch('/litapp/bldglucose/get',dat,'post')
}

/* 删除 血糖值 */
export const delGlu=(data,userid)=>{
	let dat=Object.assign({
		userid:userid
	},data)
	
	return fetch('/litapp/bldglucose/del',dat,'post')
}

/* 保存 血糖备注 */
export const saveGlu=(data,userid)=>{
	let dat=Object.assign({
		userid:userid
	},data)
	return fetch('/litapp/bldglucose/remark/update',dat,'post')

}

/* 获取分析数据 */
export const getAnalysis=(data,userid)=>{
	return 	fetchUrl('/litapp/bldglucose/weekgraph/'+userid,data)
	
}

/* Update User Info */

export const updateInfo=(data,userid)=>{
	let dat=Object.assign({
		userid:userid
	},data)
	return fetch('/litapp/user/update',dat,'post')
}

export const updateGoal=(data)=>{
	return fetch('/litapp/goal/update',data,'post')
}

/**
 * 
 * 获取用户体重列表
 */
export const weightList=(data,userid)=>{
	let dat=Object.assign({
		userid:userid
	},data)
	return fetchUrl('/litapp/weight/list',dat);
}

/* add Weight */
export const weightAdd=(data,userid)=>{
	let dat=Object.assign({
		userid:userid
	},data)
	return fetch('/litapp/weight/add',dat,'post')
}
/* delete Weight */

export const weightDel=(data)=>{
	return fetchUrl('/litapp/weight/del',data)
}

/* 获取验证码 */
export const getVerify=(data)=>{
	
	return fetchUrl('/common/verifycode',data)

}
/* 意见反馈 */
export const feedback=(data,userid)=>{
	let dat=Object.assign({
		userid:userid
	},data)
	return fetch('/litapp/suggest/save',dat)
}

/* 获取问卷 调查 */

export const question=()=>{
	return fetch('/litapp/question/list',{},'post')
}                

export const questionSave=(answers)=>{
	return fetch('/litapp/question/save',answers,'post')
}
