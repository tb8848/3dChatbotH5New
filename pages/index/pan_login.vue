<template>
	<view style="height: 100%;">
		<view v-if="viewId==''">
			<view v-for="(item,idx) in accountList"  class="mylist" style="background-color: #FFE4C4;">
				<view class="num"><text>{{idx+1}}</text></view>
				<view style="width: 50%;" @click="edit(item)">
					<view class="title">
						<text>{{item.lottery3dAccount}}({{item.lotteryType==0?"未知":(item.lotteryType==1?"福彩3D":"排列三")}})</text>
					</view>
				</view>
				<view style="display: flex;justify-content: flex-end;align-items: center;width: 36%;" v-if="item.activeStatus==0">
					<view class="btnLogin" style="background-color: #009688;" @click="login(item)"><text>登录</text></view>
					<!-- <view class="delPan" @click="delAccount(item.id)"><text>删除</text></view> -->
				</view>
				<view style="display: flex;justify-content: flex-end;align-items: center;width: 36%;" v-else>
					<view class="delPan" @click="exitPan(item.id)"><text>退出</text></view>
					<view class="delPan" style="background-color: #2e61ee;" @click="viewPan(item)"><text>查看</text></view>
				</view>
			</view>
			
			<view v-for="(item,idx) in emptyGrids" class="mylist">
				<view class="num" style="background-color: #C0C4CC;"><text>{{idx+1+accountList.length}}</text></view>
				<view>
					<text>待添加</text>
				</view>
				<view style="display: flex;justify-content: center;align-items: center;">
					<text class="btnLogin" @click="addNew">添加</text>
				</view>
			</view>
		</view>
		<view class="login-success" v-else>
			<view style="padding-top: 132px;"></view>
			<view class="account-bg">
				<view style="font-size: 14px;display: flex;justify-content: space-between;align-items: center;">
					<view></view>
					<view class="logout" @click="logout()">
						切换账号
						<image src="../../static/images/share.png" style="width: 14px;height: 13px;left: 1px;"></image>
					</view>
				</view>
				<view class="username">{{username}}</view>
				<view style="padding: 14px;font-size: 14px;display: flex;align-items: center;color: #57311e;;">
					<view style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;flex: 1;">
						<view style="margin-bottom: 7px;">
							盘口额度
						</view>
						<view class="pked">{{pked}}</view>
					</view>
					<view style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;flex: 1;padding-left: 10px;">
						<view style="margin-bottom: 7px;">
							盘口回水
						</view>
						<view class="pked">{{pkhs}}</view>
					</view>
					<view style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;flex: 1;padding-left: 10px;">
						<view style="margin-bottom: 7px;">
							盘口盈亏
						</view>
						<view class="pked">{{pkyk}}</view>
					</view>
				</view>
			</view>
			<view style="height: 12px;"></view>
			<view class="wc-bg card-wrap">
				<view style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 17px;box-sizing: border-box;">
					<view style="font-size: 18px;color: #2e61ee;font-weight: bolder;box-sizing: border-box;">{{lotteryName}}</view>
					<view style="font-size: 15px;box-sizing: border-box;color: #303133;">期号：{{issue}}</view>
				</view>
				<view style="display: flex;align-items: center;margin-bottom: 17px;justify-content: space-around;">
					<view class="code-bar">{{num1}}</view>
					<view class="code-bar">{{num2}}</view>
					<view class="code-bar">{{num3}}</view>
				</view>
				<view style="display: flex;justify-content: space-between;align-items: center;box-sizing: border-box;font-size: 14px;color: #303133;">
					更新时间：{{updateTime}}
				</view>
			</view>
			<view style="margin-top: 15px;">
				<view style="padding: 5px 10px;border-radius: 15px;width: 80px;text-align: center;color: white;background-color: #F1BF94;margin: auto;font-size: 15px;" @click="fanhui()">
					返回
				</view>
			</view>
			<!-- 提示窗 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog confirmText="确认" cancelText="取消" title="提示" content="是否退出网盘？" @confirm="dialogConfirm"
					@close="dialogClose"></uni-popup-dialog>
			</uni-popup>
		</view>
		<uni-popup ref="addNewAccount" type="center" backgroundColor="#fff">
			<view style="padding: 15px;">
				<view style="padding-bottom: 15px;border-bottom: 1px solid #DCDCDC;text-align: center;font-weight: bolder;">{{popTitle}}</view>
				<view class="form-item">
					<view class="input-item-title">网址：</view>
					<view><input focus placeholder="http://" class="input-item" v-model="url"/></view>
				</view>
				<view class="form-item">
					<view class="input-item-title">账号：</view>
					<view><input placeholder="请输入账号" class="input-item" v-model="uname"/></view>
				</view>
				<view class="form-item">
					<view class="input-item-title">密码：</view>
					<view><input placeholder="请输入密码" password="true" class="input-item" v-model="upwd"/></view>
				</view>
				<view class="form-item" @click="addOrUpdate()">
					<view class="login-btn" style="width: 100%;">
						<text style="color: white;font-size: 32rpx;">确定</text>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 提示窗 -->
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="tips" confirmText="确认" cancelText="取消" title="提示" content="确定要删除吗？" @confirm="dialogConfirm"
				@close="dialogClose"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="exitDialog" type="dialog">
			<uni-popup-dialog type="tips" confirmText="确认" cancelText="取消" title="提示" content="确定退出吗？" @confirm="exitConfirm"
				@close="exitClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import { playMusic, stopMusic} from "@/config/music.js";
	import { getResponseData, showToastTip,getBaseUrl,getWsUrl,getMainUrl} from "@/config/req.js";
	import { guid,parseUrl} from "@/config/tools.js";
	
	export default {
		data() {
			return {
				accountList:[],
				initGrids:10,
				emptyGrids:0,
				url:"",
				uname:"",
				upwd:"",
				panId:"",
				popTitle:"添加盘口",
				id:"",					//删除盘口ID
				exitId:"",				//退出登录ID
				viewId:"",				//查看盘口ID
				isLogin:false,			//是否登录
				username:"",			//用户名
				pked:"0",				//盘口额度
				pkhs:"0",				//盘口回水
				pkyk:"0",				//盘口盈亏
				issue:"",				//期号
				num1:"",
				num2:"",
				num3:"",
				updateTime:"",			//更新时间
				lotteryName:"未知",		//彩种类型名称
				lotteryType:0,			//彩种类型（0：未知  1：福彩3D  2：排列三）
			}
		},
		onShow() {
			stopMusic();
			this.verifyBotUserExpire();
			this.isPanLogin();
			this.accountList = [];
			this.emptyGrids = this.initGrids;
			this.getPanList();
			const that = this;
			if(this.viewId != ""){
				that.getDrawInfo(that.viewId);
			}
		},
		onLoad(){
			
		},
		methods: {
			fanhui(){
				uni.navigateBack();
			},
			//查看
			viewPan(item){
				uni.setStorageSync('pkToken',item.login3dToken);
				uni.setStorageSync('pkUid',item.id);
				this.viewId = item.id;
				this.username = item.lottery3dAccount;
				this.isLogin = true;
				const that = this;
				if(item.lotteryType==1){
					that.lotteryName = "福彩3D";
				}else if(item.lotteryType==2){
					that.lotteryName = "排列三";
				}else {
					that.lotteryName = "未知";
				}
				that.getDrawInfo(item.id);
			},
			//校验盘口是否登录
			isPanLogin(){
				const that = this;
				getResponseData("/pan/isUserPanLogin",'POST',"",function(res){
					if(res.code==0){	
						that.isLogin = true;
					}else {
						that.isLogin = false;
						that.viewId = "";
						uni.setStorageSync("pkUid","");
						uni.setStorageSync('pkToken',"");
					}
				})	
			},
			getDrawInfo(id){
				const that = this;
				getResponseData("/pan/getDrawInfo",'get',{id:id},function(res){
					if(res.code==4031){
						that.isLogin = false;
					}else if(res.code==200){
						that.pked = res.data.creditLimit;
						that.pkhs = res.data.huishuiCount;
						that.pkyk = res.data.yinkuiCount;
						that.issue = res.data.drawId
						that.num1 = res.data.drawResult2T;
						that.num2 = res.data.drawResult3T;
						that.num3 = res.data.drawResult4T;
						that.updateTime = res.data.drawTime;
					}
				})	
			},
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
			//切换账号
			logout(){
				this.isLogin = false;
				this.viewId = "";
			},
			//查询盘口列表
			getPanList(){
				const that = this;
				getResponseData("/pan/selectUserPan",'Get',{},function(res){
					if(res.code==200){	
						const length = res.data.length;
						if(length > 0){
							that.accountList = res.data;
							that.emptyGrids = that.initGrids-length;
						}else{
							that.accountList = [];
							that.emptyGrids = that.initGrids;
						}
					}
				})
			},
			addNew(){
				this.url = "";
				this.uname = "";
				this.upwd = "";
				this.panId = "";
				this.popTitle = "添加盘口"
				this.$refs.addNewAccount.open();
			},
			addOrUpdate(){
				if(this.url==""){
					showToastTip("请输入盘口地址"); //"请输入登录账号"	
					return;
				}
				if(this.uname==""){
					showToastTip("请输入登录账号"); //"请输入登录账号"	
					return;
				}
				if(this.upwd==""){
					showToastTip("请输入登录密码");
					return;
				}
				if(!this.url.startsWith("http://") && !this.url.startsWith("https://")){
					this.url = "https://"+this.url;
				}
				if(!this.url.endsWith("/")){
					this.url = this.url+"/";
				}
				const that = this;
				const mainUrl = getMainUrl();
				if(mainUrl==null || mainUrl=="" || mainUrl==undefined){
					if(this.panId==""){
						this.addAccount();
					}else{
						this.saveEdit();
					}
					return;
				}
				uni.request({
					url:getMainUrl()+"/checkDomain",
					method:"GET",
					data:{url:this.url},
					success: (res) => {
						console.log(res.data)
						if(res.data.code==200){
							if(res.data.data!=0){
								that.lotteryType = res.data.data.productType;
								if(this.panId==""){
									this.addAccount();
								}else{
									this.saveEdit();
								}
							}else{
								if(this.panId==""){
									this.addAccount();
								}else{
									this.saveEdit();
								}
							}
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:"error"
							})
						}
					},
					fail: () => {
						
					}
				})
			},
			edit(item){
				if(item.activeStatus==1){
					showToastTip("请先退出登录");
					return;
				}
				this.popTitle = "修改盘口"
				this.url = item.lottery3dUrl;
				this.uname = item.lottery3dAccount;
				this.upwd = item.lottery3dPwd;
				this.panId = item.id;
				this.$refs.addNewAccount.open();
			},
			delAccount(id){
				this.id = id;
				this.$refs.alertDialog.open();
			},
			dialogConfirm(){
				const that = this;
				getResponseData("/pan/delUserPan",'Get',{id:this.id},function(res){
					if(res.code==0){	
						uni.showToast({
							title:"删除成功",
							icon:"success"
						})
						that.getPanList();
					}else{
						uni.showToast({
							title:res.msg,
							icon:"error"
						})
					}
				})	
			},
			dialogClose(){
				
			},
			saveEdit(){
				const that = this;
				getResponseData("/pan/updUserPan",'POST',{
					lottery3dUrl:that.url,
					lottery3dAccount:that.uname,
					lottery3dPwd:that.upwd,
					lotteryType:that.lotteryType,
					id:that.panId
				},function(res){
					if(res.code==0){	
						uni.showToast({
							title:"修改成功",
							icon:"success"
						})
						that.$refs.addNewAccount.close();
						that.getPanList();
					}else{
						showToastTip(res.msg);		
					}
				})
			},
			login(item){
				const that = this;
				uni.showLoading({
					title:"登录中...",
					mask:true
				})
				getResponseData("/pan/loginUserPan",'POST',item,function(res){
					if(res.code==0){
						uni.showToast({
							title:"登录成功",
							icon:"success"
						})	
						that.getPanList();
						that.isLogin = true;
					}else if(res.status==500){
						showToastTip("参数错误");
					}else{
						showToastTip(res.msg);		
					}
				})	
			},
			addAccount(){
				const that = this;
				getResponseData("/pan/addUserPan",'POST',{
					lottery3dUrl:that.url,
					lottery3dAccount:that.uname,
					lottery3dPwd:that.upwd,
					lotteryType:that.lotteryType
				},function(res){
					if(res.code==0){	
						uni.showToast({
							title:"添加成功",
							icon:"success"
						})
						that.$refs.addNewAccount.close();
						that.getPanList();
					}else{
						showToastTip(res.msg);		
					}
				})
			},
			exitPan(id){
				this.exitId = id;
				this.$refs.exitDialog.open();
			},
			exitConfirm(){
				const that = this;
				getResponseData("/pan/exitUserPan",'POST',this.exitId,function(res){
					if(res.code==0){	
						uni.showToast({
							title:"退出成功",
							icon:"success"
						})
						that.getPanList();
					}else{
						showToastTip(res.msg);		
					}
				})
			},
			exitClose(){
				
			}
		}
	}
