import {getUserInfo} from '~/service/getData.js'

export default async function ({query,store,redirect}) {
    let userid=query.userid?query.userid:'100000002607';
    let res=await getUserInfo(userid);
    store.dispatch('getUserId',userid)
    store.dispatch('changeUserInfo',res.data)
    let isCare=res.data.isCare,
    	code=query.code,
        openId=query.openid,
    	istoQrcode=query.istoQrcode,
    	midicineTimes=res.data.midicineTimes?res.data.midicineTimes:0,
    	visitTimes=res.data.visitTimes;
        store.dispatch('getOpenId',openId);
    let reUrl=null;
    if(code&&(!isCare)){
    	reUrl='/etangCareInfo';
    }else if(code&&isCare){
    	reUrl='/getqrcode';
    }else if(isCare&&istoQrcode){
    	reUrl='/user?midicineTimes='+midicineTimes+'&visitTimes='+visitTimes
    }
    else if(res.data.height==null){
    	reUrl='/baseInfo';
    }else{
    	reUrl='/'
    }
    return redirect(reUrl)
}