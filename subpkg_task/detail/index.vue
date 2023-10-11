<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getTasksDetails } from '@/api/task.js';
// onNavigationBarButtonTap() 为监听右侧文字的点击的事件
const detailsList = ref({});
const TasksDetails = async (id) => {
	const res = await getTasksDetails(id);
	console.log('res', res);
	detailsList.value = res.data;
};
onLoad((e) => {
	console.log(e);
	TasksDetails(e.id);
});
const flag = ref(false);
</script>

<template>
	<view class="page-containers">
		<view class="Pickup">
			<view class="top">
				<text class="top_left">基本信息</text>
				<!-- <text class="top_rig">已延迟</text> -->
				<image src="@/static/btn_zhankai.png" mode=""></image>
			</view>
			<view class="conten">
				<view class="conten_txt">
					<text>{{ detailsList?.startAddress }}</text>
					<text>{{ detailsList?.endAddress }}</text>
				</view>
			</view>
			<view class="list-bom">
				<uni-list :border="false">
					<uni-list-item :border="false" title="任务编号" :rightText="detailsList.transportTaskId"></uni-list-item>
					<uni-list-item :border="false" title="联系人" :rightText="detailsList.startHandoverName"></uni-list-item>
					<uni-list-item :border="false" title="联系电话" :rightText="detailsList.startHandoverPhone">
						<template v-slot:footer>
							<view class="list-rig">
								{{ detailsList.startHandoverPhone }}
								<image src="@/static/mobile.png"></image>
							</view>
						</template>
					</uni-list-item>
					<uni-list-item :border="false" title="提货时间" :rightText="detailsList.planDepartureTime"></uni-list-item>
					<uni-list-item :border="false" title="预计送达时间" :rightText="detailsList.planArrivalTime"></uni-list-item>
				</uni-list>
			</view>
		</view>
		<view class="page-bom">
			<view class="bom-item" :class="flWidth">
				<view class="top">
					<text>车辆司机信息</text>
					<image @click="flag = true" src="@/static/btn_zhankai.png" mode=""></image>
				</view>
			</view>
			<view class="bom-item">
				<text>运输路线</text>
				<image src="@/static/btn_zhankai.png" mode=""></image>
			</view>
			<view class="bom-item">
				<text>物品信息</text>
				<image src="@/static/btn_zhankai.png" mode=""></image>
			</view>
			<view class="bom-item">
				<text>提货信息</text>
				<image src="@/static/btn_zhankai.png" mode=""></image>
			</view>
		</view>
		<view class="flex-btn" v-if="detailsList.status === 1">
			<navigator :url="`/subpkg_task/delay/index?id=${detailsList.id}&planDepartureTime=${detailsList.planDepartureTime}`" hover-class="none" class="flex-left">延迟收货</navigator>
			<navigator :url="`/subpkg_task/pickups/index`" hover-class="none" class="flex-rig disabled">提货</navigator>
		</view>
		<view class="flex-btn" v-if="detailsList.status === 2">
			<navigator :url="`/subpkg_task/except/index`" hover-class="none" class="flex-left">异常上报</navigator>
			<navigator :url="`/subpkg_task/delivery/index`" hover-class="none" class="flex-rig disabled">支付</navigator>
		</view>
		<view class="flex-btn" v-if="detailsList.status === 4">
			<navigator :url="`/subpkg_task/record/index`" hover-class="none" class="flex-left">回车登记</navigator>
		</view>
	</view>
</template>

<style lang="scss">
.page-containers {
	background-color: #f4f4f4;
	padding-bottom: 140rpx;
	overflow: hidden;
}
.Pickup {
	margin: 30rpx;
	background-color: #fff;
	border-radius: 15rpx;
	padding: 35rpx;
	box-sizing: border-box;
	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.top_left {
			font-weight: 500;
			font-size: 32rpx;
			color: #2a2929;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		> image {
			width: 45rpx;
			height: 45rpx;
		}
		.top_rig {
			width: 104rpx;
			height: 44rpx;
			border: 2rpx solid #ef4f3f;
			border-radius: 22rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #ef4f3f;
			font-size: 24rpx;
		}
	}
	.conten {
		padding: 42rpx 0;
		border-bottom: 2rpx solid #f4f4f4;
		.conten_txt {
			font-size: 28rpx;
			color: #818181;
			display: flex;
			flex-direction: column;
			margin-left: 30rpx;
			padding: 0 44rpx;
			border-left: 2px dashed #ccc;
			position: relative;
			&::after {
				content: '起';
				width: 44rpx;
				height: 44rpx;
				background: #2a2929;
				border-radius: 22rpx;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				left: -22rpx;
				top: 0;
			}
			&::before {
				content: '止';
				width: 44rpx;
				height: 44rpx;
				background: #ef4f3f;
				border-radius: 22rpx;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				left: -22rpx;
				bottom: 0;
			}
			> text:first-child {
				margin-bottom: 29rpx;
			}
			> text:last-child {
				// margin-bottom: 29rpx;
			}
		}
	}
	.list-bom {
		.list-rig {
			font-size: 28rpx;
			display: flex;
			align-items: center;
			> image {
				width: 48rpx;
				height: 48rpx;
			}
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
	.task-blank {
		position: absolute;
		left: 50%;
		top: 40%;
		width: 201rpx;
		text-align: center;
		padding-top: 130rpx;
		background-image: url(https://sl-driver.oss-cn-hangzhou.aliyuncs.com/images/blank%402x.png);
		background-size: contain;
		background-repeat: no-repeat;
		font-size: 24rpx;
		color: $uni-secondary-text-color;
		transform: translate(-50%, -100%);
	}
}
.page-bom {
	padding: 0 30rpx;
}
.bom-item {
	background: #ffffff;
	border-radius: 20rpx;
	padding: 30rpx;
	display: flex;
	justify-content: space-between;
	font-size: 32rpx;
	color: #2a2929;
	margin-bottom: 29rpx;
	> image {
		width: 48rpx;
		height: 48rpx;
	}
	.top {
		display: flex;
		justify-content: space-between;
		width: 100%;
		> image {
			width: 48rpx;
			height: 48rpx;
		}
	}
}
.flex-btn {
	width: 100%;
	box-sizing: border-box;
	padding: 20rpx 30rpx;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	position: fixed;
	left: 0;
	bottom: 0;
	.flex-left,
	.flex-rig {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50rpx;
		height: 100rpx;
	}
	.flex-left {
		width: 250rpx;
		background: #e6e6e6;
	}
	.flex-rig {
		width: 414rpx;
		background: #ef4f3f;
		color: #ffffff;
	}

	.disabled {
		background: #fadcd9;
	}
}
</style>
