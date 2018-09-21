/**
 * Created by dev on 2017/8/11.
 */
Date.prototype.pattern = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
		"H+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	var week = {
		"0": "/u65e5",
		"1": "/u4e00",
		"2": "/u4e8c",
		"3": "/u4e09",
		"4": "/u56db",
		"5": "/u4e94",
		"6": "/u516d"
	};
	if(/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	if(/(E+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
	}
	for(var k in o) {
		if(new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}

function newFormPost(url, args) {
	var body = $(document.body),
		form = $("<form method='post' id='addIt'></form>"),
		input;
	form.attr({
		"action": url
	});
	if(args != null && typeof(args) != 'undefined') {
		$.each(args, function(key, value) {
			input = $("<input type='hidden'>");
			input.attr({
				"name": key
			});
			input.val(value);
			form.append(input);
		});
	}
	form.appendTo(document.body);
	form.submit();
	$("#addIt").remove();
}
/**
 * Created by stanleywu on 2017/3/20.
 */

(function($) {
	$.fn.serializeJson = function() {
		var serializeObj = {};
		var array = this.serializeArray();
		var str = this.serialize();
		$(array).each(function() {
			if(serializeObj[this.name]) {
				if($.isArray(serializeObj[this.name])) {
					serializeObj[this.name].push(this.value);
				} else {
					serializeObj[this.name] = [serializeObj[this.name], this.value];
				}
			} else {
				serializeObj[this.name] = this.value;
			}
		});
		return serializeObj;
	};
})(jQuery);

function showTips(tips, height, time) {

	var windowWidth = document.documentElement.clientWidth;
	var tipsDiv = '<div class="tipsClass">' + tips + '</div>';
	$('body').append(tipsDiv);
	$('div.tipsClass').css({
		'top': 200 + 'px',
		'left': (windowWidth / 2) - (tips.length * 13 / 2) + 'px',
		'position': 'fixed',
		'padding': '20px 50px',
		'background': '#EAF2FB',
		'font-size': 14 + 'px',
		'margin': '0 auto',
		'text-align': 'center',
		'width': 'auto',
		'color': '#333',
		'border': 'solid 1px #A8CAED',
		'opacity': '0.90',
		'z-index': '9999',

	}).show();
	setTimeout(function() {
		$('div.tipsClass').fadeOut().remove();
	}, (time * 1000));
}

function showToast(tips, time) {

	var windowWidth = document.documentElement.clientWidth;
	var tipsDiv = '<div class="tipsClass">' + tips + '</div>';
	$('body').append(tipsDiv);
	$('div.tipsClass').css({
		'top': 200 + 'px',
		'left': (windowWidth / 4) + 'px',
		'position': 'fixed',
		'padding': '20px 20px',
		'background': '#323232',
		'font-size': 14 + 'px',
		'margin': '0 auto',
		'text-align': 'center',
		'width': (windowWidth / 2)+'px',
		'color': '#ffffff',
		'border': 'solid 1px #A8CAED',
		'opacity': '0.90',
		'border-radius':'5px',
		'z-index': '9999',

	}).show();
	setTimeout(function() {
		$('div.tipsClass').fadeOut().remove();
	}, (time * 1000));
}
/*
 *  ajax请求数据
 */
function jsonPostCall(serverUrl, jsonParam, successCallBack, errorCallBack) {
	jQuery.ajax({
		url: serverUrl,
		dataType: 'json',
		type: 'POST',
		contentType: 'application/json;charset=utf-8',
		data: jsonParam,
		success: function(result) {
			successCallBack(result);
		},
		error: function(err) {
			if(errorCallBack) {
				errorCallBack(err);
			}
		}
	});
}

/*
 *  ajax同步请求数据
 */
function jsonPostSyncCall(serverUrl, jsonParam, successCallBack, errorCallBack) {
	jQuery.ajax({
		url: serverUrl,
		dataType: 'json',
		async: false,
		type: 'POST',
		contentType: 'application/json;charset=utf-8',
		data: jsonParam,
		success: function(result) {
			successCallBack(result);
		},
		error: function(err) {
			if(errorCallBack) {
				errorCallBack(err);
			}
		}
	});
}

function clone(obj) {
	var o, i, j, k;
	if(typeof(obj) != "object" || obj === null) return obj;
	if(obj instanceof(Array)) {
		o = [];
		i = 0;
		j = obj.length;
		for(; i < j; i++) {
			if(typeof(obj[i]) == "object" && obj[i] != null) {
				o[i] = arguments.callee(obj[i]);
			} else {
				o[i] = obj[i];
			}
		}
	} else {
		o = {};
		for(i in obj) {
			if(typeof(obj[i]) == "object" && obj[i] != null) {
				o[i] = arguments.callee(obj[i]);
			} else {
				o[i] = obj[i];
			}
		}
	}

	return o;
}

/***
 * 关闭当前tab
 * @param element
 */
function closeCurrentTab(element) {
	$.self = $.parent;
	var sel = parent.$('#x-tab-id').find('.layui-tab-title');
	var index = sel.find('li').index(sel.find('.layui-this'));
	parent.element.tabDelete('x-tab', index);
}

/***
 * 打开新的tab
 * @param element
 */
function createNewTab(element, url, title) {
	var res = parent.element.tabAdd('x-tab', {
		title: title //用于演示
			,
		content: '<iframe frameborder="0" src="' + url + '" class="x-iframe"></iframe>'
	});
	self.$ = parent.$;

	parent.element.tabChange('x-tab', parent.$('.layui-tab-title li').length - 1);

	parent.$('.layui-tab-title li').eq(0).find('i').remove();
}
//    截取URL参数
function getPara(testStr) {
	var returnPara;
	var url = window.location.href;
	var parameter = url.substring(url.indexOf('?') + 1).split('&');
	for(var i = 0; i < parameter.length; i++) {
		if(testStr.test(parameter[i])) {
			returnPara = parameter[i];
			break;
		}
	}
	if(returnPara) {
		return returnPara.substring(returnPara.lastIndexOf("=") + 1, returnPara.length);
	}
}
//输入框空字符串判断（空格换行）
function javaTrim(str) {
	for(var i = 0;
		(str.charAt(i) == ' ') && i < str.length; i++);
	if(i == str.length) return ''; //whole string is space
	var newstr = str.substr(i);
	for(var i = newstr.length - 1; newstr.charAt(i) == ' ' && i >= 0; i--);
	newstr = newstr.substr(0, i + 1);
	return newstr;
}

/**
 * 获取本周、本季度、本月、上月的开始日期、结束日期
 */
var now = new Date(); //当前日期
var nowDayOfWeek = now.getDay(); //今天本周的第几天
if(nowDayOfWeek==0){
	nowDayOfWeek=7;
}
var nowDay = now.getDate(); //当前日
var nowMonth = now.getMonth(); //当前月
var nowYear = now.getYear(); //当前年
nowYear += (nowYear < 2000) ? 1900 : 0; //
var timeStamp=new Date().getTime();

var lastMonthDate = new Date(); //上月日期
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
var lastYear = lastMonthDate.getYear();
var lastMonth = lastMonthDate.getMonth();

//格式化日期：yyyy-MM-dd
function formatDate(date) {
	var myyear = date.getFullYear();
	var mymonth = date.getMonth() + 1;
	var myweekday = date.getDate();

	if(mymonth < 10) {
		mymonth = "0" + mymonth;
	}
	if(myweekday < 10) {
		myweekday = "0" + myweekday;
	}
	return(myyear + "-" + mymonth + "-" + myweekday);
}
function formateTime(date){
	var myHour=date.getHours();
	var mymin=date.getMinutes();
	if(myHour < 10) {
		myHour = "0" + myHour;
	}
	if(mymin < 10) {
		mymin = "0" + mymin;
	}
	return(myHour + ":" + mymin);
}
//获得某月的天数
function getMonthDays(myMonth) {
	var monthStartDate = new Date(nowYear, myMonth, 1);
	var monthEndDate = new Date(nowYear, myMonth + 1, 1);
	var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
	return days;
}

//获得本季度的开始月份
function getQuarterStartMonth() {
	var quarterStartMonth = 0;
	if(nowMonth < 3) {
		quarterStartMonth = 0;
	}
	if(2 < nowMonth && nowMonth < 6) {
		quarterStartMonth = 3;
	}
	if(5 < nowMonth && nowMonth < 9) {
		quarterStartMonth = 6;
	}
	if(nowMonth > 8) {
		quarterStartMonth = 9;
	}
	return quarterStartMonth;
}

//获得本周的开始日期
function getWeekStartDate() {
	
	var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
	console.log(weekStartDate,'getWeekStartDate')
	return formatDate(weekStartDate);
}

//获得本周的结束日期
function getWeekEndDate() {
	var weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek));
	console.log(weekEndDate,'getWeekEndDate')

	return formatDate(weekEndDate);
}

//获取本周周日期
function getNowWeekDates() {
	var nowWeekDate = [];
	console.log(nowYear, nowMonth, nowDay,nowDayOfWeek,'getWeek')
	for(var i = 1; i <= 7; i++) {
		var month = (new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + i)).getMonth() < 9 ? "0" + Number((new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + i)).getMonth() + 1) : Number((new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + i)).getMonth() + 1);
		var day = (new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + i)).getDate() < 10 ? "0" + (new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + i)).getDate() : (new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + i)).getDate();
		nowWeekDate.push({
			"month": month,
			"day": day,
			"text": nowYear + "-" + month + "-" + day
		});
	}
	return nowWeekDate;
}

