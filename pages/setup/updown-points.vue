<template>
	<view style="min-height: 100%;">
		<view style="display: flex;justify-content: center;padding: 30rpx;font-size: 15px;">
			<view style="width: 50%;text-align: center;" @click="changeFlag(0)"><text :class="upFlag==0?'upActive':''">上分</text></view>
			<view style="width: 50%;text-align: center;" @click="changeFlag(1)"><text :class="upFlag==1?'upActive':''">下分</text></view>
		</view>
		<view style="height: 30px;padding:15px 10px;display: flex;justify-content: space-between;align-items: center;border-bottom: 1px solid #d9d8dd;">
			<view style="font-weight: bold;font-size: 14px;"><text>查看日期</text></view>
			<view>
				<picker @change="changeDateRange" :value="dateRangeIndex" :range="dateRange" range-key="name">
					<view class="rangeValue">
						{{ dateRange[dateRangeIndex].name }}
						<image src="../../static/images/downArrow.png" style="width: 15px;height: 15px;line-height: 0px;"></image>
					</view>
				</picker>
			</view>
		</view>
		<view>
			<scroll-view scroll-y="true" lower-threshold="10" @scrolltolower="loadMorePointsList" :style="{'height':winHeight+'px'}">
				<view v-if="pointsList.length > 0">
					<view v-for="(item,index) in pointsList" style="padding:15px 10px;border-bottom: 1px solid #eee;">
						 <view style="display: flex;align-items: center;justify-content: space-between;">
							 <view style="display: flex;justify-content: flex-start;align-items: center;">
									 <view><img :src="item.player.headimg" style="width: 50px;height: 50px;border-radius: 10px;" /></view>
									 <view style="font-weight: bold;font-size: 16px;margin-left:10px"><text>{{item.player.nickname}}</text></view>
							 </view>
							 <view style="font-size: 15px;">
								 <text v-if="item.optType==0" style="font-weight: bolder;">上分:</text>
								 <text v-if="item.optType==1" style="font-weight: bolder;">下分:</text>
								 <text style="color:blue;margin-left:5px">{{item.points}}</text>
							</view>
						 </view>
						 <view >
							 <view>												
								 <view style="color:#999;font-size: 13px;margin-top:5px"><text style="margin-right: 3px;">申请时间:</text><text>{{item.applyTime}}</text></view>
								 <view style="color:#999;font-size: 13px;margin-top:5px"><text style="margin-right: 3px;">审核时间:</text><text>{{item.authTime}}</text></view>
							 </view>											
						 </view>
					</view>	
				</view>
				<view style="text-align: center;" v-else>
					<view style="padding-top: 2px;">
						<view class="followlist">
							<view style="display: inline-flex;align-items: center;flex-direction: column;justify-content: center;">
								<image src="../../static/images/noData.png" style="width: 60px;height: 65px;"></image>
							</view>
							<view style="color: rgb(148, 152, 157);font-size: 13px;margin: 7px 0px 0px;">
								暂无数据
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { getResponseData, showToastTip,getBaseUrl,getWsUrl} from "@/config/req.js";
	export default {
		data() {
			return {
				upFlag:0,
				dateRange:[
					{name:'当天'},{name:'昨天'},{name:'本周'}
				],
				dateRangeIndex:0,
				pointsListSearch:{
					playerId:'',
					dayRange:1,
					upDownType:0,
					pageNo:1,
					pageSize:10	
				},
				pager:{
					pages:-1,
					total:0,
					pageNo:1,
					pageSize:10
				},
				pointsList:[],
				winHeight:0
			}
		},
		methods: {
			changeFlag(flag){
				this.upFlag = flag;
				this.pager.pageNo = 1;
				this.pager.pages = -1;
				this.pointsListSearch.upDownType = flag;
				this.pointsListSearch.pageNo = 1;
				this.pointsList = [];
				this.getPointsList();
			},
			changeDateRange(e,moduleName){
				this.pointsList = [];
				this.dateRangeIndex = e.detail.value;		
				var dayRange = 1;
				if(this.dateRangeIndex==1){
					dayRange = -1;
				}else if(this.dateRangeIndex==2){
					dayRange = 7
				}
				this.pager.pageNo = 1;
				this.pager.pages = -1;
				this.pointsListSearch.dayRange = dayRange;
				this.pointsListSearch.pageNo = 1;
				this.getPointsList();	
			},
			getPointsList(){
				const that = this;
				getResponseData("/player/points/list",'get',this.pointsListSearch,function(res){
					if(res.code==0){						
						res.data.forEach((item,idx)=>{
							that.pointsList.push(item);
						})
						that.pager.total = res.count;
						that.pager.pages = Math.ceil(res.count/that.pager.pageSize);
					}else{
						showToastTip(res.msg);	
					}
				})
			},
			loadMorePointsList(){
				if(this.pager.pageNo<this.pager.pages){
					this.pointsListSearch.pageNo++;
					this.getPointsList();
				}
			},
		},
		onLoad() {
			this.getPointsList();
			this.winHeight = uni.getSystemInfoSync().windowHeight-112;
		}
	}
</script>

<style scoped>
	.rangeValue{
		text-align:center;
		background-color: #2e61ee;
		height: 20px;
		width: 43px;
		color:white;
		padding: 2px 5px;
		font-size: 12px;
		border-radius: 5px;
		font-weight: bolder;
		line-height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.upActive{
		border-bottom: 2px solid rgb(46, 97, 238);
		padding-bottom: 10rpx;
		color: rgb(46, 97, 238);
		font-weight: bold;
	}
	.followlist{
		margin-top: 15px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
</style>
