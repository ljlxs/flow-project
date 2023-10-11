<script setup>
import { onLoad } from '@dcloudio/uni-app';
import useNotify from '../composable/useNotify';
const { isEmpty, isTriggered, notifyPageList, notifyMessagesPage, onScrolltolower, onRefresh, allRead } = useNotify();
onLoad(() => {
	notifyMessagesPage();
});
</script>

<template>
	<scroll-view @refresherrefresh="onRefresh" :refresher-triggered="isTriggered" refresher-enabled @scrolltolower="onScrolltolower" class="scroll-view" scroll-y="true">
		<view class="announce">
			<view class="announce-top" @click="allRead">
				<text class="iconfont icon-clear"></text>
				全部已读
			</view>
			<uni-card v-for="(item, index) in notifyPageList" :key="index" class="card" :is-shadow="false" padding="0">
				<template v-slot:title>
					<view :class="{ redi: item.isRead === 0 }" class="title">{{ item.title }}</view>
				</template>
				<view class="card_text">
					<text class="conten">{{ item.content }}</text>
					<view class="card_bom">
						<text>{{ item.created }}</text>
						<view class="details">查看详情</view>
					</view>
				</view>
			</uni-card>
		</view>
		<view v-if="isEmpty" class="message-blank"></view>
	</scroll-view>
</template>

<style lang="scss">
@import './index.scss';
.card {
	margin: 0 30rpx 30rpx !important;
	border-radius: 15rpx;

	.title {
		padding: 32rpx 0;
		border-bottom: 1px solid #eee;
		font-size: 28rpx;
		color: #2a2929;
		display: flex;
		align-items: center;
	}
	.redi::after {
		content: '';
		width: 16rpx;
		height: 16rpx;
		background-color: red;
		border-radius: 50%;
		display: block;
		margin-left: 10rpx;
	}
	.card_text {
		font-size: 26rpx;
		color: #818181;
		padding: 10px 0;
		.conten {
			font-size: $uni-font-size-small;
			color: $uni-secondary-text-color;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			/*设置子元素排列方式*/
			-webkit-box-orient: vertical;
			/*设置显示的行数，多出的部分会显示为...*/
			-webkit-line-clamp: 1;
		}
		.card_bom {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 12rpx;
		}
		.details {
			width: 152rpx;
			height: 48rpx;
			border: 2rpx solid #ef4f3f;
			border-radius: 24rpx;
			text-align: center;
			color: #ef4f3f;
		}
	}
}
</style>