//获得上周的开始日期
function getLastWeekStartDate() {
	var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7);
	return formatDate(weekStartDate);
}
//获得上周的结束日期
function getLastWeekEndDate() {
	var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1);
	return formatDate(weekEndDate);
}

//获得下周的开始日期
function getNextWeekStartDate() {
	var weekStartDate = new Date(nowYear, nowMonth, nowDay + 7 - nowDayOfWeek + 1);
	return formatDate(weekStartDate);
}
//获得下周的结束日期
function getNextWeekEndDate() {
	var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 15);
	return formatDate(weekEndDate);
}

//获得本月的开始日期
function getMonthStartDate() {
	var monthStartDate = new Date(nowYear, nowMonth, 1);
	return formatDate(monthStartDate);
}

//获得本月的结束日期
function getMonthEndDate() {
	var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
	return formatDate(monthEndDate);
}

//获得上月开始时间
function getLastMonthStartDate() {
	var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
	return formatDate(lastMonthStartDate);
}

//获得上月结束时间
function getLastMonthEndDate() {
	var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
	return formatDate(lastMonthEndDate);
}

//获得本季度的开始日期
function getQuarterStartDate() {

	var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
	return formatDate(quarterStartDate);
}

//或的本季度的结束日期
function getQuarterEndDate() {
	var quarterEndMonth = getQuarterStartMonth() + 2;
	var quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth));
	return formatDate(quarterStartDate);
}



