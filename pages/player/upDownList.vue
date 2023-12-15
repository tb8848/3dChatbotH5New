<template>
	<view class="mask">
		<view style="height: 100%;min-height: 100%;padding: 30rpx;background-color: #fff;width: 100%;">
			<view style="height: 30px;text-align: right;padding-top:20rpx"><uni-icons type="closeempty" size="20" @click="close"></uni-icons></view>
			<view class="barmenu">
				<view class="menu" :class="[buyType==1?'selected':'']" @click="changeBuyType(1)"><text>上分</text></view>
				<view class="menu" :class="[buyType==2?'selected':'']" @click="changeBuyType(2)"><text>下分</text></view>
			</view>
			<view style="height: 30px;padding:15px 10px;display: flex;justify-content: space-between;align-items: center;border-bottom: 1px solid #C8C7CC;">
				<view style="font-weight: bold;font-size: 14px;"><text>查看日期</text></view>
				<view>
					<picker @change="changeDateRange" :value="dateRangeIndex" :range="dateRange" range-key="name">
						<view style="text-align:center;background-color: blue;height: 20px;width:45px;color:white;padding: 2px 5px;font-size: 12px;border-radius: 5px;line-height: 15px;">
							{{ dateRange[dateRangeIndex].name }}<uni-icons type="bottom" size="20" color="white"></uni-icons>
						</view>
					</picker>
				</view>
			</view>
			<view style="height: calc(100% - 90px);">
				<view v-if="startLoading" style="text-align: center;">
					<img src="../../static/images/load.gif">
				</view>
				<view v-else-if="!startLoading && pager.pages==0" style="text-align: center;margin-top: 20px;">暂无数据</view>
				<view v-else>
					<scroll-view style="min-height: calc(100% - 90px);"></scroll-view>
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
				buyType:1,
				dateRange:[
					{name:'当天'},{name:'昨天'},{name:'本周'}
				],
				dateRangeIndex:0,
				startLoading:true,
				playerId:'',
				dataList:[]
			}
		},
		onLoad(option){
			var cc = decodeURIComponent(option.params);
			const params = JSON.parse(decodeURIComponent(option.params));
			console.log(params);
			this.playerId = params.playerId;
			this.getData();
		},
		methods: {
			changeBuyType(buyType){
				this.buyType = buyType;
			},
			changeDateRange(e){
				this.dateRangeIndex = e.detail.value;
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
					playerId:that.playerId,
					buyType:that.buyType,
					dayRange:dayRange,
					pageNo:that.pager.pageNo,
					pageSize:that.pager.pageSize
				},function(res){
					if(res.code==0){	
						that.dataList = res.data;
						that.pager.total = res.count;
						that.pager.pages = Math.ceil(res.count/that.pager.pageSize);
						that.startLoading = false;
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
		font-size: 15px;
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
