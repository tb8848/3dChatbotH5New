//const baseUrl = "http://10.11.122.233:9998/vip"
//const baseUrl = "http://45.195.145.20:9998/vip"
//const wsUrl = "ws://45.195.145.20:8086/app"

//生产
const baseUrl = "https://vip.3dp3aabb.com:9792/bot";
const wsUrl = "wss://vip.3dp3aabb.com:9794/app";
const host = "http://vip.3dp3aabb.com:9792";
const wechaty_api_url="http://vip.3dp3aabb.com:9794/bot";
const mainUrl = "https://hn3dhn01hk.com:8888";//总后台地址（盘口域名检测）

// const baseUrl = "https://vip.colourswin.com:9192/bot";
// const wsUrl = "wss://vip.colourswin.com:9194/app";
// const host = "http://vip.colourswin.com:9192";
// const wechaty_api_url="http://vip.colourswin.com:9194/bot";
// const mainUrl = "http://hn3dhn01hk.com:8888";//总后台地址（盘口域名检测）

//本地
// const baseUrl = "http://192.168.10.41:9192/bot";
// const wsUrl = "ws://192.168.10.41:9194/app";
// const host = "http://192.168.10.41:9192";
// const wechaty_api_url="http://192.168.10.41:9194/bot";
// const mainUrl = "http://127.0.0.1:8888";//总后台地址（盘口域名检测）http://192.168.1.94:8888

const forMatUrl = "https://3dp3.3dp3jian2.xyz";//https://vip.colourswin.com

export function getResponseData(url,method,params,successCallback) {
 
  if(method=='GET' || method=='get'){
	  let newurl = url + "?";
	  for (const propName of Object.keys(params)) {
	    const value = params[propName];
	    var part = encodeURIComponent(propName) + "=";
	    if (value !== null && typeof value !== "undefined") {
	      if (typeof value === "object") {
	        for (const key of Object.keys(value)) {
	          let params = propName + "[" + key + "]";
	          var subPart = encodeURIComponent(params) + "=";
	          newurl += subPart + encodeURIComponent(value[key]) + "&";
	        }
	      } else {
	        newurl += part + encodeURIComponent(value) + "&";
	      }
	    }
	  }
	  newurl = newurl.slice(0, -1);
	  url = newurl;
	  params = {}
  }
  const token = uni.getStorageSync("token");
  const lang = uni.getStorageSync("lang");
  if(token==null || token=="" || token==undefined){
	  uni.redirectTo({
	  	url:"/pages/login"
	  })
  }
  //console.log("url======",baseUrl + url);
  //console.log("params======",params);
  uni.request({
	url:baseUrl + url,
	method:method.toUpperCase(),
	data:params,
	fail:(e)=> {
		uni.hideLoading();
		//showToastTip("网络错误")
	},
	header:{
		"Content-Type":"application/json;charset=utf-8",
		"token":token,
		"lang":lang=='tai'?'th':'zh'
	},
	success: (e) => {
		const data = e.data;
		//console.log("resp======",data);
		if(data.code==500){
			uni.showToast({
				title:data.msg,
				duration:3000,
				icon:"error"
			})
			
		}else if(data.code==403){
			uni.setStorageSync("token","");
			const err={
				code:2,
				msg:'会话失效，请重新登录',
				title:'登录提示'
			}			
			uni.redirectTo({
				url:"/pages/login?qs="+encodeURIComponent(JSON.stringify(err))
			})
		}else{
			successCallback(data);
		}
		
	},
	complete: () => {
		uni.hideLoading()
	}
  })
}


export function showToastTip(msg){
	// plus.nativeUI.toast(msg,{
	// 	'verticalAlign':'bottom'
	// })
	uni.showToast({
		title:msg,
		icon:'error'
	})
}

// export function showToastTip(msg,options){
// 	plus.nativeUI.toast(msg,{
// 		'verticalAlign':options.verticalAlign
// 	})
// }

export function getBaseUrl(){
	return baseUrl;
}

export function getWsUrl(){
	return wsUrl;
}

export function getHost(){
	return host;
}

export function getWechatyApiUrl(){
	return wechaty_api_url;
}

export function getForMatUrl(){
	return forMatUrl;
}

export function getMainUrl(){
	return mainUrl;
}