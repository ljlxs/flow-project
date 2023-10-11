<script setup>
import { ref } from 'vue';
import Pickup from './components/Pickup';
import EnRoute from './components/EnRoute';
import Completed from './components/Completed';
const tabInd = ref(0);
const tabItem = ref([
	{ title: '待提货', flag: true },
	{ title: '在途', flag: false },
	{ title: '已完成', flag: false }
]);
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
		<view class="message-list" v-show="tabInd == 0" v-if="tabItem[0].flag">
			<Pickup></Pickup>
		</view>
		<view class="message-list" v-show="tabInd == 1" v-if="tabItem[1].flag">
			<EnRoute></EnRoute>
		</view>
		<view class="message-list" v-show="tabInd == 2" v-if="tabItem[2].flag">
			<Completed></Completed>
		</view>
	</view>
</template>

<style lang="scss">
.page-container {
	height: calc(100vh - 50px);
	display: flex;
	flex-direction: column;
}
.tab {
	width: 100%;
	display: flex;
	align-items: center;
	background-color: $uni-white-color;
	padding: calc(env(safe-area-inset-top) + 13px) 60rpx 0;
	.item {
		margin-right: 72rpx;
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: $uni-secondary-text-color;
		.title {
			font-size: 28rpx;
			color: #818181;
			position: relative;
			font-weight: 600;
			&.active {
				color: $uni-main-text-color;
				font-weight: 600;
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
.message-list {
	flex: 1;
	overflow: hidden;
}
</style>
