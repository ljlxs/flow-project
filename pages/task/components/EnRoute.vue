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
	page: 0,
	pageSize: 5,
	status: 2
});
const notifyPageList = ref([]);
const TasksList = async () => {
	listParams.value.page += 1;
	if (listParams.value.page == 1) notifyPageList.value = [];
	const res = await getTasksList(listParams.value);
	console.log('res123', res);
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
			</navigator>
			<view class="bom">
				<view class="bom_add">
					<text>提货时间</text>
					<text>{{ item.planDepartureTime }}</text>
				</view>
				<navigator v-if="item.status === 2" class="btn" :url="`/subpkg_task/delivery/index?id=${item.id}`">交付</navigator>
				<navigator v-if="item.status === 4" class="btn" :url="`/subpkg_task/delivery/index?id=${item.id}`">回车登记</navigator>
			</view>
		</view>
		<view v-if="isEmpty" class="task-blank">无待提货物</view>
	</scroll-view>
</template>

<style lang="scss">
@import '../index.scss';
</style>
