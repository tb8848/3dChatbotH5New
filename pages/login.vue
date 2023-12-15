<template>
	<view style="background: #3a405c;min-height: 100%;width: 100%;background-size: 100%;">
		<view style="padding-top: 50px;display: flex;justify-content: center;align-items: center;">
			<view class="logo">
				<image src="../static/3D.png" class="image"></image>
			</view>
		</view>
		<view class="title">3D之王</view>
		<view style="margin-top: 50px;">
			<view class="input-wrapper">
				<view style="width: 50px;text-align: center;"><uni-icons type="staff-filled" size="20" color="white"></uni-icons></view>
				<view style="width: 80%;">
					<input placeholder="请输入账号" v-model="loginName" placeholder-style="color:#fff" style="color: #fff;font-size: 13px;"/>
				</view>
			</view>
			<view style="height: 36px;"></view>
			<view class="input-wrapper">
				<view style="width: 50px;text-align: center;"><uni-icons type="locked-filled" size="20" color="white"></uni-icons></view>
				<view style="width: 80%;">
					<input password="password" placeholder="请输入密码" v-model="loginPwd" placeholder-style="color:#fff;" style="color: #fff;font-size: 13px;" @confirm="huiche"/>
				</view>
			</view>
			<view class="loginBtn" @click="login">登录</view>
		</view>
		<view class="tips">
			<view class="pwd">
				<image src="../static/images/safety-pwd1.png" class="image"></image>
			</view>
			已升级功能安全保障
		</view>
	</view>
</template>

<script>
	import { getResponseData, showToastTip,getBaseUrl,getWsUrl} from "@/config/req.js";
	export default {
		data() {
			return {
				loginName:'',
				loginPwd:'',
				isLogin:false
			}
		},
		onLoad() {
			const token = uni.getStorageSync("token");
			if(token!=null && token!="" ){
				uni.switchTab({
					url:'/pages/index/console'
				})				
			}else{
				this.isLogin = false;
			}
		},
		methods: {
			huiche(){
				this.login();
			},
			changePassword(){
				this.showPassword = !this.showPassword;
			},
			login(){
				const that = this;
				if(this.loginName==""){
					showToastTip("请输入账号");
					return;
				}
				if(this.loginPwd==""){
					showToastTip("请输入密码");
					return;
				}
				uni.showLoading({
					title:"登录中...",
					mask:true
				})
				getResponseData("/login",'POST',{
					loginName:this.loginName,
					loginPwd:this.loginPwd
				},function(res){
					if(res.code==0){
						uni.setStorageSync('token',res.data.token);
						uni.setStorageSync('uname',res.data.uname);						
						uni.switchTab({
							url:'/pages/index/console'
						})	
					}else{
						if(res.msg=="" || res.msg==null || res.msg==undefined){
							showToastTip("用户名或密码错误！");
						}else{
							showToastTip(res.msg);
						}
						that.loginPwd = "";						
					}
				})				
			},
		}
	}
</script>

<style>
	.input-wrapper{
		background-color: rgba(30,31,26,.5);
		width: 334px;
		height: 50px;
		margin: 0 auto;
		border-radius: 50rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		line-height: 50px;
	}
	
	.loginBtn{
		width: 345px;
		height: 55px;
		line-height: 55px;
		text-align: center;
		background-color: #2e61ee;
		border-radius: 10px;
		font-size: 16px;
		color: #fff;
		margin: 0 auto;
		margin-top: 0px;
		margin-top: 35px;
	}
	uni-page-body {
	  height: 100%;
	}
	.logo{
		width: 70px;
		height: 70px;
		border-radius: 0px;
		overflow: visible;
		opacity: 1;
		transition: opacity 0.5s ease-in-out 0s;
		background-color: transparent;
		position: relative;
	}
	.image{
		width: 100%;
		height: 100%;
		border-radius: 0px;
		will-change: transform;
		display: inline-block;
		overflow: hidden;
		position: relative;
	}
	.title{
		display: flex;justify-content: center;align-items: center;font-size: 26px;color: white;margin-top: 6px;
	}
	.tips{
		height: auto;
		background: transparent;
		margin-bottom: 0px;
		margin-top: 0px;
		padding-top: 50px;
		width: 100%;
		position: relative;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		flex-direction: row;
		font-size: 12px;
		color: white;
	}
	.pwd{
		width: 18px;
		height: 18px;
		border-radius: 0px;
		overflow: visible;
		opacity: 1;
		transition: opacity 0.5s ease-in-out 0s;
		background-color: transparent;
		position: relative;
		margin-right: 2px;
	}
</style>
