<template>
	<view>
		<view v-if="dataList.length > 0">
			<scroll-view scroll-y="true" lower-threshold="10" @scrolltolower="loadMoreDataList" :style="{'height':winHeight+'px'}">
				<view v-for="(player,idx) in dataList" class="blackplayer">
					<view class="headimg">
						<img :src="player.headimg" style="width:80rpx;height:80rpx;border-radius: 10rpx;"/>
						<text style="margin-left: 20rpx;">{{player.nickname}}</text>
					</view>
					<view @click="remove(player)"><text style="color: rgb(65, 172, 118);font-size: 15px;font-weight: bolder;">解除</text></view>
				</view>
			</scroll-view>
		</view>
		<view v-else>
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
		<!-- 提示窗 -->
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog confirmText="确认" cancelText="取消" content="是否确认移除黑名单？" @confirm="dialogConfirm"
				@close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import { getResponseData, showToastTip,getBaseUrl,getWsUrl} from "@/config/req.js";
	export default {
		data() {
			return {
				dataList:[],
				pager:{
					pageNo:1,
					pageSize:15,
					pages:0,
					total:0
				},
				selectPlayerId:'',
				winHeight:0,		//屏幕高度
			}
		},
		onLoad(){
			this.winHeight = uni.getSystemInfoSync().windowHeight-10;
			console.log("屏幕高度："+this.winHeight);
			this.getData();
		},
		// onShow(){
		// 	this.getData();
		// },
		methods: {
			getData(){
				const that = this;
				uni.showLoading({
					title:"加载中...",
					mask:true
				})
				getResponseData("/player/black/list",'GET',{
					pageNo:that.pager.pageNo,
					pageSize:that.pager.pageSize
				},function(res){
					if(res.code==0){
						that.pager.total = res.count;
						that.pager.pages = Math.ceil(that.pager.total/that.pager.pageSize);
						// that.dataList = res.data;
						res.data.forEach((item,idx)=>{
							that.dataList.push(item);
						})
					}else{
						showToastTip(res.msg);		
					}
				})	
			},
			loadMoreDataList(){
				console.log("lail")
				if(this.pager.pageNo<this.pager.pages){
					this.pager.pageNo++;
					this.getData();
				}
			},
			remove(player){
				this.selectPlayerId = player.id;
				this.$refs.alertDialog.open();
			},
			dialogClose(){
				this.$refs.alertDialog.close();
			},
			dialogConfirm(){
				const that = this;
				uni.showLoading({
					title:"处理中...",
					mask:true
				})
				getResponseData("/player/black/del",'POST',{
					id:that.selectPlayerId
				},function(res){
					if(res.code==0){
						that.dataList = [];
						that.pager.pageNo = 1;
						that.pager.pages = 0;
						that.getData();
					}else{
						showToastTip(res.msg);		
					}
				})	
			}
		}
	}
</script>

<style scoped>
	.blackplayer{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:30rpx;
		border-bottom: 1px solid #E4E7ED;
	}
	
	.headimg{
		display: flex;
		align-items: center;
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