// var requestUrl = "http://192.168.104.25:8081";

// var requestUrl = "https://apptest.etangbio.com";

var requestUrl = "https://app3.51etang.com";
var userid = getPara(/userid=/g);
var isCare=0;//判断是否是宜糖关怀用户；
// var userid="100000000500";
//var listDefault=[{"beforeDawn": "","beforeBreakfast": "","afterBreakfast": "","beforeLanch": "","afterLanch": "","beforeDinner": "","afterDinner": "","beforeBed": ""}
//						,{"beforeDawn": "","beforeBreakfast": "","afterBreakfast": "","beforeLanch": "","afterLanch": "","beforeDinner": "","afterDinner": "","beforeBed": ""}
//						,{"beforeDawn": "","beforeBreakfast": "","afterBreakfast": "","beforeLanch": "","afterLanch": "","beforeDinner": "","afterDinner": "","beforeBed": ""}
//						,{"beforeDawn": "","beforeBreakfast": "","afterBreakfast": "","beforeLanch": "","afterLanch": "","beforeDinner": "","afterDinner": "","beforeBed": ""}
//						,{"beforeDawn": "","beforeBreakfast": "","afterBreakfast": "","beforeLanch": "","afterLanch": "","beforeDinner": "","afterDinner": "","beforeBed": ""}
//						,{"beforeDawn": "","beforeBreakfast": "","afterBreakfast": "","beforeLanch": "","afterLanch": "","beforeDinner": "","afterDinner": "","beforeBed": ""}
//						,{"beforeDawn": "","beforeBreakfast": "","afterBreakfast": "","beforeLanch": "","afterLanch": "","beforeDinner": "","afterDinner": "","beforeBed": ""}
//						];
var listDefault = {
	"beforeDawn": "",
	"beforeBreakfast": "",
	"afterBreakfast": "",
	"beforeLanch": "",
	"afterLanch": "",
	"beforeDinner": "",
	"afterDinner": "",
	"beforeBed": "",
	"date": ""
}

