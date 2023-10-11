<script setup></script>

<template>
	<view class="page-container">
		<uni-list :border="false">
			<uni-list-item title="换绑手机" showArrow to="/subpkg_user/upMobile/index"></uni-list-item>
			<uni-list-item title="修改密码" showArrow></uni-list-item>
			<uni-list-item title="消息通知设置" showArrow></uni-list-item>
			<uni-list-item title="修改密码" showArrow></uni-list-item>
			<uni-list-item title="清理缓存" showArrow></uni-list-item>
		</uni-list>
		<!-- <button type="default" class="btn">退出</button> -->
		<view class="btn">退出</view>
	</view>
</template>

<style lang="scss">
.page-container {
	padding: 40rpx 30rpx 0;
	::v-deep .uni-list-item__content-title {
		font-size: 32rpx;
		color: #2a2929;
	}
	::v-deep .uni-list {
		padding: 0 35rpx;
		border-radius: 15rpx;
	}
	::v-deep .uni-list-item__container {
		padding-left: 0rpx;
	}
	.btn {
		width: 100%;
		margin-top: 80rpx;
		height: 120rpx;
		background: #ffffff;
		border-radius: 16rpx;
		font-size: 32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
