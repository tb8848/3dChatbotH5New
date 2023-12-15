<template>
	<view>
		<web-view :src="src"></web-view>
	</view>
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
			console.log("跳转地址："+getForMatUrl() + "/sendFormat.html");
			this.src = getForMatUrl() + "/sendFormat.html";
			
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
