let socketOpen = false;let socketMsgQueue = [];

import {getStomp} from './stomp.js';export default {	  client: null,	  baseURL: '',	  data : null,      isCreate : false,// WebSocket 是否创建成功      isConnect : false,// 是否已经连接      isInitiative :false,// 是否主动断开      timeoutNumber :3, // 心跳检测间隔      heartbeatTimer : null, // 心跳检测定时器      reconnectTimer :null, // 断线重连定时器      socketExamples: null, // websocket实例      againTime :3, // 重连等待时间(单位秒)
	  subscriptions:[],
	  stomp:null,  init(url) {	      if (this.client) {      return Promise.resolve(this.client);    }	if (url)	this.baseURL = url;    	let that = this;    return new Promise((resolve, reject) => {      const ws = {        send: this.sendMessage,        onopen: null,        onmessage: null,        close: this.closeSocket,      };      uni.connectSocket({           url: this.baseURL,             });                       uni.onSocketOpen(function(res) {        console.log('WebSocket连接已打开！', res);        that.isCreate = true;        socketOpen = true;		that.isConnect = true		clearInterval(that.heartbeatTimer)		clearTimeout(that.reconnectTimer)		// 打开心跳检测		that.heartbeatCheck();				                          ws.onopen && ws.onopen();
		
		for (let i = 0; i < socketMsgQueue.length; i++) {
		  ws.send(socketMsgQueue[i]);
		}
		socketMsgQueue = [];      });      uni.onSocketMessage(function(res) {        ws.onmessage && ws.onmessage(res);      });      uni.onSocketError(function(res) {         console.log('WebSocket 错误！', res);		that.client.disconnect();		that.client = null;		socketOpen = false;		that.isConnect = false		that.reconnect();//重连		      });      uni.onSocketClose((res) => {        this.client.disconnect();        this.client = null;        socketOpen = false;		        console.log('WebSocket 已关闭！', res);      });      //const Stomp = require('./stomp').Stomp;
	  // if(null == stomp){
		 //  this.stomp = getStomp();
	  // }
	  const Stomp = getStomp();      Stomp.setInterval = function(interval, f) {        return setInterval(f, interval);      };      Stomp.clearInterval = function(id) {        return clearInterval(id);      };            const client = this.client = Stomp.over(ws);
	  console.log(client);
      client.connect({}, function() {        console.log('---------stomp connected----------------');        resolve(client);      });    });  },  disconnect() {     const _this = this	 uni.closeSocket();	 _this.data = null	        _this.isCreate = false	        _this.isConnect = false	        _this.isInitiative = true	        _this.socketExamples = null	clearInterval(_this.heartbeatTimer)	clearTimeout(_this.reconnectTimer)	console.log('关闭 WebSocket 成功')  },  sendMessage(message) {    if (socketOpen) {      uni.sendSocketMessage({        data: message,      });    } else {      socketMsgQueue.push(message);    }  },  closeSocket() {    console.log('closeSocket');  },  // 开启心跳检测     heartbeatCheck() {      console.log('开启心跳')      this.data = { state: 1, method: 'heartbeat' }      this.heartbeatTimer = setInterval(() => {        this.sendMessage(this.data)      }, this.timeoutNumber * 1000)    }  ,    // 重新连接    reconnect() {      // 停止发送心跳
	  var that = this;      clearTimeout(this.reconnectTimer)      clearInterval(this.heartbeatTimer)
	  socketMsgQueue.length = 0;      // 如果不是人为关闭的话，进行重连      if (!this.isInitiative) {
	    console.log('重连中...')        this.reconnectTimer = setTimeout(() => {          that.init().then(function(c){
			  that.client = c;
			  that.subscriptions.forEach(function(f) {
			      f(c);
			  });
		  });        }, this.againTime * 1000)      }    },  //执行订阅函数    execSubscrip(fun){
		var funExsist = false;
		this.subscriptions.forEach(function(e){
		if (e.toString()==subscribe.toString())
		 {
			  funExsist = true;
														 
		 }
		});
		
		if (funExsist==false)
		{
							//把订阅保存到数组
							this.subscriptions.push(fun);
							
							//执行订阅
							fun(this.client);	  	
		}
								             
		
	}}



