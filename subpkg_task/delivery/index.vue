<script setup>
import { ref, computed } from 'vue';
import { getDeliver } from '@/api/task.js';
import { onLoad } from '@dcloudio/uni-app';
const id = ref('');
onLoad((e) => {
	id.value = e.id;
});
const deliverPicture = ref([]);
const deliverPictureList = computed(() => {
	return certificatePicture.value.map((item) => {
		return {
			url: item.url
		};
	});
});
const certificatePicture = ref([]);
const certificatePictureList = computed(() => {
	return certificatePicture.value.map((item) => {
		return {
			url: item.url
		};
	});
});
const btnFlag = computed(() => {
	return deliverPictureList.value.length > 0 && certificatePictureList.value.length > 0;
});
// 提交
const addBtn = async () => {
	const data = {
		deliverPictureList: deliverPictureList.value,
		id: id.value,
		certificatePictureList: certificatePictureList.value
	};
	const res = await getDeliver(data);
	// 跳转到任务详情
	uni.reLaunch({
		url: '/pages/task/index'
	});
};
</script>

<template>
	<view class="page-container">
		<view class="pickUp">
			<view class="view">
				<uni-file-picker v-model="deliverPicture" file-extname="jpg,webp,gif,png" title="请拍照上传提货凭证" limit="3"></uni-file-picker>
			</view>
			<view class="">
				<uni-file-picker v-model="certificatePicture" file-extname="jpg,webp,gif,png" title="请拍照上传货品照片" limit="3"></uni-file-picker>
			</view>
			<button :disabled="!btnFlag" class="btn" type="default" @click="addBtn">提交</button>
		</view>
	</view>
</template>

<style lang="scss">
.page-container {
	height: calc(100vh - 44px);
	padding: 30rpx;
	.pickUp {
		padding: 35rpx;
		background-color: #fff;
		border-radius: 15rpx;
		.view {
			margin-bottom: 30rpx;
		}
		.btn {
			text-align: center;
			border-radius: 100rpx;
			margin-top: 60rpx;
			color: #fff;
			font-size: $uni-font-size-big;
			background-color: $uni-main-color;
			&[disabled] {
				color: #fff;
				background-color: #fadcd9;
			}
		}
	}
}
</style>