//设置餐次
function setMeal(dt) {
	var valMealTime;
	if(dt < 500) {
		valMealTime = "17";
	} else if(500 <= dt && dt <= 830) {
		valMealTime = "10";
	} else if(831 <= dt && dt <= 1030) {
		valMealTime = "11";
	} else if(1031 <= dt && dt <= 1300) {
		valMealTime = "12";
	} else if(1301 <= dt && dt <= 1630) {
		valMealTime = "13";
	} else if(1631 <= dt && dt <= 1930) {
		valMealTime = "14";
	} else if(1931 <= dt && dt <= 2130) {
		valMealTime = "15";
	} else if(2131 <= dt && dt <= 2359) {
		valMealTime = "16";
	}
	var startDate=formatDate(new Date());
	$("input[name='mealtime']").each(function() {
		if($(this).val() == valMealTime) {
			$(this).prop("checked", "checked");
			// console.log($(this).val());
		}
	})
	getRange(getRecordMeals($('input[name="mealtime"]:checked').val()));
	getLevel(getRecordMeals($('input[name="mealtime"]:checked').val()),Number($("#inputGlu").val()));
	$.ajax({
		url: requestUrl + '/litapp/bldglucose/table/' + userid + '?startDate=' + startDate + '&endDate=' + startDate,
		dataType: 'json',
		type: 'post',
		contentType: 'application/json',
		success: function (res) {
			var name=$("input[name='mealtime']:checked").data('name');
			if(res.dataSize>=1){
				var data=res.data[0];
				if(name!=='random'){
					if(data[name]){
						$("input[name='mealtime'][value='18']").prop('checked',true);
						getRange(getRecordMeals($('input[name="mealtime"]:checked').val()));
						getLevel(getRecordMeals($('input[name="mealtime"]:checked').val()),Number($("#inputGlu").val()));
					}
				}
			}
		},
	})
	
	
}

//根据餐次显示默认时间
function setTime(meal) {
	switch(meal) {
		case "17":
			$('#recordTime').text($('#recordTime').text().substr(0, 11) + "02:30");
			break;
		case "10":
			$('#recordTime').text($('#recordTime').text().substr(0, 11) + "06:30");
			break;
		case "11":
			$('#recordTime').text($('#recordTime').text().substr(0, 11) + "09:30");
			break;
		case "12":
			$('#recordTime').text($('#recordTime').text().substr(0, 11) + "11:30");
			break;
		case "13":
			$('#recordTime').text($('#recordTime').text().substr(0, 11) + "14:00");
			break;
		case "14":
			$('#recordTime').text($('#recordTime').text().substr(0, 11) + "18:00");
			break;
		case "15":
			$('#recordTime').text($('#recordTime').text().substr(0, 11) + "20:00");
			break;
		case "16":
			$('#recordTime').text($('#recordTime').text().substr(0, 11) + "22:00");
			break;

	}
}

