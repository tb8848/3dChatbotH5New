<template>
	<!-- <view>
		<web-view :src="src"></web-view>
	</view> -->
	<!-- <view class="protocol">
		<view class="bd">
			<view class="content">
				<h5 style="background-color: orangered;color:#fff;padding: 5px">上下分格式：</h5>
				<ol>
					<li>上分 + 数字，<span class="red">如：上分1000</span>。</li>
					<li>下分 + 数字，<span class="red">如：下分1000</span>。</li>
				</ol>
				<h5 style="background-color: orangered;color:#fff;padding: 5px">提交作业格式：[类型] + [号码] + "各" + [金额]</h5>
				<ol>
					<li>单选 + <span style="color:red">号码1,号码2,号码3,...</span> + '各' + 金额，<span class="red">如: 单选123,678,345,897,234,345各10</span>。</li>
					<li>直选普通 + <span style="color:red">百位号码,十位号码,个位号码</span> + '各' + 金额，<span class="red">如: 直选普通123,234,456各100</span>。</li>
					<li>直选和值 + 和值(多个用逗号分隔) + '各' + 金额，<span class="red">如: 直选和值0,1,2,3,4,5各10</span>。</li>
					<li>通选 + <span style="color:red">百位号码,十位号码,个位号码</span> + '各' + 金额，<span class="red">如: 通选123,234,456各100</span>。</li>
					<li>组三普通 + 号码 + '各' + 金额，<span class="red">如: 组三普通123456各100</span>。</li>
					<li>组三胆拖 + <span style="color:red">胆码,拖码</span> + '各' + 金额，<span class="red">如: 组三胆拖5,34567各100</span>。</li>
					<li>组三和值 + 和值(多个用逗号分隔) + '各' + 金额，<span class="red">如: 组三和值7,8,9,10各100</span>。</li>
					<li>组六普通 + 号码 + '各' + 金额，<span class="red">如: 组六普通123456各100</span>。</li>
					<li>组六胆拖 + <span style="color:red">胆码,拖码</span> + '各' + 金额，<span class="red">如: 组六胆拖5,34567各100</span>。</li>
					<li>组六和值 + 和值(多个用逗号分隔) + '各' + 金额，<span class="red">如: 组六和值7,8,9,10各100</span>。</li>
					<li>和数 + 和值(多个用逗号分隔) + '各' + 金额，<span class="red">如: 和数7,8,9,10各100</span>。</li>
					<li>1D + <span style="color:red">百位号码(或者-),十位号码(或者-),个位号码(或者-)</span> + '各' + 金额，<span class="red">如: 1D7,89,-各100</span>。</li>
					<li>猜1D + 号码 + '各' + 金额，<span class="red">如: 猜1D789各100</span>。</li>
					<li>2D + <span style="color:red">百位号码(或者-),十位号码(或者-),个位号码(或者-)</span> + '各' + 金额，<span class="red">如: 2D7,89,-各100</span>。</li>
					<li>猜2D + 号码 + '各' + 金额，<span class="red">如: 猜2D789各100</span>。</li>
					<li>包选三 + <span style="color:red">百位号码,十位号码,个位号码</span> + '各' + 金额，<span class="red">如: 包选三123,234,456各100</span>。</li>
					<li>包选六 + <span style="color:red">百位号码,十位号码,个位号码</span> + '各' + 金额，<span class="red">如: 包选六123,456,789各100</span>。</li>
					<li>大 + '各' + 金额，<span class="red">如: 大各100</span>。</li>
					<li>小 + '各' + 金额，<span class="red">如: 小各100</span>。</li>
					<li>奇 + '各' + 金额，<span class="red">如: 奇各100</span>。</li>
					<li>偶 + '各' + 金额，<span class="red">如: 偶各100</span>。</li>
					<li>拖拉机 + '各' + 金额，<span class="red">如: 拖拉机各100</span>。</li>
					<li>猜三同(或三同号) + '各' + 金额，<span class="red">如: 三同号各100</span>。</li>
				</ol>
			</view>
		</view>
	</view> -->
	<view class="protocol">
	    <view class="bd">
	        <h1 class="title fast-lg">作业格式</h1>
	        <view class="content">
				<h4 style="background-color: orangered;color:#fff;padding: 5px">阅读说明：</h4>
				<ol>
					<li>系统会自动过滤掉非作业格式中出现的字符</li>
					<li>除单选、和值、和数外，系统会自动删除号码中重复出现的数字字符</span>。</li>
					<li>组三、组六的胆拖下注，系统会自动删除出现在拖码中的胆码数字，例如下注发送：3D组三5拖34567各100，系统识别为：3D组三5拖3467各100</span>。</li>
					<li>系统会自动过滤掉不符合所属类型的无效号码</span>。</li>
					<li>此作业格式仅用于文本快译下注，快选方式下注的文本不适用此作业格式</span>。</li>
				</ol>
	
				<h4 style="background-color: orangered;color:#fff;padding: 5px">通用格式：</h4>
				<ol>
					<li>发送"流水"关键字，<span class="red">查看当期累计总投金额</span>。</li>
					<li>发送"盛鱼"关键字，<span class="red">查看剩余积分</span>。</li>
					<li>发送"返"关键字，<span class="red">在开启自助回水后，结算当期回水</span>。</li>
					<li>发送"查"关键字，<span class="red">查看当期作业提交情况</span>。</li>
					<li>发送"盈亏"关键字，<span class="red">查看当期盈亏情况</span>。</li>
				</ol>
				<h4 style="background-color: orangered;color:#fff;padding: 5px">上下分格式：</h4>
				<ol>
					<li>上分 + 数字，<span class="red">如：上分1000</span>。</li>
					<li>下分 + 数字，<span class="red">如：下分1000</span>。</li>
				</ol>
				<h4 style="background-color: orangered;color:#fff;padding: 5px">提交作业格式：</h4>
				<ol>
					<li>P3/3D + [类型名称] + [号码] + "各" + [金额]</li>
				</ol>
				<h4 style="background-color: orangered;color:#fff;padding: 5px">参考示例：</h4>
				<ol>
					<li><strong>单选示例：</strong>P3/3D + 单选 + <span style="color:red">号码1,号码2,号码3,...</span> + '各' + 金额，<span class="red">如: 3D单选123,678,345,897,234,345各10</span>。</li>
					<li><strong>直选示例：</strong>P3/3D + 直选 + <span style="color:red">'百[号码]十[号码]个[号码]'</span> + '各' + 金额，<span class="red">如: 3D直选百123十234个456各100</span>。</li>
	<!--                <li><strong>直选和值示例：</strong>P3/3D + 直选和值 + [和值号码](多个用逗号分隔) + '各' + 金额，-->
	<!--                    <span class="red">如: 3D直选和值0,1,2,3,4,5各10</span>。</li>-->
					<li><strong>复式包组：</strong>P3/3D + 复式 + <span style="color:red">[号码1,号码2,号码3]</span> + '各' + 金额，<span class="red">如: 3D复式1234各100</span>。</li>
					<li><strong>复式分笔：</strong>P3/3D + 分笔复式 + <span style="color:red">[号码]</span> + '各' + 金额，<span class="red">如: 3D复式1234各100</span>。</li>
	<!--
	
	 <li><strong>包选三示例：</strong>P3/3D + 包选三 + <span style="color:red">'百[号码]十[号码]个[号码]'</span> + '各' + 金额，-->
	<!--                    <span class="red">如: 3D包选三百123十234个456各100</span>。</li>-->
	<!--                <li><strong>包选六示例：</strong>P3/3D + 包选六 + <span style="color:red">'百[号码]十[号码]个[号码]'</span> + '各' + 金额，-->
	<!--                    <span class="red">如: 3D包选六百123十456个789各100</span>。</li>-->
					<hr/>
	<!--                <li>P3/3D + 组三 + [号码1,号码2,号码3] + '各' + 金额，<span class="red">如: 3D组三122,344,566各100</span>。该格式为组三号码的单选操作</li>-->
					<li><strong>组三包组：</strong>P3/3D + 组三 + [号码1,号码2,号码3...] + '各' + 金额，<span class="red">如: 3D组三123456各100</span>。</li>
					<li><strong>组三分笔：</strong>P3/3D + 分笔组三 + [号码] + '各' + 金额，<span class="red">如: 3D组三123456各100</span>。</li>
	
					<li><strong>组三胆拖示例：</strong>P3/3D + 组三 + <span style="color:red">[号码] + '拖' +[号码]</span> + '各' + 金额，<span class="red">如: 3D组三5拖34567各100</span>。</li>
	<!--                <li><strong>组三和值示例：</strong>P3/3D + 组三和值 + [和值号码](多个用逗号分隔) + '各' + 金额，-->
	<!--                    <span class="red">如: 3D组三和值7,8,9,10各100</span>。</li>-->
					<li><strong>双飞组三示例：</strong>P3/3D + 双飞组三 + [号码] + '各' + 金额，<span class="red">如: 3D双飞组三78各100</span>。</li>
					<hr/>
	<!--                <li>P3/3D + 组六 + [号码1,号码2,号码3] + '各' + 金额，<span class="red">如: 3D组六123,345,567各100</span>。该格式为组六号码的单选操作</li>-->
					<li><strong>组六包组示例：</strong>P3/3D + 组六 + [号码1,号码2,号码3...] + '各' + 金额，<span class="red">如: 3D组六123456各100</span>。</li>
					<li><strong>组六分笔：</strong>P3/3D + 分笔组六 + [号码] + '各' + 金额，<span class="red">如: 3D组六123456各100</span>。</li>
	
					<li><strong>组六胆拖示例：</strong>P3/3D + 组六 + <span style="color:red">[号码] + '拖' +[号码]</span> + '各' + 金额，<span class="red">如: 3D组六34拖567各100，3D组六4拖567各100</span>。</li>
	<!--                <li><strong>组六和值示例：</strong>P3/3D + 组六和值 + [和值号码](多个用逗号分隔) + '各' + 金额，-->
						<span class="red">如: 3D组六和值7,8,9,10各100</span>。</li>
					<li><strong>双飞组六示例：</strong>P3/3D + 双飞组六 + [号码] + '各' + 金额，<span class="red">如: 3D双飞组六78各100</span>。</li>
					<hr/>
					<li><strong>和数示例：</strong>P3/3D + 和数 + [和值号码](多个用逗号分隔) + '各' + 金额，<span class="red">如: 3D和数7,8,9,10各100</span>。</li>
					<li><strong>跨度示例：</strong>P3/3D + 跨度 + [差值号码](多个用逗号分隔) + '各' + 金额，<span class="red">如: 3D跨度7,8,9各100</span>。</li>
					<li><strong>独胆示例：</strong>P3/3D + 独胆 + [号码](多个用逗号分隔) + '各' + 金额，<span class="red">如: 3D独胆7,8,9各100</span>。</li>
					<hr/>
					<li><strong>1D示例：</strong>P3/3D + 1D + <span style="color:red">'百[号码]十[号码]个[号码]'</span> + '各' + 金额，<span class="red">如: 3D1D百12各100，3D1D个23各100，3D1D百12个23各100</span>。</li>
	<!--                <li><strong>猜1D示例：</strong>P3/3D + 猜1D + [号码] + '各' + 金额，-->
	<!--                    <span class="red">如: 3D猜1D789各100</span>。</li>-->
					<li><strong>2D示例：</strong>P3/3D + 2D + <span style="color:red">'百[号码]十[号码]个[号码]'</span> + '各' + 金额 <span class="red">如:  3D2D百12十23各100，3D2D百12个23各100</span>。</li>
	<!--                <li><strong>猜2D示例：</strong>P3/3D + 猜2D + [号码]+ '各' + 金额，-->
	<!--                    <span class="red">如: 3D猜2D789各100</span>。</li>-->
					<hr/>
					<li><strong>大小示例：</strong>P3/3D + [大小/大/小] + '各' + 金额，<span class="red">如: 3D大各100，3D小各100，3D大小各100</span>。</li>
					<li><strong>奇偶示例：</strong>P3/3D + [奇偶/奇/偶] + '各' + 金额，<span class="red">如: 3D奇各100，3D偶各100，3D奇偶各100</span>。</li>
					<li><strong>拖拉机示例：</strong>P3/3D + 拖拉机 + '各' + 金额，<span class="red">如: 3D拖拉机各100</span>。</li>
					<li><strong>猜三同示例：</strong>P3/3D + 猜三同(或三同号) + '各' + 金额，<span class="red">如: 3D三同号各100</span>。</li>
				</ol>
			</view>
	    </view>
	</view>
</template>

<script>
	import {getForMatUrl} from "@/config/req.js";
	export default {
		data() {
			return {
				src:""
			}
		},
		onShow() {
			// console.log("跳转地址："+getForMatUrl() + "/sendFormat.html");
			// this.src = getForMatUrl() + "/sendFormat.html";
		},
		methods: {
			
		}
	}
</script>

<style>
	body {
		font-size: 14px;
		padding: 0;
		margin: 0;
	}

	.protocol {
		border: 1px solid #000000;
		margin: 10px;
	}

	.protocol .title {
		background: #ccccd4;
		line-height: 32px;
		font-size: 20px;
		text-align: center;
		margin: 0;
		border-bottom: 1px solid #000;
	}

	.protocol .content {
		line-height: 24px;
	}

	.protocol .content li {
		font-size: 13px;
	}

	.protocol .ft {
		text-align: center;
		padding: 50px 0;
	}

	.protocol .btn {
		width: 80px;
		height: 30px;
		cursor: pointer;
	}

	.protocol .red {
		color: red;
	}
</style>
