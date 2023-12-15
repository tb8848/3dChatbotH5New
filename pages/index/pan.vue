<template>
	<view>
		<view v-if="isLogin" class="login-success">
			<view style="padding-top: 132px;"></view>
			<view class="account-bg">
				<view style="font-size: 14px;display: flex;justify-content: space-between;align-items: center;">
					<view></view>
					<view class="logout" @click="logout()">
						退出登录
						<image src="../../static/images/share.png" style="width: 14px;height: 13px;left: 1px;"></image>
					</view>
				</view>
				<view class="username">{{username}}</view>
				<view style="padding: 14px;font-size: 14px;display: flex;align-items: center;color: #57311e;;">
					<view style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;flex: 1;">
						<view style="margin-bottom: 7px;">
							盘口额度
						</view>
						<view class="pked">{{pked}}</view>
					</view>
					<view style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;flex: 1;padding-left: 10px;">
						<view style="margin-bottom: 7px;">
							盘口回水
						</view>
						<view class="pked">{{pkhs}}</view>
					</view>
					<view style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;flex: 1;padding-left: 10px;">
						<view style="margin-bottom: 7px;">
							盘口盈亏
						</view>
						<view class="pked">{{pkyk}}</view>
					</view>
				</view>
			</view>
			<view style="height: 12px;"></view>
			<view class="wc-bg card-wrap">
				<view style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 17px;box-sizing: border-box;">
					<view style="font-size: 18px;color: #2e61ee;font-weight: bolder;box-sizing: border-box;">福彩3D</view>
					<view style="font-size: 15px;box-sizing: border-box;color: #303133;">期号：{{issue}}</view>
				</view>
				<view style="display: flex;align-items: center;margin-bottom: 17px;justify-content: space-around;">
					<view class="code-bar">{{num1}}</view>
					<view class="code-bar">{{num2}}</view>
					<view class="code-bar">{{num3}}</view>
				</view>
				<view style="display: flex;justify-content: space-between;align-items: center;box-sizing: border-box;font-size: 14px;color: #303133;">
					更新时间：{{updateTime}}
				</view>
			</view>
			
			<!-- 提示窗 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog confirmText="确认" cancelText="取消" title="提示" content="是否退出网盘？" @confirm="dialogConfirm"
					@close="dialogClose"></uni-popup-dialog>
			</uni-popup>
		</view>
		<view class="notLogin" v-else>
			<view style="height: 140px;"></view>
			<view class="input">
				<view style="display: flex;align-items: center;">
					<image src="../../static/images/website.png" style="width: 20px;height: 20px;will-change: transform;"></image>
					<input class="urlInput" placeholder="请输入网址" v-model="website" />
				</view>
			</view>
			<view class="input">
				<view style="display: flex;align-items: center;">
					<image src="../../static/images/username.png" style="width: 20px;height: 20px;will-change: transform;"></image>
					<input class="urlInput" placeholder="请输入账号" v-model="username" />
				</view>
			</view>
			<view class="input">
				<view style="display: flex;align-items: center;">
					<image src="../../static/images/password.png" style="width: 20px;height: 20px;will-change: transform;"></image>
					<input type="password" class="urlInput" placeholder="请输入密码" v-model="password" @confirm="huiche" />
				</view>
			</view>
			<view class="loginBtn" @click="loginBtn">登录</view>
		</view>
	</view>
</template>