//显示餐次默认时间
function MealDefaultTime(meal) {
	var time;
	switch(meal) {
		case "10":
			time = "02:30";
			break;
		case "11":
			time = "06:30";
			break;
		case "12":
			time = "09:30";
			break;
		case "13":
			time = "11:30";
			break;
		case "14":
			time = "14:00";
			break;
		case "15":
			time = "18:00";
			break;
		case "16":
			time = "20:00";
			break;
		case "17":
			time = "22:00";
			break;

	}
	return time;
}

// $("input[name='mealtime']").click(function() {
// 	
// 	setTime($("input[name='mealtime']:checked").val());
// })

function updateInfo(userCode, sex, age, height, weight, diabetesType, intensity, callBack) {
	var para = {};
	para.userid = userid;
	if(userCode != ""){
		para.code = userCode;
	}
	sex ? para.sex = sex : '';
	age ? para.age = age : '';
	height ? para.height = height : '';
	weight ? para.weight = weight : '';
	diabetesType ? para.diabetesType = diabetesType : '';
	intensity ? para.intensity = intensity : '';

	$.ajax({
		type: "post",
		url: requestUrl + "/litapp/user/update",
		async: true,
		dataType: "json",
		contentType: "application/json",
		data: JSON.stringify(para),
		success: callBack
	});
}

function getRecordMeals(meal) {
	var mealtime;
	if(meal == "17") {
		//凌晨
		mealtime = "0";
	}else if(meal == "10"){
		mealtime ='4'
	} else if( meal == "12" || meal == "14") {
		//空腹餐前
		mealtime = "1";
	} else if(meal == "11" || meal == "13" || meal == "15" || meal == "18") {
		//餐后
		mealtime = "2";
	} else if(meal == "16") {
		//睡前
		mealtime = "3";
	}
	return Number(mealtime);
}
var bldGluList,targetGLuList;
var careGluList=[
	{
		levelCode:"FPG001",
		mealTime:0,
		valueFloor:0,
		valueUpper:4.5
	},
	{
		levelCode:"FPG003",
		mealTime:0,
		valueFloor:4.5,
		valueUpper:9.0
	},
	{
		levelCode:"FPG006",
		mealTime:0,
		valueFloor:9.0,
		valueUpper:33.0
	},
	{	levelCode:"FPG001",
		mealTime:1,
		valueFloor:0,
		valueUpper:5.0
	},
	{	levelCode:"FPG003",
		mealTime:1,
		valueFloor:5.0,
		valueUpper:8.0
	},
	{	levelCode:"FPG006",
		mealTime:1,
		valueFloor:8.0,
		valueUpper:33.0
	},
	{	levelCode:"FPG001",
		mealTime:2,
		valueFloor:0,
		valueUpper:5.0
	},
	{	levelCode:"FPG003",
		mealTime:2,
		valueFloor:5.0,
		valueUpper:10.0
	},
	{	levelCode:"FPG006",
		mealTime:2,
		valueFloor:10.0,
		valueUpper:33.0
	},
	{	levelCode:"FPG001",
		mealTime:3,
		valueFloor:0,
		valueUpper:6.7
	},
	{	levelCode:"FPG003",
		mealTime:3,
		valueFloor:6.7,
		valueUpper:10.0
	},
	{	levelCode:"FPG006",
		mealTime:3,
		valueFloor:10.0,
		valueUpper:33.0
	}]
