<template>
	<view>
		<view class="tips">
			<view style="margin-bottom: 7px;display: flex;align-items: center;">
				<view class="tipsImage">
					<image src="../../static/images/redTips.png"></image>
				</view>
				温馨提示：信用网会自动掉水请注意配置必免造成亏损！！！
			</view>
		</view>
		<view v-if="lotteryType==3" style="display: flex;justify-content: center;align-items: center;border-bottom: 1px solid #CCCCD4;">
			<view class="lottypeTab widthP50" :class="[selectLotteryType==1?'lottypeSelect':'lottypeUnselect']" @click="switchLotteryType(1)"><text>3D</text></view>
			<view class="lottypeTab widthP50" :class="[selectLotteryType==2?'lottypeSelect':'lottypeUnselect']" @click="switchLotteryType(2)"><text>P3</text></view>
		</view>
		<view v-else>
			<view class="lottypeTab widthP100 lottypeSelect"><text>3D</text></view>
			<view class="lottypeTab widthP100 lottypeSelect"><text>P3</text></view>
		</view>
		<view style="width: 375px;padding: 0 12px;box-sizing: border-box;">
			<view v-for="(item,i) in oddsList">
				<!-- <view v-show="item.lottype==selectLotteryType" style="font-size: 15px;color: #333;font-weight: bolder;text-align: center;margin-bottom: 15px;">{{item.lottype==2?"P3":"3D"}}</view> -->
				<view class="item" v-show="item.lottype==selectLotteryType" v-for="(lm,j) in item.data">				
				<view v-if="lm.botUserOddsList.length > 1">
					<view style="font-size: 15px;color: #333;font-weight: bolder;text-align: center;margin-bottom: 15px;">{{lm.bettingMethod}}</view>
					<view style="border-bottom: 1px solid #eaeaea;padding: 7px 0;" v-for="(odds,k) in lm.botUserOddsList">
						<view style="width: 100%;display: flex;justify-content: space-between;align-items: center;">
							<view style="font-size: 15px;color: #333;font-weight: bolder;">{{odds.bettingRule}}</view>
							<input class="item-input" :value="odds.odds" @blur="changeValue(1,i,j,k,$event,odds)" />
						</view>
						<view style="margin-top: 18px;display: flex;justify-content: space-between;align-items: center;">
							<view style="font-size: 12px;color: #333;">最大限额</view>
							<input class="item-smallInput" :value="odds.maxBuy" @blur="changeValue(2,i,j,k,$event,odds)" />
							<view style="font-size: 12px;color: #333;">最小限额</view>
							<input class="item-smallInput" :value="odds.minBuy" @blur="changeValue(3,i,j,k,$event,odds)" />
						</view>
					</view>
				</view>
				<view v-else>
					<view style="width: 100%;display: flex;justify-content: space-between;align-items: center;">
						<view style="font-size: 15px;color: #333;font-weight: bolder;">{{lm.bettingMethod}}</view>
						<input class="item-input" :value="lm.botUserOddsList[0].odds" @blur="changeValue(1,i,j,0,$event,lm.botUserOddsList[0])" />
					</view>
					<view style="margin-top: 18px;display: flex;justify-content: space-between;align-items: center;">
						<view style="font-size: 12px;color: #333;">最大限额</view>
						<input class="item-smallInput" :value="lm.botUserOddsList[0].maxBuy" @blur="changeValue(2,i,j,0,$event,lm.botUserOddsList[0])" />
						<view style="font-size: 12px;color: #333;">最小限额</view>
						<input class="item-smallInput" :value="lm.botUserOddsList[0].minBuy" @blur="changeValue(3,i,j,0,$event,lm.botUserOddsList[0])" />
					</view>
				</view>
			</view>
			</view>
		</view>
		<view style="height: 56px;"></view>
		<view class="footer">
			<view class="saveSub" @click="isSetSafePassword()">保存</view>
		</view>
		
		<!-- 验证安全密码  -->
		<uni-popup ref="safeVerify" type="center" background-color="#fff" :mask-click="true">
			<view>
				<view style="display: flex;justify-content:space-between;">
					<view  style="width: 10%;"></view>
					<view  style="width: 80%;text-align: center;color: #333;font-weight: 700;"><text>验证安全密码</text></view>
					<view  style="width: 10%;" @click="closeSafeVerify"><uni-icons type="closeempty" size="20"></uni-icons></view>
				</view>
				<view style="padding-bottom: 30rpx;margin-top: 16px;font-size: 14px;">
					<view style="display: flex;justify-content: space-between;margin-top:50rpx">
						<text style="font-weight: bolder;">密码：</text>
						<input type="password" v-model="safePassword" style="text-align: right;" placeholder="请输入安全密码" />
					</view>
				</view>
				<view style="background-color: #2e61ee;height: 50px;line-height: 50px;text-align: center;color:white;border-radius: 10rpx;margin-top: 20px;margin-bottom: 10px;" @click="safeVerify">
					<text style="font-size: 14px;">确定</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { getResponseData, showToastTip } from "@/config/req.js";
	export default {
		data() {
			return {
				oddsList:[],
				upLsId:[],
				safePassword:"",//安全密码
				lotteryType:-1,
				selectLotteryType:-1
			}
		},
		methods: {
			//判断是否设置安全密码
			switchLotteryType(v){
				this.selectLotteryType = v;
			},
			isSetSafePassword(){
				const that = this;
				getResponseData("/user/isSetSafePassword",'POST',"",function(res){
					if(res.code==0){	
						that.openSafeVerify();
					}else{
						that.saveOdds();
					}
				})	
			},
			closeSafeVerify(){
				this.$refs.safeVerify.close();
				this.safePassword = "";
			},
			openSafeVerify(){
				this.$refs.safeVerify.open();
				this.safePassword = "";
			},
			safeVerify(){
				const that = this;
				const safePwd = this.safePassword;
				if(safePwd=="" || safePwd==null || safePwd==undefined){
					showToastTip("请输入安全密码！");
					return;
				}
				getResponseData("/user/verifySafePassword",'get',{safePassword:safePwd},function(res){
					if(res.code==0){
						that.closeSafeVerify();
						that.saveOdds();
					}else{
						showToastTip(res.msg);		
					}
				})	
			},
			saveOdds(){
				var that = this;
				if(this.upLsId.length<1){
					layer.msg("未修改任何数据");
					return;
				}
				var upList = [];
				this.oddsList.forEach((item,idx)=>{
					var dlist = item.data;
					dlist.forEach((lm,ii)=>{
						var lsList = lm.botUserOddsList;
						lsList.forEach((it1,idx1)=>{
							if(that.upLsId.includes(it1.id)){
								upList.push(it1);
							}
						})
					})				
				});
				uni.showLoading({
					title:"数据更新中...",
					mask:true
				})	
				getResponseData("/odds/batchUpdateOdds",'POST',upList,function(res){
					if(res.code == 200){
						uni.showToast({
							title:"赔率更新成功",
							icon:"none"
						})
					}else{
						uni.showToast({
							title:res.msg,
							icon:"error"
						})
					}
				})
			},
			changeValue(index,i,j,k,e,item){
				var changed = false;
				var value = e.target.value;
				var lottype = this.oddsList[i].lottype;
				var oriDataItem = this.oddsList[i].data[j].botUserOddsList[k];
				if(index == 3 && item.minBuy != value){
					this.oddsList[i].data[j].botUserOddsList[k].minBuy = value;
					changed = true;
				}
				if(index == 1 && item.odds != value){
					this.oddsList[i].data[j].botUserOddsList[k].odds = value;
					changed = true;
				}
				if(index == 2 && item.maxBuy != value){
					this.oddsList[i].data[j].botUserOddsList[k].maxBuy = value;
					changed = true;
				}
				var lsId = oriDataItem.id;
				console.log(">>>>>>>>>>",lsId,">>>>>>>",lottype)
				if(changed && !this.upLsId.includes(lsId)){
					this.upLsId.push(lsId);
				}
			},
		},
		onLoad() {
			const that = this;
			this.lotteryType = uni.getStorageSync("lotteryType");
			if(this.lotteryType==3){
				this.selectLotteryType = 1;
			}else{
				this.selectLotteryType = this.lotteryType;
			}
			getResponseData("/odds/oddsList",'get',{},function(res){
				if(res.code==0){	
					that.oddsList = res.data;
					// var order = 0;
					// that.oddsList.forEach((item,idx)=>{
					// 	item.botUserOddsList.forEach((it1,idx1)=>{
					// 		it1.sort_order = order++;
					// 	})
					// })
				}
			})	
		}
	}