<script>
	import { playMusic, stopMusic} from "@/config/music.js";
	import { getResponseData, showToastTip} from "@/config/req.js";
	export default {
		data() {
			return {
				username:"",			//用户名
				pked:"0",				//盘口额度
				pkhs:"0",				//盘口回水
				pkyk:"0",				//盘口盈亏
				issue:"",				//期号
				num1:"",
				num2:"",
				num3:"",
				updateTime:"",			//更新时间
				isLogin:false,			//是否登录
				website:"",				//网址
				password:"",			//密码
			}
		},
		onShow() {
			stopMusic();
			this.website = "https://aa.3d11aa.com:9092/";
			this.verifyBotUserExpire();
			// var pkToken = uni.getStorageSync("pkToken");
			// if(pkToken!=null && pkToken!="" && pkToken!=undefined){
			// 	this.isLogin = true;
			// 	this.getDrawInfo();
			// }else{
				this.isRobotLogin();
			// }
		},
		methods: {
			huiche(){
				this.loginBtn();
			},
			//校验机器人是否过期
			verifyBotUserExpire(){
				getResponseData("/user/verifyBotUserExpire",'POST',{},function(res){
					if(res.code == 0){
						uni.navigateTo({
							url:"../login"
						})
					}
				})
			},
			//判断盘口是否登录
			isRobotLogin(){
				const that = this;
				getResponseData("/robot/isRobotLogin",'POST',"",function(res){
					if(res.code==0){	
						that.isLogin = true;
						that.username = res.data.loginName;
						uni.setStorageSync('pkToken',res.data.login3dToken);
						that.getDrawInfo();
					}
				})	
			},
			logout(){
				this.$refs.alertDialog.open();
			},
			dialogConfirm(){
				uni.showLoading({
					title:"正在退出...",
					mask:true
				})
				const that = this;
				getResponseData("/robot/logout",'POST',{},function(res){
					uni.removeStorageSync('pkToken');
					uni.removeStorageSync('pkUid');
					if(res.code==0){
						that.isLogin = false;
						that.username = "";
						that.password = "";
						that.website = "";
					}
				})
			},
			dialogClose(){
				this.$refs.alertDialog.close();
			},
			loginBtn(){
				if(this.isNull(this.website)){
					uni.showToast({
						title:"网址不能为空！",
						icon:"error"
					})
					return
				}
				if(this.isNull(this.username)){
					uni.showToast({
						title:"账号不能为空！",
						icon:"error"
					})
					return
				}
				if(this.isNull(this.password)){
					uni.showToast({
						title:"密码不能为空！",
						icon:"error"
					})
					return
				}
				uni.showLoading({
					title:"登录中...",
					mask:true
				})
				const that = this;
				getResponseData("/robot/robotLogin",'POST',{
					lottery3dUrl:that.website,
					lottery3dAccount:that.username,
					lottery3dPwd:that.password
				},function(res){
					if(res.code==0){	
						uni.showToast({
							title:"登录成功",
							icon:"success"
						})	
						that.isLogin = true;
						that.pked = res.data.leftCredit;
						uni.setStorageSync('pkToken',res.data.token);
						uni.setStorageSync('pkUid',res.data.uid);	
						that.getDrawInfo();
					}else{
						showToastTip(res.msg);		
					}
				})	
			},
			getDrawInfo(){
				const that = this;
				getResponseData("/robot/getDrawInfo",'get',{},function(res){
					if(res.code==4031){
						uni.removeStorageSync('pkToken');
						uni.removeStorageSync('pkUid');
						that.isLogin = false;
						that.username = "";
						that.password = "";
						that.website = "";
					}else if(res.code==200){
						that.pked = res.data.creditLimit;
						that.pkhs = res.data.huishuiCount;
						that.pkyk = res.data.yinkuiCount;
						that.issue = res.data.drawId
						that.num1 = res.data.drawResult2T;
						that.num2 = res.data.drawResult3T;
						that.num3 = res.data.drawResult4T;
						that.updateTime = res.data.drawTime;
					}
				})	
			},
			isNull(str){
				return str==null || str=="" || str==undefined;
			}
		}
	}
</script>

<style>
	.login-success{
		background: url(../../static/images/bg.png) no-repeat;
		background-size: auto;
		background-size: 100%;
		height: 456px;
	}
	.account-bg{
		margin: auto;
		width: 351px;
		height: 143px;
		background: url(../../static/images/bg1.png) no-repeat;
		background-color: rgba(0, 0, 0, 0);
		background-position-x: 0%;
		background-position-y: 0%;
		background-size: auto;
		background-size: 375px 160px;
		background-position: top -8px right -16px;
		background-color: #333;
	}
	.username{
		padding-left: 20px;
		font-size: 15px;
		color: #57311e;
		font-weight: bolder;
	}
	.pked{
		border-right: 1px solid #dfbc9b;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		padding-right: 10px;
		font-size: 20px;
		font-weight: bolder;
	}
	.wc-bg{
		background: linear-gradient(180deg,#fbf0e6,#fff);
		box-shadow: 0px 0px 6px 1px hsla(0,0%,65.9%,.16);
	}
	.card-wrap{
		margin: auto;
		margin-top: auto;
		width: 351px;
		padding: 12px 12px 21px 17px;
		opacity: 1;
		border-radius: 10px;
		box-sizing: border-box;
	}
	.code-bar{
		width: 38px;
		height: 38px;
		line-height: 38px;
		text-align: center;
		background: #e04a48;
		border-radius: 50%;
		font-size: 22px;
		font-weight: 700;
		opacity: 1;
		color: #fff;
		margin-right: 7px;
		box-sizing: border-box;
	}
	.logout{
		color: #c8b5aa;
		font-size: 10px;
		padding-right: 7px;
		padding-top: 2px;
		display: flex;
		align-items: center;
	}
	.uni-popup__error{
		color: #303133 !important;
	}
	.notLogin{
		background: url(../../static/images/bg2.png) no-repeat;
		background-size: 100% 100%;
		height: 723px;
	}
	.input{
		width: 334px;
		height: 34px;
		margin: 0 auto;
		margin-top: 25px;
		border-bottom: 1px solid #dfdfdf;
		display: flex;
		align-items: center;
	}
	.urlInput{
		width: 300px;
		height: 34px;
		line-height: 34px;
		padding-left: 11px;
		font-size: 13px;
		color: #999;
		display: block;
		min-height: 1.4em;
		overflow: hidden;
	}
	.loginBtn{
		width: 345px;
		height: 45px;
		line-height: 45px;
		text-align: center;
		background-color: #2e61ee;
		border-radius: 25px;
		font-size: 16px;
		color: #fff;
		margin: 0 auto;
		margin-top: 35px;
	}
</style>