$.ajax({
	type: "post",
	url: requestUrl + "/litapp/user/user/" + userid,
	async: true,
	dataType: "json",
	success: function(data) {
		if(data.code=='0'){
			if(data.data.isCare){
				isCare=data.data.isCare;
				localStorage.setItem('isCare',isCare);
			}else{
				isCare=data.data.isCare;
				localStorage.setItem('isCare',isCare);
			}
			bldGluList = data.data.bldGluList;
		}
		
	}
});
$.ajax({
	url: requestUrl + '/litapp/goal/get/'+userid,
	dataType: 'json',
	type: 'post',
	contentType: 'application/json',
	success: function (res) {
		if(res.code=='0'){
			targetGLuList=res.data
		}
	},

});
function getLevel(mealTime, val) {
	var levelCode;
	var isCare=localStorage.getItem('isCare');
	if(targetGLuList){
		for(var i = 0; i < targetGLuList.length; i++) {
			if(!targetGLuList[i].recordValueFloor){
				targetGLuList[i].recordValueFloor=4.0
			}
			if(!targetGLuList[i].recordValueUpper){
				targetGLuList[i].recordValueUpper=6.0

			}
			switch (mealTime) {
				case 0: //凌晨
					if(targetGLuList[i].goalName=='凌晨'){
						if(val<targetGLuList[i].recordValueFloor){
							levelCode='FPG001'
						}else if(val>targetGLuList[i].recordValueUpper){
							levelCode='FPG006'
						}else{
							levelCode='FPG003'
						}
					}
				break;
				case 4: //空腹
					if(targetGLuList[i].goalName=='空腹'){
						if(val<targetGLuList[i].recordValueFloor){
							levelCode='FPG001'
						}else if(val>targetGLuList[i].recordValueUpper){
							levelCode='FPG006'
						}else{
							levelCode='FPG003'
						}
					}
				break;
				case 1: //餐前
					if(targetGLuList[i].goalName=='餐前'){
						if(val<targetGLuList[i].recordValueFloor){
							levelCode='FPG001'
						}else if(val>targetGLuList[i].recordValueUpper){
							levelCode='FPG006'
						}else{
							levelCode='FPG003'
						}
					}
				break;
				case 2: //餐后
					if(targetGLuList[i].goalName=='餐后'){
						console.log(val,targetGLuList[i].recordValueFloor,'getLevel')
						if(val<targetGLuList[i].recordValueFloor){
							levelCode='FPG001'
						}else if(val>targetGLuList[i].recordValueUpper){
							levelCode='FPG006'
						}else{
							levelCode='FPG003'
						}
					}
				break;
				case 3: //睡前
					if(targetGLuList[i].goalName=='睡前'){
						if(val<targetGLuList[i].recordValueFloor){
							levelCode='FPG001'
						}else if(val>targetGLuList[i].recordValueUpper){
							levelCode='FPG006'
						}else{
							levelCode='FPG003'
						}
					}
				break;
			}
		}
	}
	else if(bldGluList) {
		if(isCare){
			for(var i = 0; i < careGluList.length; i++) {
				if(mealTime == careGluList[i].mealTime && (val >= careGluList[i].valueFloor && val <= careGluList[i].valueUpper)) {
					levelCode = careGluList[i].levelCode;
				}
			}
		}else{
			for(var i = 0; i < bldGluList.length; i++) {
				if(mealTime == bldGluList[i].mealTime && (val >= bldGluList[i].valueFloor && val <= bldGluList[i].valueUpper)) {
					levelCode = bldGluList[i].levelCode;
				}
			}
		}
		
	}else{
		levelCode="FPG003";
	}
return levelCode;
}

