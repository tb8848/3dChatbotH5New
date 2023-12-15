<template>
	<view style="min-height: 100%;background-color: #fff;">
		<view style="background: #fff;padding: 15px 16px 7px 0px;display: flex;justify-content: space-between;align-items: center;">
			<view></view>
			<view>
				<uni-icons type="closeempty" size="20" @click="close"></uni-icons>
			</view>
		</view>
		<view style="background-color: #fff;height: auto;width: 95%;margin: 0 auto;">
			<view style="padding: 7px 7px 0 8px;display: flex;justify-content: space-between;align-items: center;">
				<view style="font-size: 15px;font-weight: bolder;">当天统计</view>
				<view style="font-size: 13px;color: #999;">数据统计为每日总数据</view>
			</view>
			<view class="time">
				<view class="time-item" :class="{'active':isActive==(i+1)}" v-for="(item ,i) in dateList" @click="getReportData(item.dateTime,i)">
					{{item.date}}
				</view>
			</view>
			<view style="font-size: 13px;width: 90%;margin-top: 6px;padding-left: 8px;">
				<view class="data-item">
					<view style="flex: 1;"><text style="color: #999;">当日上分：</text>{{reportData.upScore}}</view>
					<view style="flex: 1;"><text style="color: #999;">当日下分：</text>{{reportData.downScore}}</view>
				</view>
				<view class="data-item">
					<view style="flex: 1;"><text style="color: #999;">当日总投：</text>{{reportData.totalMoney}}</view>
					<view style="flex: 1;"><text style="color: #999;">当日回水：</text>{{reportData.totalHs}}</view>
				</view>
				<view class="data-item">
					<view style="flex: 1;"><text style="color: #999;">总投笔数：</text>{{reportData.totalCount}}</view>
					<view style="flex: 1;"><text style="color: #999;">当日中奖：</text>{{reportData.drawMoney}}</view>
				</view>
				<view class="data-item">
					<view><text style="color: #999;">当日盈亏：</text>{{reportData.profitLossMoney}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getResponseData, showToastTip,getBaseUrl,getWsUrl} from "@/config/req.js";
	export default {
		data() {
			return {
				dateList:[],//周一到周日
				isActive:1,
				reportSearch:{
					playerId:"",
					date:"",
				},
				reportData:{
					upScore: 0,
					downScore: 0,
					drawMoney: 0,
					profitLossMoney: 0,
					totalCount: 0,
					totalHs: 0,
					totalMoney: 0
				}
			}
		},
		methods: {
			getReportData(date,i){
				this.reportSearch.date = date;
				this.isActive = i+1;
				const that = this;
				getResponseData("/player/report",'GET',this.reportSearch,function(res){
					console.log(res)
					if(res.code==200){						
						that.reportData = res.data;
					}else{
						showToastTip(res.msg);	
					}
				})
			},
			//格式化时间
			dateFormat(date){
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1) + '-';
				var D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate())+ ' ';
				return Y+M+D;
			},
			close(){
				uni.navigateBack();
			}
		},
		onLoad(option) {
			const params = JSON.parse(decodeURIComponent(option.params));
			this.reportSearch.playerId = params.playerId;
			
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
			
			this.getReportData(this.dateFormat(new Date()),new Date().getDay()-1);
		}
	}
</script>

<style>
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
	.data-item{
		margin-bottom: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
	}
</style>
