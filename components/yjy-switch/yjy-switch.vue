<template>
	<view class="yjy-switch-container" :style="{ 'border-color': '' + defaultColor }">
		<view
			v-for="(item, index) in switchArr"
			:key="index"
			class="yjy-switch-item"
			:class="{
				'yjy-switch-selected': defaultValue == item.value ? true : false
			}"
			@click="itemClick(item)"
			:style="{
				color: (defaultValue == item.value ? true : false) ? highColor : defaultColor,
				background: (defaultValue == item.value ? true : false) ? defaultColor : ''
			}"
		>
			<i v-if="switchType == 'icon'" class="uni-icon " :class="item.title"></i>
			<view v-if="switchType == 'text'">{{ item.title }}</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'YJYSwitch',
	props: {
		//默认选中的值，int类型
		defaultValue: {
			type: Number,
			default: 0
		},
		//当前循环里的索引
		itemIndex: {
			type: Number,
			default: 0
		},
		//选中的高亮颜色
		highColor: {
			type: String,
			default: '#FFFFFF'
		},
		//组件边框和选中的背景颜色
		defaultColor: {
			type: String,
			default: '#30C58D'
		},
		//类型，text：文本，icon：字体图标
		switchType: {
			type: String,
			default: 'text'
		},
		//可用于切换的数组
		switchList: {
			type: Array,
			default: [
				{
					title: '是',
					value: 1
				},
				{
					title: '否',
					value: 0
				}
			]
		}
	},
	data() {
		return {
			//定义个组件内的数组
			switchArr: []
		};
	},
	methods: {
		itemClick(swithcSelectItem) {
			if (this.defaultValue != swithcSelectItem.value) {
				this.$emit('switchFunction', { swithcSelectItem, ...{ index: this.itemIndex } });
			}
		}
	},
	created() {
		//初始化可选择的数据
		if (this.switchList.length > 0) {
			for (let i = 0; i < this.switchList.length; i++) {
				let arrItem = {
					title: this.switchList[i].title,
					value: this.switchList[i].value
				};
				this.switchArr.push(arrItem);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.yjy-switch-container {
	padding: 2upx;
	display: flex;
	flex-direction: row;
	border-radius: 100upx;
	border: 4upx solid $uni-color-primary;
	padding: 6upx;
	.yjy-switch-selected {
		color: #ffffff;
		border-radius: 40upx;
		background: $uni-color-primary;
	}
	.yjy-switch-item {
		color: $uni-color-primary;
		font-size: 30upx;
		width: 60upx;
		height: 44upx;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.4s ease-in-out;
		i {
			font-size: $uni-font-size-lg;
		}
	}
}
</style>
