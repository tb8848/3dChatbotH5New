<template>
	<view>
		<view style="width: 90%;margin: auto;">
			<view style="padding-top: 30px;">
				<view style="text-align: center;color: #333;font-weight: 700;font-size: 16px;">修改密码</view>
			</view>
			<view style="padding-bottom: 30rpx;border-bottom: 1px solid #DCDFE6;padding-top: 20px;">
			<view style="display: flex;justify-content: space-between;margin-top:50rpx">
				<text style="font-size: 15px;font-weight: bolder;">原密码</text>
				<input password="password" placeholder="请输入原密码" v-model="pwds.oldpwd" style="text-align: right;font-size: 15px;"/></view>
			<view style="display: flex;justify-content: space-between;margin-top:50rpx">
				<text style="font-size: 15px;font-weight: bolder;">新密码</text>
				<input password="password" placeholder="请输入新密码"  v-model="pwds.newpwd" style="text-align: right;font-size: 15px;"/></view>
			<view style="display: flex;justify-content: space-between;margin-top:50rpx">
				<text style="font-size: 15px;font-weight: bolder;">确认新密码</text>
				<input password="password" placeholder="请再次输入新密码"  v-model="pwds.newpwd1" style="text-align: right;font-size: 15px;"/></view>
			</view>
			<view class="addJiaRen" @click="editPwd()">
				<text>确定</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { getResponseData, showToastTip,getBaseUrl,getWsUrl} from "@/config/req.js";
	export default {
		data() {
			return {
				pwds:{
					oldpwd:'',
					newpwd:'',
					newpwd1:'',
					spwd:'',
					snewpwd:''
				},
			}
		},
		methods: {
			editPwd(){
				const that = this;
				if(this.pwds.oldpwd==""){
					showToastTip("原密码不能为空");
					return;
				}
				if(this.pwds.newpwd==""){
					showToastTip("新密码不能为空");
					return;
				}
				if(this.pwds.newpwd1==""){
					showToastTip("确认密码不能为空");
					return;
				}
				if(this.pwds.newpwd!=this.pwds.newpwd1){
					showToastTip("两次输入的新密码不一致");
					return;
				}
				uni.showLoading({
					title:"处理中...",
					mask:true
				})
				getResponseData("/user/editPwd",'POST',{
					oldpwd:that.pwds.oldpwd,
					newpwd:that.pwds.newpwd
				},function(res){
					if(res.code==0){
						uni.removeStorageSync('token');
						uni.removeStorageSync('uname');
						showToastTip("修改成功");
						setTimeout(function(){
							uni.redirectTo({
								url:"/pages/login"
							})
						},1200)
					}else{
						showToastTip(res.msg);		
					}
				})	
			}
		}
	}
</script>

<style>
	.addJiaRen{
		background-color: #2e61ee;
		height: 50px;
		line-height: 50px;
		text-align: center;
		color:white;
		border-radius: 10rpx;
		margin-top: 30px;
		margin-bottom: 10px;
		font-size: 14px;
	}
</style>
