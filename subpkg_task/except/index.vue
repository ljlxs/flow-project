<template>
	<view class="page-container">
		<uni-list class="uniList" :border="false">
			<uni-list-item title="异常时间" showArrow :rightText="123"></uni-list-item>
			<uni-list-item title="上报位置" showArrow :rightText="123"></uni-list-item>
			<uni-list-item title="异常类型" showArrow :rightText="123"></uni-list-item>
			<uni-list-item title="异常描述" direction="column">
				<template v-slot:footer>
					<view class="textarea">
						<textarea v-model="textareaVal" placeholder="请输入异常描述" class=""></textarea>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<uni-list class="uniList" :border="false" style="margin-top: 30rpx">
			<uni-list-item title="上传图片（最多6张）" direction="column">
				<template v-slot:footer>
					<view style="margin-top: 30rpx">
						<uni-file-picker limit="9"></uni-file-picker>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script setup>
import { ref } from 'vue';
const textareaVal = ref('');
</script>

<style lang="scss">
.page-container {
	height: calc(100vh - 44px);
	padding: 30rpx;
	.uniList {
		background-color: #fff;
		border-radius: 15rpx;
		padding: 0 25rpx;
		::v-deep .uni-list-item__container {
			padding-left: 0;
		}
		::v-deep .uni-list-item__content-title {
			font-size: 28rpx;
			color: #2a2929;
		}
		::v-deep .uni-list-item__extra-text {
			font-size: 28rpx;
			color: #818181;
		}
		.textarea {
			background: #f4f4f4;
			border-radius: 16rpx;
			padding: 25rpx;
			margin-top: 20rpx;
		}
	}
}
</style>