</script>

<style scoped>
	/deep/.uni-popup .uni-popup__wrapper {
		width: 80% !important;
		padding: 30rpx !important;
		border-radius: 20rpx;
		margin: 0 auto;
	}
	input{
		width: 200px;
	}
	.mylist{
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* padding: 15px; */
		border-bottom: 1px solid #E4E7ED;
	}
	
	.mylist .num{
		background-color: orangered;
		width: 14%;
		height: 40px;
		font-size: 24px;
		color:#fff;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.mylist .title{
		font-weight: bold;
		font-size: 16px;
		padding: 5px ;
		display: flex;
		justify-content: flex-start;
		
	}
	.mylist .title text{
		overflow: hidden; //超出部分隐藏
		-webkit-line-clamp: 1; //只显示两行
		text-overflow: ellipsis; //超出部分显示省略号
		display: -webkit-box; //将对象作为弹性伸缩盒子模型显示
		-webkit-box-orient: vertical; //设置或检索伸缩盒对象的子元素的排列方式 纵向
	}
	
	.mylist .subTitle{
		font-size: 13px;
		color: #808080;
		padding: 0px 0px 5px 5px;
		display: flex;
		justify-content: flex-start;
	}
	
	.mylist .btnLogin{
		width: 60px;
		height: 30px;
		border-radius: 5px;
		background-color: green;
		color: #fff;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 10px;
	}
	
	.delPan{
		width: 60px;
		height: 30px;
		border-radius: 5px;
		background-color: red;
		color: #fff;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 10px;
	}
	
	.form-item{
		margin-top: 30rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center
	}
	.input-item-title{
		padding: 10rpx 0rpx;
	}
	.input-item{
		background-color:#EBEEF5;
		height: 80rpx;
		line-height: 80rpx;
		padding-left: 10rpx;
		border-radius: 10rpx;
		margin-left:10rpx
	}
	
	.login-btn{
		height: 80rpx;
		border-radius: 10rpx;
		text-align: center;
		background-color: red;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 10px;
	}
	
	.oneRow{
		padding:5px
	}
	
	.ruleItem{
		width:49%;
		border:1px solid #aaa;		
		height: 120px;
	}
	
	.ruleItemSelected{	
		background-color: red;
	}
	.login-success{
		background: url(../../static/images/bg.png) no-repeat;
		background-size: auto;
		background-size: 100%;
		height: 456px;
	}
	.account-bg{
		margin: auto;
		width: 351px;
		height: 143px;
		background: url(../../static/images/bg1.png) no-repeat;
		background-color: rgba(0, 0, 0, 0);
		background-position-x: 0%;
		background-position-y: 0%;
		background-size: auto;
		background-size: 375px 160px;
		background-position: top -8px right -16px;
		background-color: #333;
	}
	.username{
		padding-left: 20px;
		font-size: 15px;
		color: #57311e;
		font-weight: bolder;
	}
	.pked{
		border-right: 1px solid #dfbc9b;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		padding-right: 10px;
		font-size: 20px;
		font-weight: bolder;
	}
	.wc-bg{
		background: linear-gradient(180deg,#fbf0e6,#fff);
		box-shadow: 0px 0px 6px 1px hsla(0,0%,65.9%,.16);
	}
	.card-wrap{
		margin: auto;
		margin-top: auto;
		width: 351px;
		padding: 12px 12px 21px 17px;
		opacity: 1;
		border-radius: 10px;
		box-sizing: border-box;
	}
	.code-bar{
		width: 38px;
		height: 38px;
		line-height: 38px;
		text-align: center;
		background: #e04a48;
		border-radius: 50%;
		font-size: 22px;
		font-weight: 700;
		opacity: 1;
		color: #fff;
		margin-right: 7px;
		box-sizing: border-box;
	}
	.logout{
		color: #c8b5aa;
		font-size: 10px;
		padding-right: 7px;
		padding-top: 2px;
		display: flex;
		align-items: center;
	}
	.uni-popup__error{
		color: #303133 !important;
	}
	.notLogin{
		background: url(../../static/images/bg2.png) no-repeat;
		background-size: 100% 100%;
		height: 723px;
	}
	.input{
		width: 334px;
		height: 34px;
		margin: 0 auto;
		margin-top: 25px;
		border-bottom: 1px solid #dfdfdf;
		display: flex;
		align-items: center;
	}
	.urlInput{
		width: 300px;
		height: 34px;
		line-height: 34px;
		padding-left: 11px;
		font-size: 13px;
		color: #999;
		display: block;
		min-height: 1.4em;
		overflow: hidden;
	}
	.loginBtn{
		width: 345px;
		height: 45px;
		line-height: 45px;
		text-align: center;
		background-color: #2e61ee;
		border-radius: 25px;
		font-size: 16px;
		color: #fff;
		margin: 0 auto;
		margin-top: 35px;
	}
</style>
