<template>
	<view :style="{background:'rgb(245, 245, 245)'}">
		
		<view style="display: flex;justify-content:space-between;align-items: center;padding: 15px;">
			<view>
				<text>支持盘口：</text>
				<text v-if="userLotteryType==3">3D/P3</text>
				<text v-else-if="userLotteryType==1">3D</text>
				<text v-else-if="userLotteryType==2">P3</text>
			</view>
			<view v-if="userLotteryType==3">
				<radio-group @change="switchLotteryType">
					<label><radio :checked="selectLotteryType==1" value="1"/>3D</label>
					<label style="margin-left: 10px;"><radio :checked="selectLotteryType==2" value="2"/>P3</label>
				</radio-group>
			</view>
		</view>
		
		<view style="background-color: #fff;border-bottom-left-radius: 20rpx;border-bottom-right-radius: 20rpx;margin:0rpx 4rpx 0rpx 4rpx;padding: 20px 0px 10px 0px;">
			<uni-grid :column="3" :showBorder="false"  :square="false">
				<uni-grid-item v-for="(item, index) in tjList" :index="index" :key="index">
					<view class="grid-item-box" style="background-color: #fff;height:100rpx">
						<text style="margin-bottom: 8px;font-size: 18px;color: #333;font-weight: 700;line-height: 22px;">{{item.value}}</text>
						<text class="text">{{item.text}}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
				
		<view class="bigbox" v-if="auditPointsRecord.length > 0">
			<view class="upDown">
				<view style="font-size: 15px;color: #333;">上下分请求</view>
				<view style="font-size: 14px;color: #e04a48;" @click="oneClickClose">一键关闭</view>
			</view>
			<view style="margin: auto;width: 375px;">
				<view class="upDownItem" v-for="(item,i) in auditPointsRecord">
					<view style="margin-right: 5px;position: relative;">
						<image :src="item.player.headimg" style="width: 28px;height: 28px;z-index: 10;border-radius: 6px;"></image>
					</view>
					<view style="width: 100%;margin-left: 5px;flex: 1;">
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<view style="width: 155px;display: flex;align-items: center;">
								<text class="playerName">{{item.player.nickname}}</text>
							</view>
							<view style="display: flex;align-items: center;color: #999;">
								<view style="margin-right: 10px;font-size: 13px;">{{item.applyTime.split(" ")[0]}}</view>
								<view @click="clearAudit(item.id)">
									<text style="font-size: 27px;line-height: 20px;">×</text>
								</view>
							</view>
						</view>
						<view style="margin-top: 11px;font-size: 13px;color: #333;display: flex;justify-content: space-between;align-items: center;">
							<view v-if="item.optType==0">上分：
								<text style="margin-left: 3px;">{{item.points}}</text>
							</view>
							<view v-if="item.optType==1" style="color: #e04a48;">下分：
								<text style="margin-left: 3px;color: #2e61ee;">{{item.points}}</text>
							</view>
							<view>
								<text style="color: #2e61ee;" @click="agreeAudit(item.id)">同意</text>
								<text style="margin-left: 18px;color: #e04a48;" @click="disAgreeAudit(item.id)">拒绝</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view style="background-color: #fff;margin-top:5px;">
			<view>
				<view class="tabs">
					<view class="uni-tab-item" v-for="(tab,index) in tabBars" :key="tab.id" >
						<text class="uni-tab-item-title" :class="{tabActive: tabIndex==tab.id}" @tap="TarData(tab)">
							{{tab.name}}
							<span class="tab-item-title-line"></span>
						</text>
					</view>
				</view>	
			</view>
		</view>	
			
		<view v-show="tabIndex=='playerlist'">
			<scroll-view scroll-y="true" lower-threshold="10" @scrolltolower="loadMorePlayerList" :style="{'height':(winHeight-320)+'px'}">
				<view v-if="playerList.length > 0">
					<view class="onePlayer" v-for="(player,idx) in playerList">
						<view style="display: flex;justify-content: space-around;align-items: center;padding: 14rpx;">
							<view style="width: 50%;display: flex;justify-content: flex-start;align-items: center;">
								<view v-if="player.headimg!=null && player.headimg!=''">
									<img :src="'https://images.weserv.nl/?url='+player.headimg" style="height: 80rpx;width: 80rpx;" />
								</view>
								<view v-else><img src="../../static/logo.png" style="height: 80rpx;width: 80rpx;"/></view>
								<view style="margin-left:10rpx">
									<view><text style="font-size: 15px;color: #333;font-weight: bolder;">{{player.nickname}}</text></view>
									<view style="font-size: 12px;color:#aaa"><text>{{player.lotteryType==3?'3D/P3':player.lotteryType==2?'P3':'3D'}}</text></view>
								</view>								
							</view>
							<view style="display: flex;width: 50%;font-size: 12px;justify-content: flex-end;">
								<view class="player-btn-tuo" :class="[player.pretexting==1?'player-btn-tuo-active':'']" @click="changeBuyType(player,'tuo')">托</view>
								<view class="player-btn-menu" @click="showPlayerMenu(player,1)"><uni-icons type="list" size="15" color="white"></uni-icons><text>菜单</text></view>
								<view class="player-btn-net">
									<view style="padding: 0 4px;" :class="[player.reportNet==1?'player-btn-net-active':'']" @click="changeBuyType(player,'reportNet')">报网</view>
									<view style="padding: 0 4px;" :class="[player.eatPrize==1?'player-btn-net-active':'']" @click="changeBuyType(player,'eatPrize')">吃奖</view>
								</view>
							</view>
						</view>
						<view style="display: flex;justify-content: flex-start;align-items: center;padding: 3px 7px;color: #333;font-size: 13px;">
							<view style="width: 50%;">
								<text style="margin-right: 10rpx;">当前积分:</text>
								<text style="color: #fa513c;font-weight: bolder;">{{player.points}}</text>
							</view>
							<view style="width: 50%;display: flex;align-items: center;justify-content: end;" v-if="player.chaturl.startsWith('null')">
								<text v-if="player.hsvalue>0" class="bilv-btn1">返{{player.hsvalue}}</text>
							</view>
							<view style="width: 50%;display: flex;align-items: center;justify-content: end;" v-else>
								<text style="margin-right: 10rpx;">复制:</text>
								<text style="margin-right: 10rpx;width: 100rpx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap" :title="player.chaturl">{{player.chaturl}}</text>
								<uni-icons type="link" color="#A7A7A7" size="22" @click="copyText(player.chaturl)"></uni-icons>
								<text v-if="player.hsvalue>0" class="bilv-btn">返{{player.hsvalue}}</text>
							</view>
						</view>
						<view style="display: flex;justify-content: flex-start;align-items: center;padding: 3px 7px;color: #333;font-size: 13px;">
							<view style="width: 50%;">
								<text style="margin-right: 10rpx;">当日总投:</text>
								<text>{{player.dayTotalBuy}}</text></view>
							<view style="width: 50%;display: flex;justify-content: end;">
								<text style="margin-right: 10rpx;">当日盈亏:</text>
								<text style="color:#fa513c;font-weight: bolder;">{{player.dayTotalEarn}}</text></view>
						</view>
					</view>	
				</view>
				<view style="padding-top: 2px;" v-else>
					<view class="followlist">
						<view style="display: inline-flex;align-items: center;flex-direction: column;justify-content: center;">
							<image src="../../static/images/noData.png" style="width: 60px;height: 65px;"></image>
						</view>
						<view style="color: rgb(148, 152, 157);font-size: 13px;margin: 7px 0px 0px;">
							暂无数据
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<view v-show="tabIndex=='dummylist'">
			<scroll-view scroll-y="true" lower-threshold="10" @scrolltolower="loadMoreDummylist" :style="{'height':(winHeight-320)+'px'}">
				<view v-if="dummylist.length > 0">
					<view class="dummylist" v-for="(item ,i) in dummylist">
						<view style="width: 100%;">
							<view style="width: 100%;margin-bottom: 8px;display: flex;justify-content: space-between;align-items: center;">
								<view style="display: flex;align-items: center;">
									<image class="dummyImage" :src="'https://images.weserv.nl/?url='+item.headimg"></image>
									<text class="dummyText">{{item.nickname}}</text>
								</view>
								<view class="dummyButton">
									<view class="dummyButton1" @click="showPlayerMenu(item,2)">
										<view class="dummyButtonImage">
											<image src="../../static/images/menu.png" style="width: 100%;height: 100%;"></image>
										</view>
										<text style="line-height: 13px;">菜单</text>
									</view>
								</view>
							</view>
							<view style="width: 100%;padding-top: 1px;margin-bottom: 5px;">
								<view style="width: 148px;font-size: 13px;color: #333;">
									当前积分：<text style="margin-left: 3px;font-size: 18px;color: #fa513c;">{{item.points}}</text>
								</view>
							</view>
							<view style="width: 100%;padding-top: 1px;font-size: 13px;display: flex;align-items: center;color: #333;">
								<view style="width: 148px;">
									当日总投：<text style="margin-left: 3px;">{{item.dayTotalBuy}}</text>
								</view>
								<view style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;font-size: 13px;">
									当日盈亏：
									<text style="margin-left: 3px;color: #41ac76;font-weight: bolder;" v-if="item.dayTotalEarn > 0">+{{item.dayTotalEarn}}</text>
									<text style="margin-left: 3px;color: #fa513c;font-weight: bolder;" v-else>{{item.dayTotalEarn}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view style="padding-top: 2px;" v-else>
					<view class="followlist">
						<view style="display: inline-flex;align-items: center;flex-direction: column;justify-content: center;">
							<image src="../../static/images/noData.png" style="width: 60px;height: 65px;"></image>
						</view>
						<view style="color: rgb(148, 152, 157);font-size: 13px;margin: 7px 0px 0px;">
							暂无数据
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<view v-show="tabIndex=='followlist'">
			<scroll-view scroll-y="true" lower-threshold="10" @scrolltolower="loadMoreFollowlist" :style="{'height':(winHeight-320)+'px'}">
				<view v-if="followList.length > 0">
					<view style="width: 375px;margin: auto;box-sizing: border-box;" v-for="(item ,i) in followList">
						<view style="padding-top: 1px;box-sizing: border-box;">
							<view style="width: 100%;background-color: #fff;padding: 12px 9px 12px 11px;margin: 0 auto;position: relative;display: flex;align-items: flex-start;box-sizing: border-box;">
								<view style="margin-right: 5px;">
									<image :src="'https://images.weserv.nl/?url='+item.playerHeadImg" style="width: 28px;height: 28px;border-radius: 6px;"></image>
								</view>
								<view style="flex: 1;width: 350px;">
									<view style="display: flex;justify-content: space-between;align-items: space-between;width: 100%;">
										<view style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;font-size: 15px;color: #333;font-weight: bolder;">
											{{item.playerName}}
										</view>
										<view class="stopFollow" @click="stopFollow(item.id)">
											终止执行
										</view>
									</view>
									<view style="width: 320px;">
										<view style="color: #999;font-size: 14px;">
											<view :title="item.buyDesc" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.buyDesc}}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view style="padding-top: 2px;" v-else>
					<view class="followlist">
						<view style="display: inline-flex;align-items: center;flex-direction: column;justify-content: center;">
							<image src="../../static/images/noData.png" style="width: 60px;height: 65px;"></image>
						</view>
						<view style="color: rgb(148, 152, 157);font-size: 13px;margin: 7px 0px 0px;">
							暂无数据
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<view v-show="tabIndex=='buylist'">
			<scroll-view :style="{'height':(winHeight-320)+'px'}" scroll-y="true" lower-threshold="10" @scrolltolower="loadMoreBuyList" v-if="allBuyList.length > 0">
				<view v-for="(item,index) in allBuyList" style="display: flex;padding:10px;border-bottom: 1px solid #DCDFE6;background-color: #fff;">							
					 <view style="width: 12%;">
						<view><img :src="'https://images.weserv.nl/?url='+item.player.headimg" style="width: 30px;height: 30px;border-radius: 5px;" /></view>
						<view style="margin:10px 0px;text-align: center;color:#e04a48;display: flex;" v-if="item.buyStatus==0" @click="tuidan(item)">
							<view>
								<image src="../../static/images/tuidan.png" style="width: 14px;height: 14px;"></image>
							</view>
							<view style="font-size: 13px;line-height: 21px;">退单</view>
						</view>
					 </view>
					 <view style="width: 88%;">
						 <view style="padding: 3px;">
							 <view style="font-size: 15px;margin-bottom:5px;color: #333;font-weight: bolder;"><text >{{item.player.nickname}}</text></view>
							 <view style="color:#999;font-size: 12px;"><text>下单时间:</text><text>{{item.buyTime}}</text></view>
						 </view>
						 <view style="display: flex;padding: 3px;align-items: center">
							<view style="color:#999;font-size: 12px;">
								 <text>结算时间:</text>
								 <text v-if="item.buyStatus==0">--</text>
								 <text v-if="item.buyStatus==1">{{item.settlementTime}}</text>
							</view>
							 <view style="background: #e0e0e0;padding:1px 5px;font-size: 12px;margin-left: 10px;color: #666;border-radius: 3px;" v-if="item.buyStatus==0">未结算</view>
							 <view style="background: #2e61ee;padding:1px 5px;font-size: 12px;margin-left: 10px;color: #fff;border-radius: 3px;" v-if="item.buyStatus==1">已结算</view>
							 <view style="background: #e04a48;padding:1px 5px;font-size: 12px;margin-left: 10px;color: #fff;border-radius: 3px;" v-if="item.buyStatus==1 && item.earnPoints<0">输</view>
							 <view style="background: #41ac76;padding:1px 5px;font-size: 12px;margin-left: 10px;color: #fff;border-radius: 3px;" v-if="item.buyStatus==1 && item.earnPoints>0">赢</view>
						 </view>
						 <view style="display: flex;align-items: center;padding: 3px;">
							 <view style="border:1px solid #00016d;color:#00016d;padding:1px 5px;font-size: 12px;margin-right: 10px;"><text>{{item.drawNo}}</text></view>
							 <view style="border:1px solid #F3A73F;color:#F3A73F;padding:1px 5px;font-size: 12px;margin-right: 10px;"><text>本期合计:&nbsp;{{item.buyPoints}}</text></view>
							 <view style="border:1px solid #2979FF;color:#2979FF;padding:1px 5px;font-size: 12px;margin-right: 10px;">
								 <text v-if="item.buyType==1" >吃奖</text>
								 <text v-if="item.buyType==0" >报网</text>
								 <text v-if="item.buyType==2" >假托</text>
							 </view>
							 <view style="border:1px solid #9e0000;color:#9e0000;padding:1px 5px;font-size: 12px;margin-right: 10px;" v-if="item.buyFrom==1">
								 定投
							 </view>
							 <view style="background: #e04a48;color:#fff;padding: 1px 5px;font-size: 12px;margin-right: 10px;" v-if="item.buyStatus==1 && item.earnPoints<0">
								  <text>{{item.earnPoints}}</text>
							 </view>
							 <view style="background: #41ac76;color:#fff;padding: 1px 5px;font-size: 12px;margin-right: 10px;" v-if="item.buyStatus==1 && item.earnPoints>0">
								<text>+{{item.drawPoints}}</text>
							 </view>
						 </view>
						 <view style="padding: 3px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;font-size: 14px;color:#999;" :title="item.buyDesc">
							 {{item.buyDesc}}
						 </view>
					 </view>
				 </view>	
			</scroll-view>

			<view style="padding-top: 2px;" v-else>
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
		
		<uni-popup ref="playermenu" type="bottom" background-color="#fff" :mask-click="false" width="100%">
			<view style="padding-bottom: 40px;border-top-left-radius: 20rpx;border-top-right-radius: 20rpx;margin: 0 auto;">
				<view style="display: flex;justify-content: space-between;padding:10rpx;font-weight: bolder;">
					<view @click="checkDelPlayer" style="color: #e04a48;font-size: 14px;">删除此玩家</view>
					<view style="font-size: 16px;padding-right: 30px;">菜单功能</view>
					<view @click="closePlayerMenu"><uni-icons type="closeempty" size="20"></uni-icons></view>
				</view>
				
				<view style="margin-top:20px;font-size: 14px;">
					<uni-grid :column="4" :showBorder="false"  :square="false">
						<uni-grid-item v-if="menu==1 || menu==2">
							<view class="grid-item-box" style="background-color: #fff;height:100rpx" @click="showPop('popupInfo')">
								<img src="../../static/images/edit-icon.png" class='player-menu-img'/>
								<text class="text1">修改资料</text>
							</view>
						</uni-grid-item>
						<uni-grid-item v-if="menu==1 || menu==2">
							<view class="grid-item-box" style="background-color: #fff;height:100rpx" @click="showPop('popupPoints')">
								<img src="../../static/images/points-up.png" class='player-menu-img'/>
								<text class="text1">上下分</text>
							</view>
						</uni-grid-item>
						<uni-grid-item v-if="menu==1">
							<view class="grid-item-box" style="background-color: #fff;height:100rpx" @click="showPop('popupHuishui')">
								<img src="../../static/images/player-hs.png" class='player-menu-img'/>
								<text class="text1">回水设置</text>
							</view>
						</uni-grid-item>
						<uni-grid-item v-if="menu==1 || menu==2">
							<view class="grid-item-box" style="background-color: #fff;height:100rpx" @click="addToBlackList">
								<img src="../../static/images/player-blacklist.png" class='player-menu-img'/>
								<text class="text">拉黑</text>
							</view>
						</uni-grid-item>

						<uni-grid-item v-if="menu==1">
							<view class="grid-item-box" style="background-color: #fff;height:100rpx" @click="showPop('popupBuyList')">
								<img src="../../static/images/player-buy.png" class='player-menu-img'/>
								<text class="text1">下注记录</text>
							</view>
						</uni-grid-item>
						<uni-grid-item v-if="menu==1">
							<view class="grid-item-box" style="background-color: #fff;height:100rpx" @click="showPop('popupPointsList')">
								<img src="../../static/images/player-points-up.png" class='player-menu-img'/>
								<text class="text1">上下分记录</text>
							</view>
						</uni-grid-item>
						<uni-grid-item v-if="menu==1">
							<view class="grid-item-box" style="background-color: #fff;height:100rpx" @click="toReport">
								<img src="../../static/images/player-report.png" class='player-menu-img'/>
								<text class="text1">个人报表</text>
							</view>
						</uni-grid-item>
						<uni-grid-item v-if="menu==1">
							<view class="grid-item-box" style="background-color: #fff;height:100rpx" @click="checkClearPlayerData">

								<img src="../../static/images/player-clear.png" class='player-menu-img'/>
								<text class="text1">清空数据</text>
							</view>
						</uni-grid-item>
					</uni-grid>
				</view>
			</view>
		</uni-popup>
		
		<!-- 上下分 -->
		<uni-popup ref="popupPoints" type="center" background-color="#fff" :mask-click="true" class="poplayer">
			<view style="width: 260px;">
				<view style="display: flex;justify-content:space-between">
					<view  style="width: 10%;"></view>
					<view  style="width: 80%;text-align: center;font-weight: bold;"><text>上下分</text></view>
					<view  style="width: 10%;" @click="closePop('popupPoints')"><uni-icons type="closeempty" size="20"></uni-icons></view>
				</view>
				<view style="text-align: center;display: flex;align-items: center;margin: 20px 0 30px 0;">
					<view class="smallBtn" :class="[pointUpFlag==0?'btn-blue':'']" @click="changePointUpFlag(0)"><text>上分</text></view>
					<view class="smallBtn" :class="[pointUpFlag==1?'btn-blue':'']" @click="changePointUpFlag(1)"><text>下分</text></view>
				</view>
				<view>
					<view style="margin-top:20rpx;display: flex;justify-content: space-between;">
						<view><text style="font-weight: bold;font-size: 15px;color: #333;">{{flagLabel}}</text></view>
						<view style="display: flex;color: #333;font-size: 15px;">
							<input type="number" placeholder="请输入" style="text-align: right;padding-right: 10rpx;font-size: 15px;" v-model="points"/>
							<text>分</text>
						</view>
					</view>
				</view>
				<view style="background-color: #2e61ee;height: 40px;line-height: 40px;text-align: center;color:white;border-radius: 10rpx;margin:30px 0 10px 0;font-size: 14px;" @click="upPoints()">
					<text>确定</text>
				</view>
			</view>
		</uni-popup>
		
		<!-- 回水设置 -->
		<uni-popup ref="popupHuishui" type="center" background-color="#fff" :mask-click="true" class="poplayer">
			<view style="width: 260px;">
				<view style="display: flex;justify-content:space-between">
					<view  style="width: 10%;"></view>
					<view  style="width: 80%;text-align: center;color: #333;font-size: 16px;font-weight: bolder;"><text>回水设置</text></view>
					<view  style="width: 10%;" @click="closePop('popupHuishui')"><uni-icons type="closeempty" size="20"></uni-icons></view>
				</view>
				<view style="padding-bottom: 30rpx;border-bottom: 1px solid #DCDFE6;">
					<view style="display: flex;justify-content: space-between;margin-top:30px">
						<text style="font-weight: bolder;font-size: 15px;width: 150px;">单独返水比例:</text>
						<input type="number" v-model="hsvalue" style="text-align: right;" maxlength="3" />
					</view>
				</view>
				<view>
					<view style="font-size: 24rpx;margin:30rpx 0rpx;color: red;">回水按照一万返多少填写(例：一万流水返80就填80)</view>
				</view>
				<view style="background-color: #2e61ee;height: 80rpx;line-height: 80rpx;text-align: center;color:white;border-radius: 10rpx;margin:30px 0 10px 0" @click="setHs()">
					<text>确定</text>
				</view>
			</view>
		</uni-popup>
		
		<!-- 下注记录 -->
		<uni-popup ref="popupBuyList" type="bottom" background-color="#fff" :mask-click="false" class="poplayer">
			<!-- <view class="mask"> -->
				<view :style="{'padding-top': '15px',background: '#fff',width: (winWidth-13)+'px'}">
					<view style="height: 30px;text-align: right;padding-right: 10px;line-height: 30px;">
						<uni-icons type="closeempty" size="20" @click="closePop('popupBuyList')"></uni-icons>
					</view>
					<view class="barmenu">
						<view class="menu" :class="[buyListSearch.buyType==-1?'selected':'']" @click="changeSearchBuyType(-1)"><text>全部</text></view>
						<view class="menu" :class="[buyListSearch.buyType==0?'selected':'']" @click="changeSearchBuyType(0)"><text>报网</text></view>
						<view class="menu" :class="[buyListSearch.buyType==1?'selected':'']" @click="changeSearchBuyType(1)"><text>吃奖</text></view>
						<view class="menu" :class="[buyListSearch.buyType==2?'selected':'']" @click="changeSearchBuyType(2)"><text>假托</text></view>
					</view>
					<view style="height: 30px;padding:10px 10px;display: flex;justify-content: space-between;align-items: center;border-bottom: 1px solid #dedde2;">
						<view style="font-weight: bolder;font-size: 14px;"><text>查看日期</text></view>
						<view>
							<picker @change="changeDateRange" :value="dateRangeIndex" :range="dateRange" range-key="name">
								<view class="dateRangeValue">
									<view>
										{{ dateRange[dateRangeIndex].name }}
									</view>
									<view style="line-height: 24px;">
										<image src="../../static/images/downArrow.png" style="width: 15px;height: 15px;"></image>
									</view>
								</view>
							</picker>
						</view>
					</view>
					<view>
						<scroll-view :style="{'height':(winHeight-160)+'px'}" scroll-y="true" lower-threshold="10" @scrolltolower="loadMoreBuyList">
							<view v-if="playerBuyList.length > 0">
								<view v-for="(item,index) in playerBuyList" style="display: flex;padding:6px;border-bottom: 1px solid #DCDFE6;">
									 <view>
										 <view><img :src="item.player.headimg" style="width: 46px;height: 46px;" /></view>
										 <view style="margin:10px 0px;text-align: center;color:#e04a48;font-size: 13px;" v-if="item.buyStatus==0" @click="tuidan(item)">
											 <text>退单</text>
										 </view>
									 </view>
									 <view style="margin-left: 5px;width: 86%;">
										 <view style="padding: 3px;">
											 <view style="font-size: 15px;margin-bottom:5px"><text >{{item.player.nickname}}</text></view>
											 <view style="color:#999;font-size: 12px;"><text>下单时间:</text><text>{{item.buyTime}}</text></view>
										 </view>
										 <view style="display: flex;padding: 3px;align-items: center">
											 <view style="color:#999;font-size: 12px;">
												 <text>结算时间:</text >
												 <text v-if="item.buyStatus==0">--</text>
												 <text v-if="item.buyStatus==1">{{item.settlementTime}}</text>
											</view>
											 <view style="background: #e0e0e0;padding:1px 5px;font-size: 12px;margin-left: 10px;color: #666;border-radius: 3px;" v-if="item.buyStatus==0">未结算</view>
											 <view style="background: #2e61ee;padding:1px 5px;font-size: 12px;margin-left: 10px;color: #fff;border-radius: 3px;" v-if="item.buyStatus==1">已结算</view>
											 <view style="background: #e04a48;padding:1px 5px;font-size: 12px;margin-left: 10px;color: #fff;border-radius: 3px;" v-if="item.buyStatus==1 && item.earnPoints<0">输</view>
											 <view style="background: #41ac76;padding:1px 5px;font-size: 12px;margin-left: 10px;color: #fff;border-radius: 3px;" v-if="item.buyStatus==1 && item.earnPoints>0">赢</view>
										 </view>
										 <view style="display: flex;align-items: center;padding: 3px;">
											 <view style="border:1px solid #2C405A;color:#2C405A;padding:1px 5px;font-size: 12px;margin-right: 10px;"><text>{{item.drawNo}}</text></view>
											 <view style="border:1px solid #F3A73F;color:#F3A73F;padding:1px 5px;font-size: 12px;margin-right: 10px;"><text>本期合计:&nbsp;{{item.buyPoints}}</text></view>
											 <view style="border:1px solid #2979FF;color:#2979FF;padding: 1px 5px;font-size: 12px;margin-right: 10px;">
												 <text v-if="item.buyType==1" >吃奖</text>
												 <text v-if="item.buyType==0" >报网</text>
												 <text v-if="item.buyType==2" >假托</text>
											 </view>
											 <view style="border:1px solid #9e0000;color:#9e0000;padding:1px 5px;font-size: 12px;margin-right: 10px;" v-if="item.buyFrom==1">
											 	 定投
											 </view>
											 <view style="background: #e04a48;color:#fff;padding: 1px 5px;font-size: 12px;margin-right: 10px;" v-if="item.buyStatus==1 && item.earnPoints<0">
												  <text>{{item.earnPoints}}</text>
											 </view>
											<view style="background: #41ac76;color:#fff;padding: 1px 5px;font-size: 12px;margin-right: 10px;" v-if="item.buyStatus==1 && item.earnPoints>0">
												<text >+{{item.drawPoints}}</text>
											 </view>
										 </view>
										 <view style="padding: 0 10px 3px 3px;font-size: 14px;color:#999;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" :title="item.buyDesc">
											{{item.buyDesc}}
										 </view>
									 </view>
								 </view>
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
						</scroll-view>
					</view>
				</view>
			<!-- </view> -->
		</uni-popup>
		
		<!-- 上下分记录 -->
		<uni-popup ref="popupPointsList" type="bottom" background-color="#fff" :mask-click="false" class="poplayer">
			<!-- <view class="mask"> -->
				<view :style="{'padding-top': '15px',background: '#fff',width: (winWidth-13)+'px'}">
					<view style="height: 30px;text-align: right;padding-right: 10px;line-height: 30px;">
						<uni-icons type="closeempty" size="20" @click="closePop('popupPointsList')"></uni-icons>
					</view>
					<view class="barmenu">
						<view class="menu" :class="[pointsListSearch.upDownType==0?'selected':'']" @click="changeSearchPointsType(0)">
							<text>上分</text>
						</view>
						<view class="menu" :class="[pointsListSearch.upDownType==1?'selected':'']" @click="changeSearchPointsType(1)">
							<text>下分</text>
						</view>
					</view>
					<view style="height: 30px;padding:10px 10px;display: flex;justify-content: space-between;align-items: center;border-bottom: 1px solid #C8C7CC;">
						<view style="font-weight: bold;font-size: 14px;"><text>查看日期</text></view>			
						<view>
							<picker @change="changeDateRange" :value="dateRangeIndex" :range="dateRange" range-key="name">
								<view class="dateRangeValue">
									<view>
										{{ dateRange[dateRangeIndex].name }}
									</view>
									<view style="line-height: 24px;">
										<image src="../../static/images/downArrow.png" style="width: 15px;height: 15px;"></image>
									</view>
								</view>
							</picker>
						</view>
					</view>
					<view>
						<scroll-view :style="{'height':(winHeight-160)+'px'}" scroll-y="true" lower-threshold="10" @scrolltolower="loadMorePlayerPointsList">
							<view v-if="playerPointsList.length > 0">
								<view v-for="(item,index) in playerPointsList" style="padding:15px 10px;border-bottom: 1px solid #eee;">
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
			<!-- </view> -->
		</uni-popup>
		
		<!-- 修改资料 -->
		<uni-popup ref="popupInfo" type="center" background-color="#fff" :mask-click="true" class="poplayer">
			<view style="width: 260px;">
				<view style="display: flex;justify-content:space-between">
					<view  style="width: 10%;"></view>
					<view  style="width: 80%;text-align: center;color: #333;font-weight: bolder;"><text>修改资料</text></view>
					<view  style="width: 10%;" @click="closePop('popupInfo')"><uni-icons type="closeempty" size="20"></uni-icons></view>
				</view>
				<view style="text-align: center;margin:40rpx">
					<view v-if="headimg!=''"><img :src="headimg" style="width: 80px;height: 80px;"/></view>
					<view v-else><img src="../../static/logo.png" /></view>
					
					<view style="margin-top:10rpx;color: #2e61ee;font-size: 14px;" @click="chooseImg()"><text>随机更换头像</text></view>
				</view>
				<view>
					<view style="font-size: 15px;color: #999;"><text>设置昵称</text></view>
					<view style="margin-top:20rpx;border-bottom: 1px solid #E4E7ED;padding-bottom:6px;">
						<input type="text" placeholder="请输入昵称" style="font-size: 15px;" v-model="nickname"/>
					</view>
				</view>
				<view style="background-color: #2e61ee;height: 40px;line-height: 40px;text-align: center;color:white;border-radius: 4px;margin:33px 0 16px 0;font-size: 14px;" @click="updateInfo()">
					<text>确定</text>
				</view>
			</view>
		</uni-popup>
		
		<!-- 提示窗 -->
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="msgType" confirmText="确认" cancelText="取消" title="提示" content="是否确认操作？" @confirm="dialogConfirm"
				@close="dialogClose"></uni-popup-dialog>
		</uni-popup>
		
		<uni-popup ref="clearDataDialog" type="dialog">
			<uni-popup-dialog :type="msgType" confirmText="确认" cancelText="取消" title="提示" content="是否清空流水？" @confirm="clearDataConfirm"
				@close="clearDataClose"></uni-popup-dialog>
		</uni-popup>
		
		<uni-popup ref="tuidanDialog" type="dialog">
			<uni-popup-dialog :type="msgType" confirmText="确认" cancelText="取消" title="提示" content="是否退单？" @confirm="tuidanConfirm"
				@close="tuidanClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import { playMusic, stopMusic} from "@/config/music.js";
	import { getResponseData, showToastTip,getBaseUrl,getWsUrl} from "@/config/req.js";
	export default {
		data() {
			return {
				countData:{
					
				},
				pointsApplyList:[], //上下分审核列表
				playerMenuName:'',
				currComponent:'buyList',
				title: 'Hello',
				tjList:[
					{text:'玩家总分',value:0},
					{text:'当日总投',value:0},
					{text:'当日盈亏',value:0},
					{text:'当日上分',value:0},
					{text:'当日下分',value:0},
					{text:'玩家回水',value:0},
					{text:'网盘余额',value:0},
					{text:'当期报网',value:0},
					{text:'网盘回水',value:0},
				],
				tabBars:[
					{name: "玩家列表",id: "playerlist"},
					{name: "老黄玩乐",id:"dummylist"},
					{name: "跟码列表",id: "followlist"},
					{name: "下注监控",id: 'buylist'}					
				],
				tabIndex:'playerlist',
				playerList:[],
				dummylist:[],
				followList:[],
				allBuyList:[],
				pager:{
					pages:-1,
					total:0,
					pageNo:1,
					pageSize:10
				},
				playerBuyList:[], //玩家购买记录
				playerPointsList:[], //玩家上下分记录
				pointsListSearch:{
					playerId:'',
					dayRange:0,
					upDownType:0,
					pageNo:1,
					pageSize:10	
				},
				buyListSearch:{
					playerId:'',
					dayRange:0,
					buyType:-1,
					pageNo:1,
					pageSize:10				
				},
				dateRange:[
					{name:'当天'},{name:'昨天'},{name:'本周'}
				],
				dateRangeIndex:0,
				currentPlayer:null,
				points:'',
				pointUpFlag:0,
				flagLabel:'上分',
				hsvalue:'',
				nickname:'',
				headimg:'',
				msgType:"tips",
				buyType:"",
				playered:"",
				menu:1,	//1：玩家列表菜单  2：老黄玩乐菜单,
				winHeight:0,	//屏幕高度
				winWidth:0,		//屏幕宽度
				tuidanId:"",//退单ID
				auditPointsRecord:[],//待审核上下分列表
				timer:null,//定时器
				userLotteryType:null,
				selectLotteryType:0
			}
		},
		onLoad() {
			
		},
		onUnload() {
			this.auditPointsRecord = [];
			const that = this;
			if(that.timer) {  //注销定时器
				console.log('注销定时器_onUnload')
				clearTimeout(that.timer);  
				that.timer = null;
			} 
		},
		onHide() {
			this.auditPointsRecord = [];
			const that = this;
			if(that.timer) {  //注销定时器
				console.log('注销定时器_onHide')
				clearTimeout(that.timer);  
				that.timer = null;
			} 
		},
		onShow(){
			
			const that = this;
			this.winHeight = uni.getSystemInfoSync().screenHeight;
			this.winWidth = uni.getSystemInfoSync().screenWidth;	
			uni.showLoading({
				title:"加载中...",
				mask:true
			})
			this.checkLotteryType();		
			this.getAllAuditPointsRecord();
			this.timer = setInterval(() => {
				//监听上下分审核
				that.getAllAuditPointsRecord();
			},2000)
			
		},
		methods: {
			switchLotteryType(e){
				var v = e.detail.value;
				this.selectLotteryType = v;
				var lotName = this.selectLotteryType==2?"P3":"3D";
				this.tjList[6].text = "网盘余额"+"["+lotName+"]"
				this.tjList[7].text = "当期报网"+"["+lotName+"]"
				this.tjList[8].text = "网盘回水"+"["+lotName+"]"
				this.isRobotLogin();
			},
			initDatas(){
				var lotName = this.selectLotteryType==2?"P3":"3D";
				this.tjList[6].text = "网盘余额"+"["+lotName+"]"
				this.tjList[7].text = "当期报网"+"["+lotName+"]"
				this.tjList[8].text = "网盘回水"+"["+lotName+"]"
				this.summaryData();
				this.getTabMenuData();						
				this.isRobotLogin();
			},
			checkLotteryType(){
				const that = this;
				getResponseData("/user/info",'GET',{},function(res){
					if(res.code == 0){
						that.userLotteryType = res.data.lotteryType;
						if(that.userLotteryType!=3){
							that.selectLotteryType = that.userLotteryType;
						}else{
							that.selectLotteryType = 1;
						}
						that.initDatas();					
					}
				})
			},
			//判断盘口是否登录
			isRobotLogin(){
				const that = this;
				getResponseData("/robot/checkRobotLogin?lotteryType="+that.selectLotteryType,'POST',{},function(res){
					if(res.code==0){
						const id = res.data;
						//uni.setStorageSync('pkToken',res.data.login3dToken);
						that.getDrawInfo(id);
					}else{
						that.tjList[6].value = 0
						that.tjList[7].value = 0
						that.tjList[8].value = 0
						showToastTip(res.msg);
					}
				})	
				// getResponseData("/pan/isUserPanLogin",'POST',"",function(res){
				// 	if(res.code==0){
				// 		const id = uni.getStorageSync("pkUid");
				// 		if(id!="" && id!=undefined && id!=null){
				// 			that.getDrawInfo(id);
				// 		}
				// 	}
				// })	
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
			//一键关闭
			oneClickClose(){
				this.auditPoints(0,-2);
				stopMusic();
			},
			//同意审核
			agreeAudit(id){
				this.auditPoints(id,1);
			},
			//不同意审核
			disAgreeAudit(id){
				this.auditPoints(id,2);
			},
			//叉叉
			clearAudit(id){
				this.auditPoints(id,-1);
			},
			auditPoints(id,authStatus){
				const that = this;
				uni.showLoading({
					title:"处理中...",
					mask:true
				})
				getResponseData("/player/points/applyPoints",'GET',{
					id:id,
					authStatus:authStatus
				},function(res){
					if(res.code == 200){
						that.getAllAuditPointsRecord();
						that.pager.pageNo = 1;
						that.playerList = [];
						that.getPlayerList();
						that.summaryData();
					}
				})
			},
			getAllAuditPointsRecord(){
				const that = this;
				getResponseData("/player/points/getAllAuditPointsRecord",'POST',{},function(res){
					if(res.code == 200){
						if(that.auditPointsRecord.length == 0 && res.data.length > 0){
							playMusic();
						}
						that.auditPointsRecord = res.data;
						if(that.auditPointsRecord.length == 0){
							stopMusic();
						}
						// const auditHeigth = 70 + res.data.length*75;
						// const otherHeigth = 315 + that.playerList.length*125;
						// that.winHeight = uni.getSystemInfoSync().screenHeight - auditHeigth;
					}else{
						stopMusic();
					}
				})
			},
			getDrawInfo(id){
				const that = this;
				getResponseData("/pan/getDrawInfo",'get',{id:id},function(res){
					if(res.code==4031){
						uni.removeStorageSync('pkToken');
						uni.removeStorageSync('pkUid');
					}else if(res.code==200){
						that.tjList.forEach((item,i)=>{
							if(item.text.startsWith("网盘余额")){
								item.value = res.data.creditLimit;
							}
							if(item.text.startsWith("网盘回水")){
								item.value = res.data.huishuiCount;
							}
							if(item.text.startsWith("当期报网")){
								item.value = res.data.baowangMoney;
							}
						})
					}else{
						that.tjList.forEach((item,i)=>{
							if(item.text.startsWith("网盘余额")){
								item.value = 0;
							}
							if(item.text.startsWith("网盘回水")){
								item.value = 0;
							}
							if(item.text.startsWith("当期报网")){
								item.value = 0;
							}
						})
					}
				})
			},
			// getDrawInfo(){
			// 	const that = this;
			// 	getResponseData("/robot/getDrawInfo",'get',{},function(res){
			// 		if(res.code==4031){
			// 			uni.removeStorageSync('pkToken');
			// 			uni.removeStorageSync('pkUid');
			// 		}else if(res.code==200){
			// 			that.tjList.forEach((item,i)=>{
			// 				if(item.text == "网盘余额"){
			// 					item.value = res.data.creditLimit;
			// 				}
			// 				if(item.text == "网盘回水"){
			// 					item.value = res.data.huishuiCount;
			// 				}
			// 				if(item.text == "当期报网"){
			// 					item.value = res.data.baowangMoney;
			// 				}
			// 			})
			// 		}
			// 	})
			// },
			summaryData(){ //汇总数据
				const that = this;
				getResponseData("/user/dayData",'Get',{},function(res){
					if(res.code==0){	
						that.countData = res.data;	
						that.tjList.forEach((it1,ii)=>{
							res.data.forEach((it2,ii2)=>{
								if(it1.text == it2.text){
									it1.value = it2.value;
								}
							})
						})
					}
				})	
			},
			checkClearPlayerData(){
				const that = this;
				uni.showModal({
					title:'提示',
					content:'是否确定删除玩家数据?',
					confirmText:'确定',
					confirmColor:'#2979FF',
					cancelText:'取消',
					cancelColor:'#DCDCDC',
					showCancel:true,
					success(res) {
						if(res.confirm){
							that.delPlayer();
						}						
					}					
				});			
			},
			
			clearPlayerData(){
				const that = this;
				uni.showLoading({
					title:"处理中...",
					mask:true
				})
				getResponseData("/player/clearData",'POST',{
					id:that.currentPlayer.id
				},function(res){
					if(res.code==0){	
						uni.showToast({
							title:'操作成功',
							icon:'none',
							duration:3000
						})
						that.closePlayerMenu();
						//that.getTabMenuData();
					}else{
						showToastTip(res.msg);		
					}
				})	
			},
			
			changeSearchBuyType(buyType){
				this.buyListSearch.buyType = buyType;
				this.pager.pageNo = 1;
				this.playerBuyList = [];
				this.buyListSearch.pageNo = this.pager.pageNo;
				this.getBuyList();				
			},
			changeSearchPointsType(type){
				this.pointsListSearch.upDownType = type;
				this.pager.pageNo = 1;
				this.playerPointsList = [];
				this.pointsListSearch.pageNo = this.pager.pageNo;
				this.getPlayerPointsList();		
			},
			changeDateRange(e,moduleName){
				this.dateRangeIndex = e.detail.value;		
				var dayRange = 1;
				if(this.dateRangeIndex==1){
					dayRange = -1;
				}else if(this.dateRangeIndex==2){
					dayRange = 7
				}
				if(this.playerMenuName=='buyList'){
					this.buyListSearch.dayRange = dayRange;
					this.pager.pageNo = 1;	
					this.pager.pages = -1;
					this.buyListSearch.pageNo = this.pager.pageNo;
					this.playerBuyList = [];
					this.getBuyList();
				}else if(this.playerMenuName=='pointList'){
					this.pointsListSearch.dayRange = dayRange;
					this.pager.pageNo = 1;
					this.pager.pages = -1;
					this.playerPointsList = [];
					this.pointsListSearch.pageNo = this.pager.pageNo;
					this.getPlayerPointsList();	
				}
				
			},
			loadMorePointsList(){
				if(this.pager.pageNo<this.pager.pages){
					this.pager.pageNo++;
					this.getPlayerPointsList();
				}
			},
			toUpDownList(){
				var params = {
					playerId:this.currentPlayer.id
				}
				uni.navigateTo({
					url:"/pages/player/upDownList?params="+encodeURIComponent(JSON.stringify(params))
				})
			},
			toReport(){
				var params = {
					playerId:this.currentPlayer.id
				}
				uni.navigateTo({
					url:"/pages/player/report?params="+encodeURIComponent(JSON.stringify(params))
				})
			},
			updateInfo(){
				const that = this;
				if(this.nickname==''){
					return;
				}
				if(this.headimg==''){
					return;
				}
				uni.showLoading({
					title:"处理中...",
					mask:true
				})
				getResponseData("/player/edit",'POST',{
					id:that.currentPlayer.id,
					nickname:that.nickname,
					headimg:that.headimg
				},function(res){
					if(res.code==0){	
						uni.showToast({
							title:'修改成功',
							icon:'none',
							duration:3000
						})
						that.closePop("popupInfo")
						that.closePlayerMenu();
						that.getTabMenuData();
					}else{
						showToastTip(res.msg);		
					}
				})	
			},
			changeBuyType(player,buyType){
				this.$refs.alertDialog.open();
				this.buyType = buyType;
				this.playered = player;
			},
			checkDelPlayer(){
				const that = this;	
				uni.showModal({
					title:'提示',
					content:'是否确定删除?',
					confirmText:'确定',
					confirmColor:'#2979FF',
					cancelText:'取消',
					cancelColor:'#DCDCDC',
					showCancel:true,
					success(res) {
						if(res.confirm){
							that.delPlayer();
						}						
					}					
				});			
			},
			delPlayer(){
				const that = this;					
				uni.showLoading({
					title:"处理中...",
					mask:true
				})
				getResponseData("/player/del",'POST',{
					id:that.currentPlayer.id
				},function(res){
					if(res.code==0){	
						uni.showToast({
							title:'删除成功',
							icon:'none',
							duration:3000
						})
						that.closePlayerMenu();
						that.getTabMenuData();
					}else{
						showToastTip(res.msg);		
					}
				})	
			},
			addToBlackList(){
				const that = this;				
				uni.showLoading({
					title:"处理中...",
					mask:true
				})
				getResponseData("/player/black/add",'POST',{
					id:that.currentPlayer.id
				},function(res){
					if(res.code==0){	
						uni.showToast({
							title:'已将该玩家进行拉黑',
							icon:'none',
							duration:3000
						})
						that.closePlayerMenu();
						that.getTabMenuData();
					}else{
						showToastTip(res.msg);		
					}
				})	
			},
			setHs(){//回水设置
				const that = this;
				const hsvalue = this.hsvalue;
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
					that.hsvalue = hsvalue.substring(0,3);
					return;
				}
				uni.showLoading({
					title:"处理中...",
					mask:true
				})
				getResponseData("/player/setHs",'POST',{
					id:that.currentPlayer.id,
					hsvalue:that.hsvalue
				},function(res){
					if(res.code==0){					
						uni.showToast({
							title:'设置成功',
							icon:'none',
							duration:3000
						})
						that.closePop('popupHuishui');
						that.closePlayerMenu();
						that.getTabMenuData()
					}else{
						showToastTip(res.msg);		
					}
				})	
			},
			
			upPoints(){//上下分
				const that = this;
				if(this.points==''){
					showToastTip("请输入上下分数量");
					return;
				}
				uni.showLoading({
					title:"处理中...",
					mask:true
				})
				getResponseData("/player/upPoints",'POST',{
					points:that.points,
					optType:that.pointUpFlag,
					playerId:that.currentPlayer.id
				},function(res){
					if(res.code==0){	
						that.points = '';
						that.flagLabel = '上分';
						that.pointUpFlag = 0;
						uni.showToast({
							title:'设置成功',
							icon:'none',
							duration:3000
						})
						that.closePop('popupPoints');
						that.closePlayerMenu();
						that.getTabMenuData();
						that.summaryData();
					}else{
						showToastTip(res.msg);		
					}
				})	
			},
			changePointUpFlag(flag){
				this.pointUpFlag = flag;
				if(flag==0){
					this.flagLabel = "上分"
				}else{
					this.flagLabel = "下分"
				}
			},
			TarData(item){
						//设置id，来显示选中那个标签，显示下划线
						// uni.removeStorageSync("billDrawNo");
						// uni.removeStorageSync("billDrawId");
					this.tabIndex = item.id;
					this.getTabMenuData();
					
					//显示标签对应的组件内容
					//this.currentTabComponent = item.id			
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
			
			getTabMenuData(){
				this.pager.pageNo = 1;
				this.pager.total = 0;
				this.pager.pages = -1;
				switch(this.tabIndex){
					case 'playerlist':
						this.playerList = [];
						this.getPlayerList();
						break;
					case 'dummylist':
						this.dummylist = [];
						this.getDummyList();
						break;
					case 'followlist':
						this.followList = [];
						this.getFollowList();
						break;
					case 'buylist':
						this.buyListSearch.dayRange=1;
						this.buyListSearch.buyType=-1;
						this.buyListSearch.pageNo=this.pager.pageNo;
						this.buyListSearch.pageSize=this.pager.pageSize;
						this.buyListSearch.playerId='';
						this.dateRangeIndex = 0;
						this.allBuyList = [];
						this.getBuyList();
						break;
				}
			},
			
			showPop(popupName){
				switch(popupName){
					case 'popupPoints':
						this.$refs.popupPoints.open();
						break;
					case 'popupHuishui':
						this.$refs.popupHuishui.open();
						break;
					case 'popupInfo':
						this.$refs.popupInfo.open();
						break;
					case 'popupBuyList':
						this.playerMenuName = 'buyList';
						this.$refs.popupBuyList.open();
						this.getPlayerBuyList();
						break;
					case 'popupPointsList':
						this.playerMenuName = 'pointList';
						this.$refs.popupPointsList.open();
						this.pager.pageNo = 1;
						this.pointsListSearch.pageNo=1;
						this.pointsListSearch.playerId=this.currentPlayer.id;
						this.pointsListSearch.upDownType = 0;
						this.pointsListSearch.dayRange = 1;
						this.playerPointsList=[];
						this.getPlayerPointsList();
						break;
						
				}
			},
			getPlayerPointsList(){			
				const that = this;
				getResponseData("/player/points/list",'get',this.pointsListSearch,function(res){
					if(res.code==0){						
						res.data.forEach((item,idx)=>{
							that.playerPointsList.push(item);
						})
						that.pager.total = res.count;
						that.pager.pages = Math.ceil(res.count/that.pager.pageSize);
					}else{
						showToastTip(res.msg);	
					}
				})
			},
			loadMorePlayerPointsList(){
				if(this.pointsListSearch.pageNo<this.pager.pages){
					this.pointsListSearch.pageNo++;
					this.getPlayerPointsList();
				}
			},
			getPlayerBuyList(){
				this.pager.pageNo = 1;
				this.buyListSearch.pageNo=this.pager.pageNo;
				this.buyListSearch.pageSize=this.pager.pageSize;
				this.buyListSearch.playerId=this.currentPlayer.id;
				this.buyListSearch.buyType = -1;
				this.buyListSearch.dayRange = 1;
				this.playerBuyList=[];
				this.getBuyList();
			},
			closePop(popupName){
				switch(popupName){
					case 'popupPoints':
						this.$refs.popupPoints.close();
						break;
					case 'popupHuishui':
						this.$refs.popupHuishui.close();
						break;
					case 'popupInfo':
						this.$refs.popupInfo.close();
						break;
					case 'popupBuyList':
						this.$refs.popupBuyList.close();
						break;
					case 'popupPointsList':
						this.$refs.popupPointsList.close();
						break;
						
				}
			},
			showPlayerMenu(player,menu){ //玩家功能菜单
				uni.hideTabBar();
				this.menu = menu;
				this.currentPlayer = player;
				this.hsvalue = player.hsvalue;
				this.nickname = player.nickname;
				this.headimg = player.headimg;
				this.$refs.playermenu.open('bottom')
			},
			closePlayerMenu(){
				uni.showTabBar();
				this.$refs.playermenu.close();
			},
			getPlayerList(){
				const that = this;
				getResponseData("/player/list",'GET',{
					pageNo:this.pager.pageNo,
					pageSize:this.pager.pageSize
				},function(res){
					if(res.code==0){
						that.pager.total = res.count;
						that.pager.pages = Math.ceil(that.pager.total/that.pager.pageSize);
						// that.playerList = res.data;	
						res.data.forEach((item,idx)=>{
							that.playerList.push(item);
						})
					}else{
						showToastTip(res.msg);		
					}
				})	
			},
			loadMorePlayerList(){
				if(this.pager.pageNo<this.pager.pages){
					this.pager.pageNo++;
					this.getPlayerList();
				}
			},
			getBuyList(){
				const that = this;
				getResponseData("/player/buy/list",'get',this.buyListSearch,function(res){
					if(res.code==0){	
						if(that.buyListSearch.playerId==''){
							res.data.forEach((item,idx)=>{
								that.allBuyList.push(item);
							})
						}else{
							res.data.forEach((item,idx)=>{
								that.playerBuyList.push(item);
							})
						}
						that.pager.total = res.count;
						that.pager.pages = Math.ceil(res.count/that.pager.pageSize);
					}else{
						showToastTip(res.msg);	
					}
				})
			},
			loadMoreBuyList(){
				if(this.buyListSearch.pageNo<this.pager.pages){
					this.buyListSearch.pageNo++;
					this.getBuyList();
				}
			},
			getFollowList(){
				const that = this;
				getResponseData("/player/dingtou/getBotUserFixedBuy",'GET',{
					pageNo:this.pager.pageNo,
					pageSize:this.pager.pageSize,
				},function(res){
					if(res.code==0){
						that.pager.total = res.count;
						that.pager.pages = Math.ceil(that.pager.total/that.pager.pageSize);
						res.data.forEach((item,idx)=>{
							that.followList.push(item);
						})
					}else{
						showToastTip(res.msg);		
					}
				})
			},
			loadMoreFollowlist(){
				if(this.pager.pageNo<this.pager.pages){
					this.pager.pageNo++;
					this.getFollowList();
				}
			},
			stopFollow(id){
				uni.showLoading({
					title:"处理中...",
					mask:true
				})
				const that = this;
				getResponseData("/player/dingtou/stopFollow",'GET',{
					id:id
				},function(res){
					if(res.code==0){	
						uni.showToast({
							title:'操作成功',
							icon:'success',
							duration:3000
						})
						that.followList = [];
						that.pager.pageNo = 1;
						that.getFollowList();
					}else{
						showToastTip(res.msg);		
					}
				})	
			},
			getDummyList(){
				const that = this;
				getResponseData("/player/list",'GET',{
					pageNo:this.pager.pageNo,
					pageSize:this.pager.pageSize,
					userType:0
				},function(res){
					if(res.code==0){
						that.pager.total = res.count;
						that.pager.pages = Math.ceil(that.pager.total/that.pager.pageSize);
						// that.dummylist = res.data;		
						res.data.forEach((item,idx)=>{
							that.dummylist.push(item);
						})
					}else{
						showToastTip(res.msg);		
					}
				})
			},
			loadMoreDummylist(){
				if(this.pager.pageNo<this.pager.pages){
					this.pager.pageNo++;
					this.getDummyList();
				}
			},
			dialogConfirm(){
				var buyType = this.buyType;
				var player = this.playered;
				if(buyType=='tuo'){
					player.pretexting=(player.pretexting==1?0:1);
				}else if(buyType=='reportNet'){
					player.reportNet=1;
					player.eatPrize=0;
				}else if(buyType=='eatPrize'){
					player.reportNet=0;
					player.eatPrize=1;
				}
				uni.showLoading({
					title:"处理中...",
					mask:true
				})
				getResponseData("/player/edit",'POST',player,function(res){
					if(res.code==0){	
						// uni.showToast({
						// 	title:'设置成功',
						// 	icon:'none',
						// 	duration:3000
						// })
					}else{
						showToastTip(res.msg);		
					}
				})	
			},
			dialogClose(){
				console.log("取消了");
			},
			clearDataConfirm(){
				console.log("确认清空流水");
			},
			clearDataClose(){
				console.log("取消清空流水");
			},
			tuidan(item){
				this.tuidanId = item.id;
				this.$refs.tuidanDialog.open();
			},
			tuidanConfirm(){
				const that = this;
				console.log("确认退单："+this.tuidanId);
				uni.showLoading({
					title:"处理中...",
					mask:true
				})
				getResponseData("/player/buy/tuima",'GET',{
					buyId:that.tuidanId
				},function(res){
					if(res.code==0){	
						if(that.buyListSearch.playerId==''){							
							that.allBuyList.forEach((item,idx)=>{
								if(item.id == that.tuidanId){
									item.status = -1
								}
							});							
						}else{
							that.playerBuyList.forEach((item,idx)=>{
								if(item.id == that.tuidanId){
									item.status = -1
								}
							});							
						}
						that.buyListSearch.pageNo = 1;
						that.playerBuyList = [];
						that.allBuyList = [];
						that.getBuyList();
						that.tuidanData();
						// that.summaryData();
						// that.getDrawInfo();
					}else{
						uni.showToast({
							title:res.msg
						})	
					}
				})	
			},
			tuidanData(){
				const that = this;
				getResponseData("/user/dayData",'Get',{},function(res){
					if(res.code==0){	
						that.countData = res.data;	
						that.tjList.forEach((it1,ii)=>{
							res.data.forEach((it2,ii2)=>{
								if(it1.text == it2.text){
									it1.value = it2.value;
								}
							})
						})
						const pkUid = uni.getStorageSync("pkUid");
						that.getDrawInfo(pkUid);
						// that.getDrawInfo();
					}
				})	
			},
			tuidanClose(){
				console.log("取消退单："+this.tuidanId);
			},
			clearData(){
				this.$refs.clearDataDialog.open();
			},
			//复制链接
			copyLink(url){
				uni.showLoading({
					title:"处理中...",
					mask:true
				})
				navigator.clipboard.writeText(url);
				uni.showToast({
					title:"链接已复制",
					icon:'success'
				})
			},
			
			//复制文本
			copyText(text) {
				var element = this.createElement(text);
				element.select();
				element.setSelectionRange(0, element.value.length);
				document.execCommand('copy');
				element.remove();
				uni.showToast({
					title:"链接已复制",
					icon:'success'
				})
				// alert("已复制到剪切板");
			},
	 
			//创建临时的输入框元素
			createElement(text) {
				var isRTL = document.documentElement.getAttribute('dir') === 'rtl';
				var element = document.createElement('textarea');
				// 防止在ios中产生缩放效果
				element.style.fontSize = '12pt';
				// 重置盒模型
				element.style.border = '0';
				element.style.padding = '0';
				element.style.margin = '0';
				// 将元素移到屏幕外
				element.style.position = 'absolute';
				element.style[isRTL ? 'right' : 'left'] = '-9999px';
				// 移动元素到页面底部
				let yPosition = window.pageYOffset || document.documentElement.scrollTop;
				element.style.top = `${yPosition}px`;
				//设置元素只读
				element.setAttribute('readonly', '');
				element.value = text;
				document.body.appendChild(element);
				return element;
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
		padding: 10px 60px
	}
	.barmenu .menu{
		width: 40px;text-align: center;
		justify-content: center;
		align-items: center;
		display: flex;
		font-size: 15px;
		flex-direction: column;
	}
	
	.selected{
		color:rgb(46, 97, 238);
		font-weight: bold;
		border-bottom: 2px solid rgb(46, 97, 238);
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
	
	page{
		background: rgb(245, 245, 245);
	}
	
	.smallBtn{
		width: 60px;
		height: 35px;
		text-align: center;
		line-height: 35px;
		border-radius: 10rpx;
		font-size: 15px;
	}
	
	.btn-blue{
		background-color: #2e61ee;
		color:#fff;
	}
	
	/deep/.uni-popup .uni-popup__wrapper {
		/* width: 80% !important; */
		padding: 30rpx !important;
		border-radius: 20rpx;
		margin: 0 auto;
	}
	
	.bilv-btn {
		margin-left: 15px;
		font-weight: 700;
		text-align: center;
		width: 46px;
		height: 20px;
		line-height: 19px;
		background: linear-gradient(180deg,#ffb13b,#ff6850);
		border-radius: 4px 4px 4px 4px;
		opacity: 1;
		border: 1px solid #ffd28f;
		color: #fff;
	}
	.bilv-btn1 {
		font-weight: 700;
		text-align: center;
		width: 46px;
		height: 20px;
		line-height: 19px;
		background: linear-gradient(180deg,#ffb13b,#ff6850);
		border-radius: 4px 4px 4px 4px;
		opacity: 1;
		border: 1px solid #ffd28f;
		color: #fff;
	}
	
	.u-drawer{
	    display: block;
	    position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    overflow: hidden;
	}
	
	.player-btn-tuo{
		margin-right: 10rpx;
		width: 22px;
		height: 22px;
		line-height: 22px; 
		border: 1px solid #E4E7ED;
		border-radius: 10rpx;
		text-align: center;
		color: #d9d9d9;
	}
	
	.player-btn-tuo-active{
		background: #41ac76;
		border: none;
		color:#fff;
	}
	
	.player-btn-menu{
		background-color: #2e61ee;
		padding: 1px 5px 0 5px;
		border-radius: 4px;
		color: white;		
		height: 22px;
		line-height: 22px;		
	}
	
	.player-btn-net{
		display: flex;
		margin-left: 5px;
		border-radius: 4px;
		border:1px solid #2e61ee;
		color: #2e61ee;
		height: 22px;
		line-height: 22px;
	}
	.player-btn-net-active{
		background: #2e61ee;
		border: none;
		color:#fff
	}
	
	.player-menu-img{
		width:88rpx;
		height: 88rpx;
		border-radius: 44rpx;
		margin-bottom: 10rpx;
	}
	
	.onePlayer{
		border-bottom: 1px solid #EBEEF5;
		padding:10rpx;
		font-size: 28rpx;
		background-color: #fff;
	}
	.tabs{
		display: flex;
		/* flex: 1; */
		flex-direction: row;
		justify-content: space-between;
	/* 	overflow-x: scroll; */
		height: 100%;
		background-color: white;
		border-bottom: 1px solid #DCDFE6;
	}
	.uni-tab-item{
		width: 25%;
		white-space: nowrap;
		line-height: 80rpx;
		height: 80rpx;
		text-align: center;
		padding-bottom: 5px;
		/* border-bottom: 1px solid #eee; */
	}
	.uni-tab-item-title{
		font-size: 15px;
		width: 160rpx;
		display: inline-block;
		text-align: center;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		/* color: #969696; */
		/* color: white; */
	}
	.tabActive{
		color: #2e61ee;
		font-size:15px;
	}
	.tabActive .tab-item-title-line{
		display: block;
		/* border-bottom: 4rpx solid blue; */
		/* border-top: 2rpx solid blue; */
		width: 30px;
		margin: 10rpx auto;
		border-radius: 40rpx;
		margin-top: -10rpx;
		height: 3px;
		background-color: #2e61ee;
		box-sizing: border-box;
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
	.text{
		font-size: 14px;
		color: #666;
	}
	.text1{
		font-size: 12px;
		color: #666;
		padding-top: 3px;
	}
	.uni-popup__error{
		color: #303133;
	}
	.dummylist{
		border-bottom: 1px solid #EBEEF5;
		width: 100%;
		background-color: #fff;
		margin: 0px auto;
		margin-bottom: 0px;
		padding: 12px 9px 12px 11px;
		position: relative;
		display: flex;
		align-items: flex-start;
		box-sizing: border-box;
	}
	.dummyImage{
		will-change: transform;
		width: 28px;
		height: 28px;
		border-radius: 6px;
		z-index: 10;
		margin-right: 10px;
		display: inline-block;
		overflow: hidden;
		position: relative;
	}
	.dummyText{
		width: 137px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-right: 5px;
		font-size: 15px;
		color: #333;
		font-weight: bolder;
	}
	.dummyButton{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-left: 5px;
		display: flex;
		align-items: center;
	}
	.dummyButton1{
		height: 22px;
		padding: 0 5px;
		border-radius: 4px;
		font-size: 12px;
		display: flex;
		align-items: center;
		background-color: #2e61ee;
		color: #fff;
	}
	.dummyButtonImage{
		width: 14px;
		height: 14px;
		border-radius: 0px;
		overflow: visible;
		background-color: transparent;
		position: relative;
		transition: opacity .5s ease-in-out;
		margin-right: 1px;
	}
	.followlist{
		margin-top: 15px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
	.dateRangeValue{
		text-align:center;
		background: #2e61ee;
		height: 20px;
		width:40px;
		color:white;
		padding: 2px 5px;
		font-size: 12px;
		border-radius: 5px;
		line-height: 20px;
		display: flex;
		justify-content: center;
	}
	.bigbox{
		width: 100%;
		padding: 16px 0 8px 0;
		background: #fff;
		box-shadow: 0 0 20px hsla(0,0%,63.1%,.08);
		opacity: 1;
		border-radius: 12px;
		box-sizing: border-box;
	}
	.upDown{
		padding-left: 28px;
		padding-right: 26px;
		margin-bottom: 14px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.upDownItem{
		box-sizing: border-box;
		padding: 12px 9px 12px 11px;
		margin: 0 auto;
		background-color: #fff;
		width: 100%;
		position: relative;
		display: flex;
		align-items: flex-start;
		padding-right: 26px;
	}
	.playerName{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-right: 4px;
		font-size: 15px;
		color: #333;
		font-weight: bolder;
	}
	.stopFollow{
		width: 70px;
		height: 25px;
		line-height: 25px;
		text-align: center;
		background: #2e61ee;
		border-radius: 6px 6px 6px 6px;
		opacity: 1;
		color: #fff;
		font-size: 14px;
	}
</style>