<template>
	<view class="mask">
		<!-- <view @click.stop="onClick" class="content">
			<text class="text">点击蒙层关闭</text>
		</view> -->
		<view style="height: 100%;min-height: 100%;background-color: #fff;width: 100%;">
			<view style="height: 30px;text-align: right;:10px;padding-right: 10px;"><uni-icons type="closeempty" size="20" @click="close"></uni-icons></view>
			<view class="barmenu">
				<view class="menu" :class="[buyType==-1?'selected':'']" @click="changeBuyType(-1)">
					<text>全部</text>
				</view>
				<view class="menu" :class="[buyType==0?'selected':'']" @click="changeBuyType(0)">
					<text>报网</text>
					</view>
				<view class="menu" :class="[buyType==1?'selected':'']" @click="changeBuyType(1)"><text>吃奖</text></view>
				<view class="menu" :class="[buyType==2?'selected':'']" @click="changeBuyType(2)"><text>假托</text></view>
			</view>
			<view style="height: 30px;padding:15px 10px;display: flex;justify-content: space-between;align-items: center;border-bottom: 1px solid #C8C7CC;">
				<view style="font-weight: bold;font-size: 15px;"><text>查看日期</text></view>
	
				<view>
					<picker @change="changeDateRange" :value="dateRangeIndex" :range="dateRange" range-key="name">
						<view style="text-align:center;background-color: blue;border:1px solid blue;height: 20px;width:40px;color:white;padding: 2px 5px;font-size: 13px;border-radius: 5px;">{{ dateRange[dateRangeIndex].name }}</view>
					</picker>
				</view>
			</view>
			<view>
				<!-- <view v-if="startLoading" style="text-align: center;">
					<img src="../../static/images/load.gif">
				</view> -->
				<view v-if="!startLoading && pager.pages==0" style="text-align: center;">暂无数据</view>
				<view v-else>
					<scroll-view style="height:400px;" scroll-y="true" lower-threshold="10" @scrolltolower="loadMore">
						<view v-for="(item,index) in dataList" style="display: flex;padding:10px;border-bottom: 1px solid #DCDFE6;">							
								 <view>
									 <view><img :src="player.headimg" style="width: 50px;height: 50px;" /></view>
									 <view style="margin:10px 0px;text-align: center;color:red" v-if="item.buyStatus==0"><text>退单</text></view>
								 </view>
								 <view style="margin-left: 5px;">
									 <view style="padding: 3px;" >
										 <view style="font-size: 16px;margin-bottom:5px"><text >{{player.nickname}}</text></view>
										 <view style="color:#C0C0C0;font-size: 14px;"><text>下单时间:</text><text>{{item.buyTime}}</text></view>
									 </view>
									 <view style="display: flex;padding: 3px;align-items: center">
									 	 <view style="color:#C0C0C0;font-size: 14px;">
											 <text>结算时间:</text >
											 <text v-if="item.buyStatus==0">--</text>
											 <text v-if="item.buyStatus==1">{{item.settlementTime}}</text>
										</view>
									 	 <view style="background-color: #C0C0C0;padding:1px 5px;font-size: 13px;margin-left: 10px;" v-if="item.buyStatus==0">未结算</view>
										 <view style="background-color: #2979FF;padding:1px 5px;font-size: 13px;margin-left: 10px;color:white" v-if="item.buyStatus==1">已结算</view>
										 <view style="background-color: red;padding:1px 5px;font-size: 13px;margin-left: 10px;color:white" v-if="item.buyStatus==1 && item.earnPoints<0">输</view>
										 <view style="background-color: green;padding:1px 5px;font-size: 13px;margin-left: 10px;color:white" v-if="item.buyStatus==1 && item.earnPoints>0">赢</view>
									 </view>
									 <view style="display: flex;align-items: center;padding: 5px;">
										 <view style="border:1px solid #2C405A;color:#2C405A;padding:1px 5px;font-size: 13px;margin-right: 10px;"><text>{{item.drawNo}}</text></view>
									 	 
									 	 <view style="border:1px solid #F3A73F;color:#F3A73F;padding:1px 5px;font-size: 13px;margin-right: 10px;"><text>本期合计:&nbsp;{{item.buyPoints}}</text></view>
										 <view style="border:1px solid #2979FF;color:#2979FF;padding: 1px 5px;font-size: 13px;margin-right: 10px;">
											 <text v-if="item.buyType==1" >吃奖</text>
											 <text v-if="item.buyType==0" >报网</text>
											 <text v-if="item.buyType==2" >假托</text>
										 </view>
										 <view style="background-color: red;color:#FFFFFF;padding: 1px 5px;font-size: 13px;margin-right: 10px;" v-if="item.buyStatus==1 && item.earnPoints<0">
											  <text>{{item.earnPoints}}</text>
										 </view>
										<view style="background-color: green;color:#FFFFFF;padding: 1px 5px;font-size: 13px;margin-right: 10px;" v-if="item.buyStatus==1 && item.earnPoints>0">
											<text >+{{item.drawPoints}}</text>
										 </view>
									 </view>
									 <view style="padding: 5px;"><text style="font-size: 14px;color:#A5A4A4;">{{item.buyDesc}}</text></view>
								 </view>
							 </view>	
							 <view v-if="startLoading" style="text-align: center;">
								<img src="../../static/images/load.gif">
							 </view>
					</scroll-view>
				
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
				pager:{
					pageNo:1,
					pageSize:15,
					pages:0,
					total:0
				},
				buyType:-1,
				dateRange:[
					{name:'当天'},{name:'昨天'},{name:'本周'}
				],
				dateRangeIndex:0,
				startLoading:true,
				player:{
					playerId:'',
					nickname:'',
					headimg:''
				},
				dataList:[],
				scrollHeight:400
				
			}
		},
		onLoad(option){
			var cc = decodeURIComponent(option.params);
			const params = JSON.parse(decodeURIComponent(option.params));
			console.log(params);
			this.player.playerId = params.playerId;
			this.player.nickname = params.nickname;
			this.player.headimg = params.headimg;
			this.getData();
		},
		methods: {
			loadMore(){
				console.log("=====load more")
				if(this.pager.pageNo<this.pager.pages){
					this.pager.pageNo++;
					this.getData();
				}
			},
			changeBuyType(buyType){
				this.buyType = buyType;
				this.pager.pageNo = 1;
				this.startLoading = true;
				this.dataList = [];
				this.getData();
				
			},
			changeDateRange(e){
				this.dateRangeIndex = e.detail.value;
				this.pager.pageNo = 1;
				this.startLoading = true;
				this.dataList = [];
				this.getData();
			},
			close(){
				uni.navigateBack()
			},
			getData(){
				const that = this;
				var dayRange = 1;
				if(this.dateRangeIndex==1){
					dayRange = -1;
				}else if(this.dateRangeIndex==2){
					dayRange = 7
				}
				getResponseData("/player/buy/list",'get',{
					playerId:that.player.playerId,
					buyType:that.buyType,
					dayRange:dayRange,
					pageNo:that.pager.pageNo,
					pageSize:that.pager.pageSize
				},function(res){
					if(res.code==0){	
						res.data.forEach((item,idx)=>{
							that.dataList.push(item);
						})
						that.pager.total = res.count;
						that.pager.pages = Math.ceil(res.count/that.pager.pageSize);
						that.startLoading = false;
						console.log("============pager==",that.pager.total,"===",that.pager.pages);
					}else{
						showToastTip(res.msg);	
						that.startLoading = false;
					}
				})	
				
			}
			
		}
	}
</script>

<style scoped>
	
	.line{
		color:blue;
		margin-top:5px;
		height: 2px;
		background-color: blue;
		width: 30px;
	}
	.barmenu{
		display: flex;
		justify-content: space-between;
		height: 30px;
		padding:15px 60px
	}
	.barmenu .menu{
		width: 40px;text-align: center;font-weight: bold;
		justify-content: center;
		align-items: center;
		display: flex;
		flex-direction: column;
		margin:
	}
	
	.selected{
		color:blue;
		border-bottom: 2px solid blue;
	}
	
	page{
		background: transparent;
	}
	
	.mask {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.4);
	}

</style>
