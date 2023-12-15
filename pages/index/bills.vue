<template>
	<view style="padding: 8px 8px 8px;">
		<view style="margin-bottom: 9px;background: #fff;">
			<view style="height: auto;background-color: rgb(255, 255, 255);">
				<view style="position: static;width: 100%;padding: 0 5px;">
					<view style="padding: 7px 7px 0 7px;background: #fff;display: flex;justify-content: space-between;align-items: center;">
						<view style="font-size: 15px;font-weight: bolder;">本周统计</view>
						<view style="font-size: 13px;color: #999;">数据统计为每日总数据</view>
					</view>
					<view class="time">
						<view class="time-item" :class="{'active':isActive==(i+1)}" v-for="(item ,i) in dateList" @click="getDateBills(item.dateTime,i)">
							{{item.date}}
						</view>
					</view>
					<view class="data">
						<view class="data-item" style="margin-bottom: 10px;">
							<view style="flex: 1;">
								<text style="color: #999;">当日总上分：</text>{{totalUpScore}}
							</view>
							<view style="flex: 1;">
								<text style="color: #999;">当日总下分：</text>{{totalLowerScore}}
							</view>
						</view>
						<view class="data-item">
							<view style="flex: 1;">
								<text style="color: #999;">当日总投额：</text>{{totalAmount}}
							</view>
							<view style="flex: 1;">
								<text style="color: #999;">当日总回水：</text>{{totalBackWater}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="padding: 0 7px 0 7px;background: #fff;">
			<view style="position: relative;padding: 10px 0 10px 0;border-bottom: 1px solid #eaeaea;" v-for="(item ,i) in dataList">
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view style="display: flex;align-items: center;">
						<image class="image" :src="item.headImg"></image>
						<text class="text">{{item.username}}</text>
					</view>
					<view style="color: #fa513c;font-weight: bolder;font-size: 14px;">{{item.totalMoney}}</view>
				</view>
				<view style="margin-top: 12px;font-size: 13px;">
					<view class="data-item" style="margin-bottom: 12px;">
						<view style="flex: 1;">
							<text style="color: #999;">当日上分：</text>{{item.upScore}}
						</view>
						<view style="flex: 1;">
							<text style="color: #999;">当日下分：</text>{{item.downScore}}
						</view>
					</view>
					<view class="data-item">
						<view style="flex: 1;">
							<text style="color: #999;">当日投额：</text>{{item.totalMoney}}
						</view>
						<view style="flex: 1;">
							<text style="color: #999;">当日回水：</text>{{item.totalHs}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { playMusic, stopMusic} from "@/config/music.js";
	import { getResponseData, showToastTip,getBaseUrl,getWsUrl} from "@/config/req.js";
	export default {
		data() {
			return {
				dateList:[],//周一到周日
				isActive:1,
				totalUpScore:0,	//当日总上分
				totalLowerScore:0,	//当日总下分
				totalAmount:0,		//当日总投额
				totalBackWater:0,	//当日总回水
				dataList:[],
			}
		},
		onShow() {
			stopMusic();
			this.verifyBotUserExpire();
			this.getDateBills(this.dateFormat(new Date()),new Date().getDay()-1);
		},
		methods: {
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
			//获取账单信息
			getDateBills(date,i){
				this.isActive = i+1;
				var that = this;
				getResponseData("/bills/getBillsInfo",'Get',{date:date},function(res){
					if(res.code==200){	
						that.totalUpScore = res.data.botUpScore;
						that.totalLowerScore = res.data.botDownScore;
						that.totalBackWater = res.data.botTotalHs;
						that.totalAmount = res.data.botTotalMoney;
						that.dataList = res.data.billsDetailResList;
					}
				})	
			},
			//格式化时间
			dateFormat(date){
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1) + '-';
				var D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate())+ ' ';
				// var h = (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+ ':';
				// var m = (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes()) + ':';
				// var s = date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds();
				// return Y+M+D+h+m+s;
				return Y+M+D;
			}
		},
		onLoad() {
			const now = new Date();
			const nowTime = now.getTime();
			// getDay()返回0-6，其中0表示周日，需特殊处理
			const day = now.getDay() > 0 ? now.getDay() : 7 // 表示当前是周几
			const oneDayTime = 24 * 60 * 60 * 1000 // 一天的总ms
			
			const MondayTime = nowTime - (day - 1) * oneDayTime;// 本周一时间戳
			const TuesdayTime = MondayTime + oneDayTime;
			const WednesdayTime = MondayTime + oneDayTime*2;
			const ThursdayTime = MondayTime + oneDayTime*3;
			const FridayTime = MondayTime + oneDayTime*4;
			const SaturdayTime = MondayTime + oneDayTime*5;
			const SundayTime = nowTime + (7 - day) * oneDayTime;// 本周日时间戳
			
			const monday = new Date(MondayTime);
			const tuesday = new Date(TuesdayTime);
			const wednesday = new Date(WednesdayTime);
			const thursday = new Date(ThursdayTime);
			const friday = new Date(FridayTime);
			const saturday = new Date(SaturdayTime);
			const sunday = new Date(SundayTime);
			//格式化
			this.dateList.push({date:"周一",dateTime:this.dateFormat(monday)});
			this.dateList.push({date:"周二",dateTime:this.dateFormat(tuesday)});
			this.dateList.push({date:"周三",dateTime:this.dateFormat(wednesday)});
			this.dateList.push({date:"周四",dateTime:this.dateFormat(thursday)});
			this.dateList.push({date:"周五",dateTime:this.dateFormat(friday)});
			this.dateList.push({date:"周六",dateTime:this.dateFormat(saturday)});
			this.dateList.push({date:"周日",dateTime:this.dateFormat(sunday)});
			
			// console.log(this.dateList);
			// console.log('周一:', this.dateFormat(monday)+' 周二:', this.dateFormat(tuesday)+' 周三:', this.dateFormat(wednesday)+' 周四:', 
			// this.dateFormat(thursday)+' 周五:', this.dateFormat(friday)+' 周六:', this.dateFormat(saturday)+' 周日:', this.dateFormat(sunday));
			// this.getDateBills(this.dateFormat(new Date()),new Date().getDay()-1);
		}
	}
</script>

<style>
	page{
		background-color: #f9fbf8;
	}
	view{
		box-sizing: border-box;
	}
	.time{
		padding: 14px 0;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.time-item{
		font-weight: 500;
		width: 44px;
		height: 24px;
		line-height: 24px;
		border-radius: 6px 6px 6px 6px;
		opacity: 1;
		text-align: center;
		font-size: 14px;
	}
	.active{
		background: #2e61ee;
		opacity: 1;
		color: #fff;
	}
	.data{
		position: relative;
		padding: 12px 0 20px 7px;
		font-size: 13px;
		background: #fff;
	}
	.data-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.image{
		will-change: transform;
		width: 28px;
		height: 28px;
		border-radius: 6px 6px 6px 6px;
		margin-right: 7px;
	}
	.text{
		width: 129px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-right: 5px;
		font-size: 14px;
		color: #333;
		font-weight: bolder;
	}
</style>