</script>

<style>
	.lottypeTab{
		text-align: center;
		height: 30px;
		line-height: 30px;
		color: #000000;
	}
	.widthP50{
		width: 50%;
	}
	.widthP5100{
		width: 100%;
	}
	.lottypeSelect{
		background-color: #2e61ee;
		color:#fff
	}
	
	.lottypeUnselect{
		background-color: #FFFFFF;
		color:#000000
	}
	page{
		background-color: #f5f5f5;
	}
	/deep/.uni-popup .uni-popup__wrapper {
		width: 80% !important;
		padding: 30rpx;
		border-radius: 20rpx;
	}
	.tips{
		margin: 0 auto;
		width: 351px;
		padding: 14px 16px;
		background: #fff;
		opacity: 1;
		border-radius: 12px;
		margin-bottom: 12px;
		box-sizing: border-box;
		color: #303133;
		font-size: 14px;
	}
	.tipsImage{
		width: 16px;
		height: 16px;
		border-radius: 0px;
		overflow: visible;
		opacity: 1;
		transition: opacity 0.5s ease-in-out 0s;
		background-color: transparent;
		margin-right: 7px;
	}
	.tipsImage image{
		width: 100%;
		height: 100%;
		will-change: transform;
		display: inline-block;
		overflow: hidden;
		position: relative;
	}
	.item{
		width: 351px;
		background-color: #fff;
		border-radius: 5px;
		margin-bottom: 12px;
		padding: 9px 12px;
		box-sizing: border-box;
	}
	.item-input{
		width: 242px;
		height: 32px;
		line-height: 32px;
		border: 1px solid #e5e5e5;
		border-radius: 5px;
		padding-left: 10px;
		font-size: 12px;
		display: block;
		min-height: 1.4em;
		overflow: hidden;
	}
	.item-smallInput{
		width: 90px;
		height: 26px;
		line-height: 26px;
		border: 1px solid #e5e5e5;
		border-radius: 5px;
		padding-left: 8px;
		font-size: 10px;
		display: block;
		min-height: 1.4em;
		overflow: hidden;
	}
	.footer{
		width: 100vw;
		background: #fff;
		position: fixed;
		left: 0;
		bottom: 0px;
		z-index: 999;
		padding-bottom: 5px;
		box-sizing: border-box;
	}
	.saveSub{
		width: 351px;
		height: 50px;
		margin: 0 auto;
		background: #2e61ee;
		border-radius: 12px 12px 12px 12px;
		opacity: 1;
		color: #fff;
		font-size: 15px;
		text-align: center;
		line-height: 50px;
	}
</style>
