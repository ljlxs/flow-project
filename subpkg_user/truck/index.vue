<script setup>
import { onMounted, ref } from 'vue';
import { getUserTruck } from '../../api/login.js';
const TruckList = ref();
const UserTruck = async () => {
	const res = await getUserTruck();
	console.log('res', res);
	TruckList.value = res.data;
};
onMounted(() => {
	UserTruck();
});
</script>

<template>
	<view class="page-container truck">
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in TruckList?.pictureList" :key="index">
				<image class="img" :src="item.url" mode=""></image>
			</swiper-item>
		</swiper>
		<uni-list class="list" :border="false">
			<uni-list-item :border="false" title="车辆编号" :rightText="TruckList.id"></uni-list-item>
			<uni-list-item :border="false" title="车辆号牌" :rightText="TruckList.licensePlate"></uni-list-item>
			<uni-list-item :border="false" title="车型" :rightText="TruckList.truckType"></uni-list-item>
			<uni-list-item :border="false" title="所属机构" :rightText="TruckList.currentOrganName"></uni-list-item>
			<uni-list-item :border="false" title="载重" :rightText="TruckList.allowableLoad"></uni-list-item>
		</uni-list>
	</view>
</template>

<style lang="scss">
.truck {
	padding: 30rpx;
	.swiper {
		width: 100%;
		height: 400rpx;
		border-radius: 16rpx;
		overflow: hidden;
		margin-bottom: 30rpx;
		.img {
			width: 100%;
			height: 100%;
		}
	}
	.list {
		border-radius: 15rpx;
		::v-deep .uni-list-item {
			border-radius: 15rpx;
		}
		::v-deep .uni-list-item__extra-text {
			font-size: 28rpx;
			color: #2a2929;
		}

		::v-deep .uni-list-item__content-title {
			font-size: 28rpx;
			color: #818181;
		}
	}
}
</style>
