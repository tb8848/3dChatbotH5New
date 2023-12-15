<template>
	<view style="color: #303133;font-size: 14px;">
		<view style="background: #fff;box-sizing: border-box;">
			<view style="height: auto;background-color: rgb(255, 255, 255);">
				<view style="position: static;width: 375px;">
					<view class="items">
						<view class="item" @click="getLog(1)">
							<text :class="{'active':isActive==1}">当日</text>
						</view>
						<view class="item" @click="getLog(2)">
							<text :class="{'active':isActive==2}">昨日</text>
						</view>
						<view class="item" @click="getLog(3)">
							<text :class="{'active':isActive==3}">本周</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="margin-top: 10px;">
			<scroll-view scroll-y="true" lower-threshold="10" @scrolltolower="loadMoreLogList" :style="{'height':winHeight+'px'}">
				<view v-if="logList.length > 0">
					<view v-for="(item,index) in logList" class="logItem">
						 <view style="margin-bottom: 10px;display: flex;align-items: center;">
							 <text>【{{item.contents}}】</text>
						 </view>
						 <view style="font-size: 13px;color: #999;">
							 操作时间：{{item.optTime}}
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
				isActive:1,
				logList:[],//操作记录
				logListSearch:{
					dayRange:1,
					pageNo:1,
					pageSize:10	
				},
				pager:{
					pages:-1,
					total:0,
					pageNo:1,
					pageSize:10
				},
				winHeight:0
			}
		},
		onLoad() {
			this.getLog(1);
			this.winHeight = uni.getSystemInfoSync().windowHeight-46;
		},
		methods: {
			getLog(i){
				this.logList = [];
				this.isActive = i;
				this.pager.pageNo = 1;
				this.pager.pages = -1;
				this.logListSearch.dayRange = i;
				this.logListSearch.pageNo = 1;
				this.getLogList();
			},
			getLogList(){
				const that = this;
				getResponseData("/userLog/getUserLogByPage",'get',this.logListSearch,function(res){
					if(res.code==0){						
						res.data.forEach((item,idx)=>{
							that.logList.push(item);
						})
						that.pager.total = res.count;
						that.pager.pages = Math.ceil(res.count/that.pager.pageSize);
						console.log(that.pager)
					}else{
						showToastTip(res.msg);	
					}
				})
			},
			loadMoreLogList(){
				if(this.pager.pageNo<this.pager.pages){
					this.logListSearch.pageNo++;
					this.getLogList();
				}
			}
		}
	}
</script>

<style>
	page{
		background-color: #f5f5f5;
	}
	.items{
		display: flex;
		box-sizing: border-box;
		flex-direction: row;
		height: 36px;
		overflow: hidden;
		cursor: pointer;
	}
	.item{
		border-color: rgb(46, 97, 238);
		display: inline-flex;
		box-sizing: border-box;
		position: relative;
		flex: 1;
		justify-content: center;
		align-items: center;
	}
	.active{
		color: rgb(46, 97, 238);
		border-bottom: 2px solid rgb(46, 97, 238);
		padding: 6px 0;
	}
	.followlist{
		margin-top: 15px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
	.logItem{
		margin: 0 auto;
		width: 96%;
		padding: 14px 11px;
		background: #fff;
		opacity: 1;
		border-radius: 12px;
		margin-bottom: 8px;
		box-sizing: border-box;
	}
</style>
