<script setup>
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getTasksList } from '@/api/task.js';
const startChange = ref('');
const endChange = ref('');
const startTimeChange = (e) => {
	startChange.value = e.detail.value;
};
const endTimeChange = (e) => {
	endChange.value = e.detail.value;
};
// 筛选按钮
const filterBtn = computed(() => {
	return startChange.value == '' || endChange.value == '';
});

const listParams = ref({
	page: 0,
	pageSize: 5,
	status: 6
});
const notifyPageList = ref([]);
const TasksList = async () => {
	const res = await getTasksList(listParams.value);
	notifyPageList.value = res.data.items;
};
onLoad(() => {
	TasksList();
});
</script>

<template>
	<view class="Completed">
		<view class="header">
			<view class="top">
				<!-- #ifdef APP-PLUS||MP -->
				<text class="iconfont icon-scan"></text>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<text class="iconfont icon-search"></text>
				<!-- #endif -->
				<input type="text" placeholder="请输入任务编号" />
			</view>
			<view class="filter">
				<view class="prick">
					<picker mode="date" :value="startChange" @change="startTimeChange">
						<view class="prickBtn">{{ startChange == '' ? '开始时间' : startChange }}</view>
					</picker>
					<text class="to">至</text>
					<picker mode="date" :value="endChange" @change="endTimeChange">
						<view class="prickBtn">{{ endChange == '' ? '结束时间' : endChange }}</view>
					</picker>
				</view>
				<button :disabled="filterBtn" class="filter-btn">筛选</button>
			</view>
		</view>
		<view class="Pickup" v-for="(item, index) in notifyPageList" :key="index">
			<navigator hover-class="none" :url="`/subpkg_task/detail/index?id=${item.id}`">
				<view class="top">
					<text class="top_left">任务编号：{{ item.transportTaskId }}</text>
					<text class="top_rig">已延迟</text>
				</view>
				<view class="conten">
					<view class="conten_txt">
						<text>{{ item.startAddress }}</text>
						<text>{{ item.endAddress }}</text>
					</view>
				</view>
			</navigator>
			<view class="bom">
				<view class="bom_add">
					<text>提货时间</text>
					<text>{{ item.planDepartureTime }}</text>
				</view>
			</view>
		</view>
		<view v-if="isEmpty" class="task-blank">无待提货物</view>
	</view>
</template>

<style lang="scss">
.Completed {
	.header {
		padding: 0 30rpx;
		background-color: #fff;
		box-sizing: border-box;
		overflow: hidden;
		.top {
			margin-top: 20rpx;
			position: relative;
			> input {
				height: 64rpx;
				border-radius: 32rpx;
				background-color: #f4f4f4;
				padding-left: 58rpx;
			}
			> .iconfont {
				position: absolute;
				top: 50%;
				left: 20rpx;
				font-weight: 600;
				transform: translateY(-50%);
				color: $uni-secondary-text-color;
				font-size: $uni-font-size-base;
			}
		}
		.filter {
			padding: 28rpx 0;
			display: flex;
			align-items: center;
			.prick {
				flex: 1;
				display: flex;
				align-items: center;
				.to {
					margin: 0 25rpx;
				}
				.prickBtn {
					width: 212rpx;
					height: 64rpx;
					background: #f4f4f4;
					border-radius: 32rpx;
					font-size: 28rpx;
					color: #818181;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
			.filter-btn {
				width: 120rpx;
				height: 64rpx;
				background: #ef4f3f;
				border-radius: 32rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				color: #ffffff;
				&[disabled] {
					background: #fadcd9;
				}
			}
		}
	}
}
</style>