function getRange(mealTime) {
	
	var lowest=0,heightest=0;
	if(targetGLuList){
		console.log(mealTime)
		for(var i = 0; i < targetGLuList.length; i++) {
			if(!targetGLuList[i].recordValueFloor){
				targetGLuList[i].recordValueFloor=4.0
			}
			if(!targetGLuList[i].recordValueUpper){
				targetGLuList[i].recordValueFloor=6.0

			}
			switch (mealTime) {
				case 0: //凌晨
					if(targetGLuList[i].goalName=='凌晨'){
						lowest = targetGLuList[i].recordValueFloor;
						heightest = targetGLuList[i].recordValueUpper;
					}
				break;
				case 4: //空腹
					if(targetGLuList[i].goalName=='空腹'){
						lowest = targetGLuList[i].recordValueFloor;
						heightest = targetGLuList[i].recordValueUpper;
					}
				break;
				case 1: //餐前
					if(targetGLuList[i].goalName=='餐前'){
						lowest = targetGLuList[i].recordValueFloor;
						heightest = targetGLuList[i].recordValueUpper;
					}
				break;
				case 2: //餐后随机
					if(targetGLuList[i].goalName=='餐后'){
						lowest = targetGLuList[i].recordValueFloor;
						heightest = targetGLuList[i].recordValueUpper;
					}
				break;
				case 3: //睡前
					if(targetGLuList[i].goalName=='睡前'){
						lowest = targetGLuList[i].recordValueFloor;
						heightest = targetGLuList[i].recordValueUpper;
					}
				break;
			}
		}
		
		$("#valRange").text($("input[name='mealtime']:checked +label").text()+"目标："+lowest.toFixed(1)+"~"+heightest.toFixed(1));
	}else if(bldGluList) {
		
		if(isCare){
			for(var i = 0; i < careGluList.length; i++) {
				if(mealTime == careGluList[i].mealTime &&  careGluList[i].levelCode=="FPG003") {
					lowest = careGluList[i].valueFloor;
					heightest = careGluList[i].valueUpper;
				}
			}
		}else{
			for(var i = 0; i < bldGluList.length; i++) {
				if(mealTime == bldGluList[i].mealTime &&  bldGluList[i].levelCode=="FPG003") {
					lowest = bldGluList[i].valueFloor;
					heightest = bldGluList[i].valueUpper;
				}
			}
		}
		
		$("#valRange").text($("input[name='mealtime']:checked +label").text()+"目标："+lowest.toFixed(1)+"~"+heightest.toFixed(1));
	}else{
		$("#valRange").text($("input[name='mealtime']:checked +label").text()+"目标：4.0~6.0");
		
	}
//	console.log(lowest.toFixed(1)+"~"+heightest.toFixed(1));
}
$("input[name='mealtime']").click(function(){
	getRange(getRecordMeals($("input[name='mealtime']:checked").val()));
	var level=getLevel(getRecordMeals($('input[name="mealtime"]:checked').val()),Number($("#inputGlu").val()));
	$(".canvas-content").removeClass("lanpan jupan hongpan");
	if (level == "FPG001" || level == "FPG002") {
		$(".canvas-content").addClass("hongpan");
	} else if (level == "FPG003") {
		$(".canvas-content").addClass("lanpan");
	} else if (level == "FPG004" || level == "FPG005" || level == "FPG006") {
		$(".canvas-content").addClass("jupan");
	} else {
		$(".canvas-content").addClass("lanpan");
	}
})

 var Terminal = {
        // 辨别移动终端类型
        platform : function(){
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                // android终端或者uc浏览器
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                // 是否为iPhone或者QQHD浏览器
                iPhone: u.indexOf('iPhone') > -1 ,
                // 是否iPad
                iPad: u.indexOf('iPad') > -1,

            };
        }(),
        // 辨别移动终端的语言：zh-cn、en-us、ko-kr、ja-jp...
        language : (navigator.browserLanguage || navigator.language).toLowerCase()
    }
//Terminal.platform.iPhone;//Terminal.platform.android



			

function preloadImg(arr) {
	var imgWrap = [];
	for(var i =0; i< arr.length ;i++) {
		imgWrap[i] = new Image();
		imgWrap[i].src = arr[i];
	}
}
