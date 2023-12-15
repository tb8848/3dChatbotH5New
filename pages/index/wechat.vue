<template>
	<view style="height: 100%;background: #f9fbf8;padding-top: 15px;">
		<view style="display: flex;flex-direction: column;width: 100%;height: 100%;">
			<view style="overflow: auto;display: flex;flex-wrap: wrap;margin: 0 auto;" v-if="isLogin==1">
				<view class="list-item">
					<view class="item-image">
						<image :src="icon"></image>
					</view>
					<view class="item-name">
						<view class="item-username">{{username}}</view>
					</view>
					<view class="item-button">
						<view style="display: flex;justify-content: center;align-items: center;">
							<view class="item-online" v-if="status==1">
								<view class="item-online-icon">
									<image class="icon" src="../../static/images/online.png"></image>
								</view>
								在线
							</view>
							<view class="item-offline" v-if="status==2">
								<view class="item-online-icon">
									<image class="icon" src="../../static/images/offline.png"></image>
								</view>
								离线
							</view>
							<view class="logout" @click="logout()" v-if="status==1">
								<view class="logout-icon">
									<image class="icon" src="../../static/images/share1.png"></image>
								</view>
								退出
							</view>
							<view class="logout" @click="del()" style="background: rgb(224, 74, 72);" v-if="status==0">
								<view class="logout-icon">
									<image class="icon" src="../../static/images/delete.png"></image>
								</view>
								删除
							</view>
							<view class="logout" @click="scanQr()" v-if="status==2">
								<view class="logout-icon">
									<image class="icon" src="../../static/images/scanCode.png"></image>
								</view>
								扫码
							</view>
							<view class="logout" @click="wakeUp()" v-if="status==2">
								<view class="logout-icon">
									<image class="icon" src="../../static/images/wakeUp.png"></image>
								</view>
								唤醒
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="blueTips">
				<view class="blueTipsImage">
					<image src="../../static/images/blueTips.png" class="icon"></image>
				</view>
				<view>掉线后需重新扫码登录或唤醒</view>
			</view>
			<view class="redTips">
				<view class="blueTipsImage">
					<image src="../../static/images/redTips.png" class="icon"></image>
				</view>
				<view>切记不要删除微信，删除了等于在新的设备登录容易被风<br>控检测导致封号</view>
			</view>
			<view class="wxButton" @click="wxLogin()">
				<button class="loginButton">
					<view class="wxButtonIcon">
						<image src="../../static/images/weixin-w.png" class="icon"></image>
					</view>
					微信登录
				</button>
			</view>
		</view>
		
		<uni-popup ref="weixinLogin" type="center" background-color="#fff" :mask-click="true">
			<view style="width: 351px;">
				<view style="padding-top: 24px;font-size: 20px;text-align: center;">二维码登录</view>
				<view style="width: 100%;padding: 4px 0 25px 0;font-size: 12px;color: #333;">
					<view style="position: relative;display: flex;justify-content: center;align-items: center;">
						<image :src="qrcodeURL" style="width: 130px;height: 130px;"></image>
					</view>
					<view style="margin-top: 6px;padding-left: 20px;">1.请用另一台设备（可让身边好友帮忙）拍摄二维码</view>
					<view style="margin-top: 14px;padding-left: 20px;">2.再用微信“扫一扫”对着另一台设备拍摄的二维码扫码</view>
					<view style="margin-top: 40px;display: flex;align-items: center;padding-left: 20px;">
						<view style="width: 18px;height: 16px;">
							<image src="../../static/images/jingao.png" style="width: 100%;height: 100%;"></image>
						</view>
						<text style="margin-left: 7px;color: #ff7900;">不支持微信内截图/长按识别扫码</text>
					</view>
					<view style="margin: 12px 0 10px 0;padding-left: 20px;">小提示：</view>
					<view style="line-height: 22px;padding-left: 20px;">1.扫码后，扫码微信号将变成机器人（不影响微信号正常使用）</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { getResponseData, showToastTip,getBaseUrl,getWsUrl,getWechatyApiUrl} from "@/config/req.js";
	import Qr from '@/components/wxqrcode/wxqrcode.js'
	import websocket from '@/static/js/socket/websocket-uni.js';
	export default {
		data() {
			return {
				icon:"http://128.1.32.34/static/img/thumb/pic-392.jpg",//头像
				username:"小笼包",
				status:2,//1:在线  2:离线
				qrcodeURL:"",//微信登录二维码
				isLogin:0,//0：未登录   1：已登录,
				userId:'',
				ipadToken:'',
				wsInit:false,
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getIpadToken();
		},
		methods: {
			
			getQrCode(){//获取登录二维码
				const that = this;
				uni.request({
					url:getWechatyApiUrl()+"/login?token="+that.ipadToken+"&userId="+that.userId,
					method:"GET",
					header:{
						"Content-Type":"application/json;charset=utf-8",
					},
					fail:(e)=> {},
					success: (res) => {},
					complete: () => {}
				})		
			},
			startWS(){
				var that = this;
				if(this.userId!=null && this.userId!=""){
					if(websocket.baseURL==""){
						var wsurl = getWsUrl();
						var url = wsurl+"?token="+uni.getStorageSync("token");
						function subscribe(client){
							client.subscribe('/topic/wechat/'+that.userId, function(e){
								const msgBody = e.body;
								console.log("============收到消息：",msgBody);
								const msgObj = JSON.parse(msgBody);
								  
								  //const msgBody = JSON.parse(e.body);
								if(msgObj.code==0){
									if(msgObj.data.flag=="scan"){
										var qrcodeUrl = msgObj.data.qrcodeUrl;
										console.log("二维码地址；",qrcodeUrl);
										if(null!=qrcodeUrl){
											that.qrcodeURL = Qr.createQrCodeImg(qrcodeUrl,{
												typeNumber : 8
											})
										}
									}else if(msgObj.data.flag=="login"){
										//扫码登录成功
										that.username = msgObj.data.wxName;
										that.icon = msgObj.data.wxAvatar;
										that.status = msgObj.data.wxStatus;
										that.isLogin = 1;	
										that.$refs.weixinLogin.close();									
									}else if(msgObj.data.flag=="logout"){
										//退出登录										
										that.isLogin = 0;
										that.status = 0;
									}else if(msgObj.data.flag=="offline"){
										//离线										
										that.isLogin = 1;
										that.status = 2;
									}else if(msgObj.data.flag=="rescan"){
										//唤醒失败，重新扫码登录
										uni.showToast({
											title:"唤醒失败，重新扫码登录",
											icon:'none'
										})
										that.isLogin = 0;
										that.status = 0;
									}
								}								  
							});																											
						}							
						if(!websocket.isConnect){
							websocket.init(url).then(client => {
								//执行订阅函数
								console.log("========================exec subscribe 1");
								websocket.execSubscrip(subscribe);					
							});   
						}	
						
					}else{
						websocket.isInitiative=false;
						websocket.reconnect();
					}			
				}	
			},
			closeWs(){
				if(websocket.isConnect){
					websocket.disconnect();
					uni.$off("drawOpenStatus");       
					uni.setStorageSync("wsStarted",0);
				}		
			},
			getIpadToken(){
				const that = this;
				getResponseData("/wechat/getToken",'get',{},function(res){
					if(res.code==0){
						that.userId = res.data.botUserId;
						that.ipadToken = res.data.ipadToken;
						if(res.data.wxStatus==1 || res.data.wxStatus==2){
							//已登录
							that.username = res.data.wxName;
							that.icon = res.data.wxAvatar;
							that.status = res.data.wxStatus;
							that.isLogin = 1;								
						}else if(res.data.wxStatus==0){
							that.isLogin = 0;
							//未登录
							//存在可用的token
							//调用wechaty 本地接口生成二维码
							//that.ipadToken = res.data.ipadToken;
							//that.userId = res.data.botUserId;							
						}	
						if(!that.wsInit){
							that.wsInit = true;
							that.startWS();	
						}
						
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
						//showToastTip();	
					}
				})
			},
			wxLogin(){
				this.$refs.weixinLogin.open();
				this.getQrCode();
			},
			logout(){				
				const that = this;
				uni.request({
					url:getWechatyApiUrl()+"/logout?userId="+that.userId,
					method:"GET",
					header:{
						"Content-Type":"application/json;charset=utf-8",
					},
					fail:(e)=> {},
					success: (res) => {
						
					},
					complete: () => {}
				})	
			},
			del(){
				uni.showLoading({
					title:"正在删除...",
					mask:true
				})
				const that = this;
				uni.request({
					url:getWechatyApiUrl()+"/del?userId="+that.userId,
					method:"GET",
					header:{
						"Content-Type":"application/json;charset=utf-8",
					},
					fail:(e)=> {},
					success: (res) => {
						
					},
					complete: () => {
						uni.hideLoading();
					}
				})
			},
			scanQr(){
				this.$refs.weixinLogin.open();
			},
			wakeUp(){
				const that = this;
				uni.showToast({
					title:"请前往手机微信确认登录",
					icon:'none'
				})
				uni.request({
					url:getWechatyApiUrl()+"/wakeUp?userId="+that.userId,
					method:"GET",
					header:{
						"Content-Type":"application/json;charset=utf-8",
					},
					fail:(e)=> {},
					success: (res) => {
						
					},
					complete: () => {
						uni.hideLoading();
					}
				})
			}
		},
		
	}
</script>

<style>
	page{
		background-color: #f9fbf8;
	}
	/deep/.uni-popup .uni-popup__wrapper {
		border-radius: 20rpx;
		margin: 0 auto;
	}
	.list-item{
		width: 351px;
		background: #fff;
		border-radius: 12px 12px 12px 12px;
		opacity: 1;
		margin: 8px;
	}
	.item-image{
		width: 66px;
		height: 66px;
		margin: 46px auto 19px;
		border-radius: 6px 6px 6px 6px;
		opacity: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.item-image image{
		width: 66px;
		height: 66px;
		border-radius: 6px;
		will-change: transform;
		display: inline-block;
		overflow: hidden;
		position: relative;
	}
	.item-name{
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #333;
	}
	.item-username{
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		max-width: 200px;
		font-size: 20px;
		color: #333;
		font-weight: bolder;
	}
	.item-button{
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 19px 8px 15px;
		padding: 10px 0;
	}
	.item-online{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 61px;
		height: 34px;
		background: #d7fbe9;
		color: #41ac76;
		border-radius: 6px 6px 6px 6px;
		margin-right: 18px;
		font-size: 14px;
	}
	.item-offline{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 61px;
		height: 34px;
		background: #e8e8e8;
		border-radius: 6px 6px 6px 6px;
		margin-right: 10px;
		font-size: 14px;
		color: #303133;
	}
	.item-online-icon{
		width: 13px;
		height: 13px;
		border-radius: 0px;
		overflow: visible;
		opacity: 1;
		transition: opacity 0.5s ease-in-out 0s;
		font-size: 0px;
		background-color: transparent;
		position: relative;
		margin-right: 5px;
	}
	.logout{
		background: rgb(46, 97, 238);
		width: 38px;
		height: 34px;
		border-radius: 4px;
		margin-right: 10px;
		font-size: 10px;
		text-align: center;
		color: #fff;
	}
	.logout-icon{
		width: 12px;
		height: 12px;
		border-radius: 0px;
		overflow: visible;
		opacity: 1;
		transition: opacity 0.5s ease-in-out 0s;
		font-size: 0px;
		margin: 4px auto 0px;
		background-color: transparent;
		position: relative;
	}
	.icon{
		border-radius: 0px;
		width: 100%;
		height: 100%;
		will-change: transform;
		display: inline-block;
		overflow: hidden;
		position: relative;
	}
	.blueTips{
		display: flex;
		align-items: center;
		width: 351px;
		height: 40px;
		background: #d5dfff;
		border-radius: 6px 6px 6px 6px;
		opacity: 1;
		margin: auto;
		color: #2e61ee;
		font-size: 12px;
		padding-left: 13px;
		margin-top: 5px;
		margin-bottom: 12px;
		box-sizing: border-box;
	}
	.blueTipsImage{
		width: 14px;
		height: 14px;
		border-radius: 0px;
		overflow: visible;
		opacity: 1;
		transition: opacity 0.5s ease-in-out 0s;
		font-size: 0px;
		background-color: transparent;
		position: relative;
		margin-right: 7px;
	}
	.redTips{
		display: flex;
		align-items: baseline;
		width: 351px;
		height: 63px;
		line-height: 24px;
		background: #ffd5d5;
		border-radius: 6px 6px 6px 6px;
		opacity: 1;
		margin: auto;
		color: #e04a48;
		font-size: 12px;
		padding: 8px 0 0 13px;
		margin-bottom: 12px;
		box-sizing: border-box;
	}
	.wxButton{
		width: 319px;
		height: 50px;
		background: #41ac76;
		border-radius: 12px 12px 12px 12px;
		opacity: 1;
		margin: auto;
	}
	.loginButton{
		overflow: visible;
		background: #41ac76;
		height: 50px;
		line-height: 50px;
		font-size: 15px;
		color: #fff;
		border-color: #2979ff;
		position: relative;
		border: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		padding: 0 20px;
		z-index: 1;
		box-sizing: border-box;
		transition: all .15s;
	}
	.wxButtonIcon{
		width: 23px;
		height: 23px;
		border-radius: 0px;
		overflow: visible;
		opacity: 1;
		transition: opacity 0.5s ease-in-out 0s;
		font-size: 0px;
		background-color: transparent;
		position: relative;
		margin-right: 7px;
		box-sizing: border-box;
	}
</style>
