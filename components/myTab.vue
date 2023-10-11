<template>
	<view class="tab">
		<view @click="tabChang(index)" v-for="(item, index) in list" :key="index" class="item">
			<view class="title" :class="{ active: tabInd == index }">
				{{ item.title }}
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
defineProps({
	list: Array
});
const tabInd = ref(0);
const tabChang = (index) => {
	tabInd.value = index;
};
</script>

<style lang="scss">
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
</style>
