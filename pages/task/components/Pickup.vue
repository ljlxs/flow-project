<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getTasksList } from '@/api/task.js';
import TaskList from '@/components/TaskList.vue';
const isTriggered = ref(false);
const hasMore = ref(false);
// 数据为空时
const isEmpty = ref(false);
const listParams = ref({
	page: 1,
	pageSize: 5,
	status: 1
});
const notifyPageList = ref([]);
const TasksList = async () => {
	listParams.value.page += 1;
	if (listParams.value.page == 1) notifyPageList.value = [];
	const res = await getTasksList(listParams.value);
	notifyPageList.value = [...notifyPageList.value, ...(res.data.items || [])];
	hasMore.value = listParams.value.page == res.data.pages;
	isEmpty.value = notifyPageList.value.length === 0;
};
// 上拉刷新
const onScrolltolower = () => {
	if (hasMore.value) return;
	TasksList();
};
// 下拉加载
const onRefresh = async () => {
	isTriggered.value = true;
	listParams.value.page = 0;
	await TasksList();
	isTriggered.value = false;
};
onLoad(() => {
	TasksList();
});
</script>

<template>
	<scroll-view
		:refresher-triggered="isTriggered"
		@refresherrefresh="onRefresh"
		refresher-enabled
		refresher-background="#f4f4f4"
		@scrolltolower="onScrolltolower"
		class="scroll-view-wrapper"
		scroll-y="true"
	>
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
				<view class="bom">
					<view class="bom_add">
						<text>提货时间</text>
						<text>{{ item.planDepartureTime }}</text>
					</view>
					<navigator v-if="item.enablePickUp" class="btn" :url="`/subpkg_task/pickup/index?id=${item.id}`">提货123</navigator>
					<view v-else url="" class="btn disabled">提货</view>
				</view>
			</navigator>
		</view>
		<view v-if="isEmpty" class="task-blank">无待提货物</view>
	</scroll-view>
</template>

<style lang="scss">
.scroll-view-wrapper {
	height: 100%;
	overflow: hidden;
}
.Pickup {
	margin: 30rpx;
	background-color: #fff;
	border-radius: 15rpx;
	padding: 35rpx;
	box-sizing: border-box;
	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.top_left {
			font-weight: 500;
			font-size: 32rpx;
			color: #2a2929;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.top_rig {
			width: 104rpx;
			height: 44rpx;
			border: 2rpx solid #ef4f3f;
			border-radius: 22rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #ef4f3f;
			font-size: 24rpx;
		}
	}
	.conten {
		padding: 42rpx 0;
		border-bottom: 2rpx solid #f4f4f4;
		.conten_txt {
			font-size: 28rpx;
			color: #818181;
			display: flex;
			flex-direction: column;
			margin-left: 30rpx;
			padding: 0 44rpx;
			border-left: 2px dashed #ccc;
			position: relative;
			&::after {
				content: '起';
				width: 44rpx;
				height: 44rpx;
				background: #2a2929;
				border-radius: 22rpx;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				left: -22rpx;
				top: 0;
			}
			&::before {
				content: '止';
				width: 44rpx;
				height: 44rpx;
				background: #ef4f3f;
				border-radius: 22rpx;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				left: -22rpx;
				bottom: 0;
			}
			> text:first-child {
				margin-bottom: 29rpx;
			}
			> text:last-child {
				// margin-bottom: 29rpx;
			}
		}
	}
	.bom {
		display: flex;
		justify-content: space-between;
		margin-top: 29rpx;
		.bom_add {
			display: flex;
			flex-direction: column;
			> text:first-child {
				font-size: 28rpx;
				color: #818181;
			}
			> text:last-child {
				font-size: 28rpx;
				color: #2a2929;
			}
		}
		.btn {
			width: 160rpx;
			height: 64rpx;
			background: #ef4f3f;
			border-radius: 32rpx;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.disabled {
			background: #fadcd9;
		}
	}
	.task-blank {
		position: absolute;
		left: 50%;
		top: 40%;
		width: 201rpx;
		text-align: center;
		padding-top: 130rpx;
		background-image: url(https://sl-driver.oss-cn-hangzhou.aliyuncs.com/images/blank%402x.png);
		background-size: contain;
		background-repeat: no-repeat;
		font-size: 24rpx;
		color: $uni-secondary-text-color;
		transform: translate(-50%, -100%);
	}
}
</style>
