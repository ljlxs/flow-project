<script setup>
import { computed, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getTasksDelay } from '@/api/task.js';
const planDepartureTime = ref('');
const routeId = ref('');
// 时间选择器
const PickerChange = ref(false);
// 选择时间
const PickerValue = ref('');
const textareaText = ref('');
// 监听textarea输入字数长度
const textareaLeng = computed(() => {
	return textareaText.value.length;
});
// 文本域
const textareaFlag = computed(() => {
	return textareaLeng.value == 0 || textareaLeng.value >= 50;
});
onLoad((e) => {
	planDepartureTime.value = e.planDepartureTime;
	routeId.value = e.id;
});
const bindTimeChange = (e) => {
	const [date] = planDepartureTime.value.split(' ');
	PickerValue.value = `${date} ${e.detail.value}`;
};

// 1. 选择的时间不能小于原定时间
//  * 2. 选择的时间不能大于原定时间的两个小时
const trimeFlag = computed(() => {
	// 原定时间
	const start = new Date(planDepartureTime.value).getTime();
	// 选择的时间
	const end = new Date(PickerValue.value).getTime();
	return end - start > 0 && end - start < 7200 * 1000;
});
// 按钮形状
const btnChang = computed(() => {
	return textareaFlag.value || !trimeFlag.value;
});
// 提交
const btnAdd = async () => {
	try {
		const data = {
			id: routeId.value,
			delayTime: PickerValue.value,
			delayReason: textareaText.value
		};
		const res = await getTasksDelay(data);
		console.log(res);
		// 跳转到任务列表
		uni.reLaunch({ url: '/pages/task/index' });
	} catch (e) {
		console.log(e);
	}
};
</script>

<template>
	<view class="page-container">
		<view class="box">
			<uni-list :border="false">
				<uni-list-item title="原定时间" :right-text="planDepartureTime"></uni-list-item>
				<uni-list-item title="延迟时间" showArrow>
					<template v-slot:footer>
						<picker mode="time" :value="PickerChange" @change="bindTimeChange">
							<view v-if="!PickerValue" class="footerText">不可超过2个小时</view>
							<view :class="{ error: !trimeFlag }" v-else class="footerText">{{ PickerValue + ':00' }}</view>
						</picker>
					</template>
				</uni-list-item>
				<uni-list-item>
					<template v-slot:body>
						<view class="textarea">
							<textarea v-model="textareaText" placeholder="请输入延迟提货原因"></textarea>
							<text :class="{ error: textareaFlag }" class="textarea-text">{{ textareaLeng }}/50</text>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item :border="false">
					<template v-slot:body>
						<view class="btn">
							<button :disabled="btnChang" type="default" @click="btnAdd">提交</button>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<style lang="scss" scoped>
.page-container {
	height: calc(100vh - 44px);
	overflow: hidden;
	.box {
		margin: 30rpx;
		padding: 0 35rpx;
		background-color: #fff;
		border-radius: 15rpx;
		.textarea {
			width: 100%;
			height: 260rpx;
			background: #f4f4f4;
			border-radius: 16rpx;
			padding: 25rpx;
			position: relative;
			box-sizing: border-box;
			> textarea {
				width: 100%;
			}
		}
		.textarea-text {
			position: absolute;
			right: 25rpx;
			bottom: 25rpx;
			font-size: 28rpx;
			color: #818181;
		}
		.footerText {
			font-size: 28rpx;
			color: #818181;
		}
		::v-deep .uni-list-item__container {
			padding-left: 0;
		}
		::v-deep .uni-list-item__content-title {
			font-size: 28rpx;
			color: #2a2929;
		}
		::v-deep .uni-list-item__extra {
			font-size: 28rpx;
			color: #818181;
		}
		.btn {
			width: 100%;
			> button {
				width: 414rpx;
				height: 100rpx;
				background: #ef4f3f;
				border-radius: 50rpx;
				text-align: center;
				color: #fff;
				&[disabled] {
					background-color: #fadcd9;
				}
			}
		}
	}
}
.error {
	color: $uni-main-color !important;
}
</style>
