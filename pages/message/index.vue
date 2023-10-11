<script setup>
import { ref } from 'vue';
import Notify from './components/notify.vue';
import Announce from './components/announce.vue';
const tabItem = ref([
	{ title: '公告', flag: true },
	{ title: '任务通知', flag: false }
]);
const tabInd = ref(0);
const tabChang = (index) => {
	tabItem.value[index].flag = true;
	tabInd.value = index;
};
</script>

<template>
	<view class="page-container">
		<view class="tab">
			<view @click="tabChang(index)" v-for="(item, index) in tabItem" :key="index" class="item">
				<view class="title" :class="{ active: tabInd == index }">
					{{ item.title }}
				</view>
			</view>
		</view>
		<view class="message-list" v-show="tabInd === 0" v-if="tabItem[0].flag">
			<Announce></Announce>
		</view>
		<view class="message-list" v-show="tabInd === 1" v-if="tabItem[1].flag">
			<Notify></Notify>
		</view>
	</view>
</template>

<style lang="scss">
.message-list {
	flex: 1;
	overflow: hidden;
}
.page-container {
	display: flex;
	flex-direction: column;
	height: calc(100vh - 94px);
}
.tab {
	width: 100%;
	display: flex;
	align-items: center;
	background-color: $uni-white-color;
	.item {
		flex: 1;
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: $uni-secondary-text-color;
		.title {
			font-size: 28rpx;
			color: #818181;
			position: relative;
			&.active {
				color: $uni-main-text-color;
				font-weight: 500;
				&::after {
					content: '';
					width: 100%;
					height: 8rpx;
					background-image: linear-gradient(210deg, #f25c4d 25%, #e52d21 100%, #e52d21 100%);
					position: absolute;
					bottom: -25rpx;
					display: block;
					border-radius: 4rpx;
				}
			}
		}
	}
}
</style>