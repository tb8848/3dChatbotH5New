<template>
	<view style="background-color: #f5f5f5;min-height: 100%;padding:20rpx">
		<view class="container font26">
			<view class="oneRow">
				<view style="display: flex;align-items: center;font-weight: bolder;font-size: 14px;">
					<img src="../../static/images/account-icon.png" style="width: 30rpx;height: 30rpx;"/>
					<text style="margin-left:10rpx">ID:</text>
					<text style="margin-left:10rpx">{{info.id}}</text>
				</view>
				<view style="display: flex;align-items: center;font-weight: bolder;font-size: 14px;" @click="logout()">
					<text style="margin-right:10rpx;color:orangered">退出登录</text>
					<img src="../../static/images/logout-icon.png" style="width: 30rpx;height: 30rpx;"/>
				</view>
			</view>
			<view class="oneRow">
				<view style="display: flex;align-items: center;">
					<view class="view-icon">
						<image src="../../static/images/ip-icon.png" class="view-image"></image>
					</view>
					<text style="margin-left:10rpx;padding-right: 10px;">上次登录<br>IP：{{info.ip}}</text>
				</view>
				<view style="text-align: center;">
					<view style="width: 1px;border-right:1px solid #EDEDED;height: 60rpx;"></view>
				</view>
				<view>
					<text style="margin-left:10rpx;padding-left: 8px;">{{info.logTime}}</text>
				</view>
			</view>
			<view class="oneRow">
				<view style="display: flex;align-items: center;">
					<img src="../../static/images/due-time-icon.png" style="width: 30rpx;height: 30rpx;"/>
					<text style="margin-left:10rpx">到期时间:</text>
					<text style="margin-left:10rpx">{{info.dueTime}}</text>
				</view>
				<view style="display: flex;align-items: center;">
					<img src="../../static/images/online-icon.png" style="width: 30rpx;height: 30rpx;"/>
					<text style="margin-left:10rpx">在线人数</text>
					<text style="margin-left:10rpx">{{info.onlineUsers}}</text>
				</view>
			</view>
			<view class="oneRow font30" style="border-top: 1px solid #EDEDED;padding-top:30rpx;margin-bottom: 0;">
				<view style="margin: 0 auto;">
					<text style="font-size: 14px;">私聊下注</text>						
					<switch style="transform:scale(0.6)" :checked="info.setting.wxChatBuy==1" @change="upSetting('wxChatBuy')"></switch>
				</view>
				<view style="text-align: center;">
					<view style="width: 1px;border-right:1px solid #EDEDED;height: 60rpx;"></view>
				</view>
				<view style="margin: 0 auto;">
					<text style="font-size: 14px;">房间开关</text>
					<switch style="transform:scale(0.6)" :checked="info.setting.roomOpen==1" @change="upSetting('roomOpen')"></switch>
				</view>
			</view>
		</view>		
		
		<view class="container fontWeight" style="margin-top:30rpx;font-size: 14px;">
			<view style="display: flex;justify-content: space-between;margin-bottom:30rpx;align-items: center;">
				<view style="display: flex;align-items: center;" @click="upSetting('wxGroupSend')">										
					<checkbox style="transform: scale(0.8)" :checked="info.setting.wxGroupSend==1" color="#007AFF"></checkbox><text style="margin-left:10rpx">微信群发图片</text>
				</view>
				<view style="display: flex;align-items: center;" @click="upSetting('tuimaEnable')">
					<checkbox style="transform: scale(0.8)" :checked="info.setting.tuimaEnable==1" color="#007AFF"></checkbox><text style="margin-left:10rpx">启用退码功能</text>
				</view>
			</view>
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view style="display: flex;align-items: center;" @click="upSetting('wxChatSend')">										
					<checkbox style="transform: scale(0.8)" :checked="info.setting.wxChatSend==1" color="#007AFF"></checkbox><text style="margin-left:10rpx">私聊发送图片</text>
				</view>
				<view style="display: flex;align-items: center;" @click="upSetting('kuaixuanEnable')">
					<checkbox style="transform: scale(0.8)" :checked="info.setting.kuaixuanEnable==1" color="#007AFF"></checkbox><text style="margin-left:10rpx">启用快选功能</text>
				</view>
			</view>
		</view>		
		
		<!--常用功能 -->
		<view class="container font32" style="margin-top:30rpx;color: #303133;">
			<view style="margin-bottom:30rpx;font-size: 32rpx;font-weight: bold;">常用功能</view>
			<view style="margin-top:10rpx;font-size: 14px;">
				<uni-grid :column="4" :showBorder="false"  :square="false">
					<uni-grid-item>
						<view class="grid-item-box" style="background-color: #fff;height:100rpx" @click="showPop('createPlayer')">
							<img src="../../static/images/create-vip-icon.png" style="height: 52rpx;width: 52rpx;"/>
							<text class="text">创建会员</text>
						</view>
					</uni-grid-item>
					<uni-grid-item>
						<view class="grid-item-box" style="background-color: #fff;height:100rpx" @click="setOdds">
							<img src="../../static/images/odds-icon.png" style="height: 52rpx;width: 52rpx;"/>
							<text class="text">赔率设置</text>
						</view>
					</uni-grid-item>
					<uni-grid-item>
						<view class="grid-item-box" style="background-color: #fff;height:100rpx" @click="showPop('hsSet')">
							<img src="../../static/images/hs-icon.png" style="height: 52rpx;width: 52rpx;"/>
							<text class="text">回水设置</text>
						</view>
					</uni-grid-item>
					<uni-grid-item>
						<view class="grid-item-box" style="background-color: #fff;height:100rpx" @click="showPop('addDummy')">
							<img src="../../static/images/robot-icon.png" style="height: 52rpx;width: 52rpx;"/>
							<text class="text">添加假人</text>
						</view>
					</uni-grid-item>
					<uni-grid-item>
						<view class="grid-item-box" style="background-color: #fff;height:100rpx" @click="operationLog">
							<img src="../../static/images/logs-icon.png" style="height: 52rpx;width: 52rpx;"/>
							<text class="text">操作日志</text>
						</view>
					</uni-grid-item>
					<uni-grid-item>
						<view class="grid-item-box" style="background-color: #fff;height:100rpx" @click="lhzc">
							<img src="../../static/images/lanhuo-icon.png" style="height: 52rpx;width: 52rpx;"/>
							<text class="text">拦货占成</text>
						</view>
					</uni-grid-item>
					<uni-grid-item>
						<view class="grid-item-box" style="background-color: #fff;height:100rpx" @click="wipeData">
							<img src="../../static/images/clear-icon.png" style="height: 52rpx;width: 52rpx;"/>
							<text class="text">清空数据</text>
						</view>
					</uni-grid-item>
					<uni-grid-item>
						<view class="grid-item-box" style="background-color: #fff;height:100rpx" @click="showPop('editPwd')">
							<img src="../../static/images/pwd-icon.png" style="height: 52rpx;width: 52rpx;"/>
							<text class="text">修改密码</text>
						</view>
					</uni-grid-item>
					<uni-grid-item>
						<view class="grid-item-box" style="background-color: #fff;height:100rpx" @click="toPointsList">
							<img src="../../static/images/points-icon.png" style="height: 52rpx;width: 52rpx;"/>
							<text class="text">上下分记录</text>
						</view>
					</uni-grid-item>
					<uni-grid-item>
						<view class="grid-item-box" style="background-color: #fff;height:100rpx" @click="isSetSafePassword(1)">
							<img src="../../static/images/safety-pwd.png" style="height: 52rpx;width: 52rpx;"/>
							<text class="text">安全密码</text>
						</view>
					</uni-grid-item>
					<uni-grid-item>
						<view class="grid-item-box" style="background-color: #fff;height:100rpx" @click="toBlackList()">
							<img src="../../static/images/blacklist-icon.png" style="height: 52rpx;width: 52rpx;"/>
							<text class="text">黑名单管理</text>
						</view>
					</uni-grid-item>
					<uni-grid-item>
						<view class="grid-item-box" style="background-color: #fff;height:100rpx" @click="help()">
							<img src="../../static/images/intro-icon.png" style="height: 52rpx;width: 52rpx;"/>
							<text class="text">使用说明</text>
						</view>
					</uni-grid-item>
				</uni-grid>
			</view>		
		</view>		
		
		<!-- <view style="margin:30rpx;text-align: center;font-size: 13px;color: rgb(102, 102, 102);">
			<text style="padding-right: 6px;color: rgb(219, 219, 219);">——————</text>
			小犇科技提供技术支持
			<text style="padding-left: 6px;color: rgb(219, 219, 219);">——————</text>
		</view> -->
		
		<!-- 创建会员 -->
		<uni-popup ref="createPlayer" type="center" background-color="#fff" :mask-click="true" class="poplayer">
			<view>
				<view style="display: flex;justify-content:space-between">
					<view  style="width: 10%;"></view>
					<view  style="width: 80%;text-align: center;font-weight: 700;"><text>创建会员</text></view>
					<view  style="width: 10%;" @click="closePop('createPlayer')"><uni-icons type="closeempty" size="20"></uni-icons></view>
				</view>
				<view style="text-align: center;margin:40rpx">
					<view v-if="headimg==''"><img src="../../static/logo.png" /></view>
					<view v-else><img :src="'https://images.weserv.nl/?url='+headimg" style="width: 71px;height: 71px;border-radius: 5px;"/></view>
					<view style="margin-top:10rpx;color: #2e61ee;font-size: 15px;" @click="chooseImg()"><text>随机更换头像</text></view>
				</view>
				<view style="font-size: 15px;margin-top: 30px;">
					<view style="color: #999;"><text>昵称</text></view>
					<view style="margin-top:20rpx;color:#333;">
						<input type="text" placeholder="请输入昵称" style="border-bottom: 1px solid #E4E7ED;padding-bottom: 10px;font-size: 15px;" v-model="playerNick"/>
					</view>
				</view>
				<view class="addJiaRen" @click="createPlayer()">
					<text>生成链接并复制</text>
				</view>
			</view>
		</uni-popup>
		
		<!-- 修改密码 -->
		<uni-popup ref="editPwd" type="center" background-color="#fff" :mask-click="true" class="poplayer">
			<view>
				<view style="display: flex;justify-content:space-between">
					<view  style="width: 10%;"></view>
					<view  style="width: 80%;text-align: center;color: #333;font-weight: 700;font-size: 16px;"><text>修改密码</text></view>
					<view  style="width: 10%;" @click="closePop('editPwd')"><uni-icons type="closeempty" size="20"></uni-icons></view>
				</view>
				<view style="padding-bottom: 30rpx;border-bottom: 1px solid #DCDFE6;padding-top: 20px;">
				<view style="display: flex;justify-content: space-between;margin-top:50rpx">
					<text style="font-size: 15px;font-weight: bolder;">原密码</text>
					<input type="text" placeholder="请输入原密码" v-model="pwds.oldpwd" style="text-align: right;font-size: 15px;"/></view>
				<view style="display: flex;justify-content: space-between;margin-top:50rpx">
					<text style="font-size: 15px;font-weight: bolder;">新密码</text>
					<input type="text" placeholder="请输入新密码"  v-model="pwds.newpwd" style="text-align: right;font-size: 15px;"/></view>
				<view style="display: flex;justify-content: space-between;margin-top:50rpx">
					<text style="font-size: 15px;font-weight: bolder;">确认新密码</text>
					<input type="text" placeholder="请再次输入新密码"  v-model="pwds.newpwd1" style="text-align: right;font-size: 15px;"/></view>
				</view>
				<view class="addJiaRen" @click="editPwd()">
					<text>确定</text>
				</view>
			</view>
		</uni-popup>
		
		<!-- 重置安全密码 -->
		<uni-popup ref="safePwd" type="center" background-color="#fff" :mask-click="true" class="poplayer">
			<view>
				<view style="display: flex;justify-content:space-between">
					<view  style="width: 10%;"></view>
					<view  style="width: 80%;text-align: center;font-size: 16px;color: #333;font-weight: 700;"><text>重置安全密码</text></view>
					<view  style="width: 10%;" @click="closePop('safePwd')"><uni-icons type="closeempty" size="20"></uni-icons></view>
				</view>
				<view style="padding-bottom: 30rpx;border-bottom: 1px solid #DCDFE6;padding-top: 20px;">
					<view style="display: flex;justify-content: space-between;margin-top:50rpx">
						<text style="font-size: 15px;font-weight: bolder;">输入原密码</text>
						<input type="password" placeholder="请输入旧的安全密码" v-model="pwds.spwd" style="text-align: right;font-size: 15px;" maxlength="8"/></view>
						<view style="display: flex;justify-content: space-between;margin-top:50rpx">
						<text style="font-size: 15px;font-weight: bolder;">新密码</text>
						<input type="password" placeholder="请输入新的安全密码" v-model="pwds.snewpwd" style="text-align: right;font-size: 15px;" maxlength="8"/>
					</view>
				</view>
				<view style="font-size: 12px;margin:30rpx 0rpx">安全密码需要8位数字，包含大小写英文字母数字等</view>
				<view class="addJiaRen" @click="setSafePwd">
					<text>确定</text>
				</view>
			</view>
		</uni-popup>
		
		<!-- 设置安全密码 -->
		<uni-popup ref="setSafePassword" type="center" background-color="#fff" :mask-click="true" class="poplayer">
			<view>
				<view style="display: flex;justify-content:space-between">
					<view  style="width: 10%;"></view>
					<view  style="width: 80%;text-align: center;font-size: 16px;color: #333;font-weight: 700;"><text>设置安全密码</text></view>
					<view  style="width: 10%;" @click="closePop('setSafePassword')"><uni-icons type="closeempty" size="20"></uni-icons></view>
				</view>
				<view style="padding-bottom: 30rpx;border-bottom: 1px solid #DCDFE6;padding-top: 20px;">
					<view style="display: flex;justify-content: space-between;margin-top:50rpx">
						<text style="font-size: 15px;font-weight: bolder;">密码</text>
						<input type="password" placeholder="请输入安全密码" v-model="userSafePassword" style="text-align: right;font-size: 15px;" maxlength="8"/>
					</view>
				</view>
				<view style="font-size: 12px;margin:30rpx 0rpx">安全密码需要8位数字，包含大小写英文字母数字等</view>
				<view class="addJiaRen" @click="setSafePassword">
					<text>确定</text>
				</view>
			</view>
		</uni-popup>
		
		<!-- 回水设置 -->
		<uni-popup ref="hsSet" type="center" background-color="#fff" :mask-click="true" class="poplayer">
			<view>
				<view style="display: flex;justify-content:space-between;">
					<view  style="width: 10%;"></view>
					<view  style="width: 80%;text-align: center;color: #333;font-weight: 700;"><text>回水设置</text></view>
					<view  style="width: 10%;" @click="closePop('hsSet')"><uni-icons type="closeempty" size="20"></uni-icons></view>
				</view>
				<view style="padding-bottom: 30rpx;border-bottom: 1px solid #DCDFE6;margin-top: 36px;">
					<view style="display: flex;justify-content: space-between;margin-top:50rpx">
						<text style="font-size: 15px;font-weight: bolder;">玩家返回比例：</text>
						<input type="number" v-model="info.setting.hsvalue" maxlength="3" style="text-align: right;" @input="inputNumber" />
					</view>
				</view>
				<view style="margin:30rpx 0rpx;">
					<view style="font-size: 24rpx;margin:30rpx 0rpx;color: red;">回水按照一万返多少填写(例：一万流水返80就填80)</view>
					<view style="display: flex;justify-content: flex-start;">
						<view style="display: flex;align-items: center;margin-right: 20rpx;"  @click="hsChkSelect('hsHelpBack')">
							<checkbox style="transform: scale(0.8)" :checked="info.setting.hsHelpBack==1" color="#007AFF"></checkbox><text style="margin-left:10rpx">玩家自助回水</text>
						</view>
						<view style="display: flex;align-items: center;" @click="hsChkSelect('hsAutoBack')">
							<checkbox style="transform: scale(0.8)" :checked="info.setting.hsAutoBack==1" color="#007AFF"></checkbox><text style="margin-left:10rpx">停盘后自动返</text>
						</view>
					</view>
				</view>
				<view class="addJiaRen" @click="isSetSafePassword(2)">
					<text style="font-size: 14px;">确定</text>
				</view>
			</view>
		</uni-popup>
		
		<!-- 添加假人 -->
		<uni-popup ref="addDummy" type="center" background-color="#fff" :mask-click="true" class="poplayer">
			<view>
				<view style="padding-bottom: 30rpx;margin-top: 16px;font-size: 14px;">
					<view style="display: flex;justify-content: space-between;margin-top:50rpx">
						<view><text style="font-weight: bolder;">机器人数量：</text></view>
						<view style="display: flex;">
							<input type="number" v-model="robotNum" style="text-align: right;padding-right: 6px;" maxlength="2" @input="inputRobotNum" />
							<text>个</text>
						</view>
					</view>
				</view>
				<view style="margin:20rpx 0rpx;">
					<view style="font-size: 14px;margin:30rpx 0rpx;color: #e04a48;">最多只能创建15个假人</view>
				</view>
				<view class="addJiaRen" @click="addDummy()">
					<text style="font-size: 14px;">批量创建</text>
				</view>
			</view>
		</uni-popup>
		
		<!-- 验证安全密码  -->
		<uni-popup ref="safeVerify" type="center" background-color="#fff" :mask-click="true">
			<view>
				<view style="display: flex;justify-content:space-between;">
					<view  style="width: 10%;"></view>
					<view  style="width: 80%;text-align: center;color: #333;font-weight: 700;"><text>验证安全密码</text></view>
					<view  style="width: 10%;" @click="closePop('safeVerify')"><uni-icons type="closeempty" size="20"></uni-icons></view>
				</view>
				<view style="padding-bottom: 30rpx;margin-top: 16px;font-size: 14px;">
					<view style="display: flex;justify-content: space-between;margin-top:50rpx">
						<text style="font-weight: bolder;">密码：</text>
						<input type="password" v-model="safePassword" style="text-align: right;" placeholder="请输入安全密码" />
					</view>
				</view>
				<view class="addJiaRen" @click="safeVerify()">
					<text style="font-size: 14px;">确定</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { playMusic, stopMusic} from "@/config/music.js";
	import { getResponseData, showToastTip,getBaseUrl,getWsUrl,getHost,getForMatUrl} from "@/config/req.js";
	export default {
		data() {
			return {
				info:{
					id:'',
					ip:'',
					logTime:'',
					dueTime:'',
					onlineUsers:0,
					setting:{
						
					}
				},
				playerNick:'',
				pwds:{
					oldpwd:'',
					newpwd:'',
					newpwd1:'',
					spwd:'',
					snewpwd:''
				},
				headimg:'',
				robotNum:'',//机器人数量
				safePassword:"",//校验安全密码
				userSafePassword:"",//设置安全密码
			}
		},
		onLoad() {

		},
		onShow(){
			stopMusic();
			this.verifyBotUserExpire();
			this.getInfo(0);
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
			inputNumber(event){
				var value = event.target.value;
				// console.log("输入的值："+value);
			},
			inputRobotNum(event){
				var value = event.target.value;
				if(value > 15){
					this.robotNum = 15;
				}
			},
			addDummy(){
				const that = this;
				if(this.robotNum!="" && this.robotNum!=null && this.robotNum!=undefined){
					uni.showLoading({
						title:"处理中...",
						mask:true
					})
				}else{
					showToastTip("请输入添加机器人数量！");
					return;
				}
				if(!(/(^[1-9]\d*$)/.test(this.robotNum))){
					showToastTip("请输入正整数！");
					return;
				}
				if(this.robotNum > 15){
					showToastTip("最多创建15个假人！");
					this.robotNum = 15;
					return;
				}
				if(this.robotNum < 1){
					showToastTip("数量必须大于0！");
					return;
				}
				getResponseData("/player/dummy/add",'GET',{
					amount:that.robotNum
				},function(res){
					if(res.code==0){	
						uni.showToast({
							title:"添加成功",
							icon:'none',
							duration:3000
						})
						that.closePop('addDummy')
						//that.getInfo();
					}else{
						showToastTip(res.msg);		
					}
				})
			},
			toPointsList(){
				uni.navigateTo({
					url:"/pages/setup/updown-points"
				})
			},
			toBlackList(){
				uni.navigateTo({
					url:"/pages/setup/blacklist"
				})
			},
			upSetting(fieldName){
				const that = this;
				switch(fieldName){
					case 'kuaixuanEnable':
						this.info.setting.kuaixuanEnable = (this.info.setting.kuaixuanEnable==1?0:1);
						break;
					case 'wxChatSend':
						this.info.setting.wxChatSend = (this.info.setting.wxChatSend==1?0:1);
						break;
					case 'tuimaEnable':
						this.info.setting.tuimaEnable = (this.info.setting.tuimaEnable==1?0:1);
						break;
					case 'wxGroupSend':
						this.info.setting.wxGroupSend = (this.info.setting.wxGroupSend==1?0:1);
						break;
					case 'wxChatBuy':
						this.info.setting.wxChatBuy = (this.info.setting.wxChatBuy==1?0:1);
						break;
					case 'roomOpen':
						this.info.setting.roomOpen = (this.info.setting.roomOpen==1?0:1);
						break;
				}
				uni.showLoading({
					title:"处理中...",
					mask:true
				})
				getResponseData("/user/editSetting",'POST',that.info.setting,function(res){
					if(res.code==0){	
						var msg = "";
						if(fieldName=='wxChatBuy'){
							that.info.setting.wxChatBuy==1?msg='私聊开启':msg='私聊关闭'
							uni.showToast({
								title:msg,
								icon:'none',
								duration:3000
							})
						}else if(fieldName=='roomOpen'){
							that.info.setting.roomOpen==1?msg='房间开启':msg='房间关闭'
							uni.showToast({
								title:msg,
								icon:'none',
								duration:3000
							})
						}
						//that.getInfo();
					}else{
						showToastTip(res.msg);		
					}
				})	
				
			},
			hsChkSelect(fieldName){//复选框切换
				switch(fieldName){
					case 'hsHelpBack':
						this.info.setting.hsHelpBack = (this.info.setting.hsHelpBack==1?0:1);
						break;
					case 'hsAutoBack':
						this.info.setting.hsAutoBack = (this.info.setting.hsAutoBack==1?0:1);
						break;					
				}
			},
			getInfo(type){
				const that = this;
				uni.showLoading({
					title:"加载中...",
					mask:true
				})
				if(type == 1){
					uni.showToast({
						title:'回水设置成功',
						icon:'success',
						duration:3000
					})
				}
				getResponseData("/user/info",'GET',{},function(res){
					if(res.code==0){
						// console.log("======info====",res.data)
						that.info = res.data;
						uni.setStorageSync("lotteryType",res.data.lotteryType)
					}else{
						showToastTip(res.msg);		
					}
				})	
			},
			logout(){
				uni.showLoading({
					title:"正在退出...",
					mask:true
				})
				const token = uni.getStorageSync("token");
				if(token==null || token=="" || token==undefined){
					uni.redirectTo({
						url:"/pages/login"
					})
				}
				getResponseData("/logout",'GET',{},function(res){
					uni.removeStorageSync('token');
					uni.removeStorageSync('uname');
					uni.removeStorageSync('pkToken');
					uni.removeStorageSync('pkUid');
					if(res.code==0){
						uni.redirectTo({
							url:"/pages/login"
						})
					}else{
						uni.redirectTo({
							url:"/pages/login"
						})
						// showToastTip(res.msg);		
					}
				})
			},
			showPop(refName){
				switch(refName){
					case 'createPlayer':
						this.chooseImg();
						this.$refs.createPlayer.open();
						break;
					case 'editPwd':
						this.$refs.editPwd.open();
						break;
					case 'safePwd':
						this.$refs.safePwd.open();
						break;
					case 'hsSet':
						this.$refs.hsSet.open();
						break;
					case 'addDummy':
						this.$refs.addDummy.open();
						break;
					case 'safeVerify':
						this.$refs.safeVerify.open();
						break;
					case 'setSafePassword':
						this.$refs.setSafePassword.open();
						break;
				}
			},
			closePop(refName){
				switch(refName){
					case 'createPlayer':
						this.$refs.createPlayer.close();
						this.playerNick = "";
						break;
					case 'editPwd':
						this.$refs.editPwd.close();
						this.pwds.oldpwd = "";
						this.pwds.newpwd = "";
						this.pwds.newpwd1 = "";
						break;
					case 'safePwd':
						this.$refs.safePwd.close();
						this.pwds.spwd = "";
						this.pwds.snewpwd = "";
						break;
					case 'hsSet':
						this.$refs.hsSet.close();
						break;
					case 'addDummy':
						this.$refs.addDummy.close();
						this.robotNum = "";
						break;
					case 'safeVerify':
						this.$refs.safeVerify.close();
						this.safePassword = "";
						break;
					case 'setSafePassword':
						this.$refs.setSafePassword.close();
						this.userSafePassword = "";
						break;
				}
			},
			createPlayer(){
				const that = this;
				if(this.playerNick==""){
					return;
				}
				uni.showLoading({
					title:"处理中...",
					mask:true
				})
				getResponseData("/player/add",'POST',{
					nickname:that.playerNick,
					headimg:that.headimg
				},function(res){
					if(res.code==0){
						uni.showToast({
							title:'添加成功',
							icon:'none',
							duration:3000
						})
						that.closePop('createPlayer')
					}else{
						showToastTip(res.msg);		
					}
				})	
			},
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
				if(this.pwds.newpwd1!=this.pwds.newpwd1){
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
						uni.redirectTo({
							url:"/pages/login"
						})
					}else{
						showToastTip(res.msg);		
					}
				})	
			},
			//重置安全密码
			setSafePwd(){
				const that = this;
				if(this.pwds.spwd==""){
					showToastTip("原密码不能为空");
					return;
				}
				if(this.pwds.snewpwd==""){
					showToastTip("新密码不能为空");
					return;
				}
				uni.showLoading({
					title:"处理中...",
					mask:true
				})
				getResponseData("/user/editSafePwd",'POST',{
					spwd:that.pwds.spwd,
					snewpwd:that.pwds.snewpwd
				},function(res){
					that.pwds.spwd="";
					that.pwds.snewpwd="";
					if(res.code==0){
						uni.showToast({
							title:'重置成功',
							icon:'none',
							duration:3000
						})
						that.closePop("safePwd")
					}else{
						showToastTip(res.msg);		
					}
				})	
			},
			//设置安全密码
			setSafePassword(){
				const that = this;
				getResponseData("/user/setSafePassword",'get',{
					safePassword:that.userSafePassword
				},function(res){
					if(res.code==0){	
						uni.showToast({
							title:'设置成功',
							icon:'success',
						})
						that.closePop("setSafePassword");
					}else{
						showToastTip(res.msg);
					}
				})	
			},
			//判断是否设置安全密码
			isSetSafePassword(type){
				const that = this;
				if(type == 2){
					const hsvalue = this.info.setting.hsvalue;
					if(hsvalue=="" || hsvalue==null || hsvalue==undefined){
						showToastTip("请输入回水值！");
						return;
					}
					if(hsvalue != 0){
						if(!(/(^[1-9]\d*$)/.test(hsvalue))){
							showToastTip("请输入正整数！");
							return;
						}
					}
					if(hsvalue.length > 3){
						showToastTip("不能大于1000！");
						that.info.setting.hsvalue = hsvalue.substring(0,3);
						return;
					}
				}
				getResponseData("/user/isSetSafePassword",'POST',"",function(res){
					if(res.code==0){
						if(type == 1){
							that.showPop("safePwd");
						}else {
							that.showPop("safeVerify");
						}
					}else{
						if(type==1){
							that.showPop("setSafePassword");
						}else{
							that.setHs();
						}
					}
				})	
			},
			//校验安全密码
			safeVerify(){
				const that = this;
				const safePwd = this.safePassword;
				if(safePwd=="" || safePwd==null || safePwd==undefined){
					showToastTip("请输入安全密码！");
					return;
				}
				getResponseData("/user/verifySafePassword",'get',{safePassword:safePwd},function(res){
					if(res.code==0){
						that.closePop('safeVerify');
						that.setHs();
					}else{
						showToastTip(res.msg);
						that.safePassword = "";
					}
				})	
			},
			setHs(){
				const that = this;
				const hsvalue = this.info.setting.hsvalue;
				if(hsvalue=="" || hsvalue==null || hsvalue==undefined){
					showToastTip("请输入回水比例！");
					return;
				}
				uni.showLoading({
					title:"处理中...",
					mask:true
				})
				getResponseData("/user/editSetting",'POST',that.info.setting,function(res){
					if(res.code==0){
						that.closePop('hsSet');
						that.getInfo(1);
					}else{
						showToastTip(res.msg);		
					}
				})	
			},
		
			help(){
				// uni.showToast({
				// 	title:'高智商的人，不需要教程',
				// 	icon:'none',
				// 	duration:3000
				// })
				uni.navigateTo({
					url:"/pages/setup/sendFormat"
				})
			},
			chooseImg(){
				const that = this;
				getResponseData("/chooseImg",'get',{},function(res){
					if(res.code==0){					
						// that.headimg = getBaseUrl()+"/downHeadimg?imgName="+res.data;
						that.headimg = res.data;
					}else{
						showToastTip(res.msg);		
					}
				})	
			},
			setOdds(){
				uni.navigateTo({
					url:"/pages/setup/setOdds"
				})
			},
			operationLog(){
				uni.navigateTo({
					url:"/pages/setup/operationLog"
				})
			},
			lhzc(){
				uni.showToast({
					title:"功能还在建设中",
					icon:"none"
				})
			},
			wipeData(){
				uni.showLoading({
					title:"加载中",
					mask:true
				})
				uni.showToast({
					title:"已清空",
					icon:"success"
				})
			}
		}
	}
</script>

<style scoped>
	page{
		background-color: #f5f5f5;
	}
	
	/deep/.uni-popup .uni-popup__wrapper {
		width: 80% !important;
		padding: 30rpx;
		border-radius: 20rpx;
	}

	.container{
		background-color: #fff;
		padding:30rpx;
		border-radius: 12px;
	}
	
	.oneRow{
		display: flex;
		justify-content: space-between;
		margin-bottom:30rpx;
		align-items: center;
		color: #303133;
	}
	
	.font26{
		font-size: 26rpx;
	}
	
	.font32{
		font-size: 32rpx;
	}
	
	.font30{
		font-size: 30rpx;
	}

	.fontWeight{
		font-weight: bold;
	}
	.text{
		padding:15px 0px;
	}
	
	.grid-item-box {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15rpx 0;
	}
	.view-icon{
		width: 15px;
		height: 15px;
		border-radius: 0px;
		overflow: visible;
		opacity: 1;
		transition: opacity 0.5s ease-in-out 0s;
		background-color: transparent;
		position: relative;
		box-sizing: border-box;
	}
	.view-image{
		border-radius: 0px;
		width: 100%;
		height: 100%;
		will-change: transform;
		display: inline-block;
		overflow: hidden;
		position: relative;
	}
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
