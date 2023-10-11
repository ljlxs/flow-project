<script setup>
import { ref } from 'vue';
import { getMessagesPage, getMessagesReadAll } from '@/api/message.js';
import { onLoad } from '@dcloudio/uni-app';
const isEmpty = ref(false);
// 下拉刷新的状态
const isTriggered = ref(false);
const contentType = ref('200');
const page = ref(0);
const pageSize = ref(5);
const MessagesPageList = ref({});
const userDate = ref([]);
const hasMore = ref([]);
const MessagesPage = async () => {
	page.value += 1;
	if (page.value == 1) userDate.value = [];
	const res = await getMessagesPage(contentType.value, page.value, pageSize.value);
	MessagesPageList.value = res.data;
	// 旧数据与新数据结合
	userDate.value = [...userDate.value, ...(MessagesPageList.value.items || [])];
	// 判断是否是最后一页
	hasMore.value = page.value == MessagesPageList.value.pages;
	// 受是否有数据
	isEmpty.value = userDate.value.length === 0;
};
onLoad(() => {
	MessagesPage();
});
const onScrolltolower = () => {
	if (hasMore.value) return;
	MessagesPage();
};
const onRefresh = async () => {
	isTriggered.value = true;
	page.value = 0;
	await MessagesPage();
	isTriggered.value = false;
};
// 全部已读
const allSead = async () => {
	const res = await getMessagesReadAll(contentType.value);
	page.value = 0;
	MessagesPage();
};
//详情
const details = () => {
	console.log(123);
	// uni.navigateTo({
	// 	url: ''
	// });
};
</script>

<template>
	<scroll-view @refresherrefresh="onRefresh" :refresher-triggered="isTriggered" refresher-enabled @scrolltolower="onScrolltolower" class="scroll-view" scroll-y="true">
		<view class="announce">
			<view class="announce-top" @click="allSead">
				<text class="iconfont icon-clear"></text>
				全部已读
			</view>
			<uni-list>
				<uni-list-item v-for="(item, index) in userDate" :key="index" :title="item.title" :right-text="item.created" :to="`/subpkg_message/content/index?id=${item.id}`">
					<template v-slot:header>
						<view :class="{ dot: item.isRead == 0 }"></view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<view v-if="isEmpty" class="message-blank"></view>
	</scroll-view>
</template>

<style lang="scss">
@import './index.scss';
</style>
