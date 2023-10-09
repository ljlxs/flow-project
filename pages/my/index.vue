<script setup>
import { ref } from 'vue';
import { getUserInfo, getMyUserList } from '../../api/login.js';
import { onLoad } from '@dcloudio/uni-app';
const info = ref();
const userData = ref();
// 个人信息
const UserInfo = async () => {
	const res = await getUserInfo();
	info.value = res.data;
};
//任务数据
const userList = async () => {
	const res = await getMyUserList(uni.utils.getYearAndMonth());
	userData.value = res.data;
};
onLoad(() => {
	UserInfo();
	userList();
});
</script>
<template>
	<view class="my">
		<view class="topRedBg" v-if="info">
			<view class="user">
				<img :src="info.avatar" alt="" />
				<view class="userIfon-name">{{ info.name }}</view>
				<view class="userIfon-serial">司机编号：{{ info.number }}</view>
				<view class="userIfon-mobil">手机号：{{ info.phone }}</view>
			</view>
			<view class="task" v-if="userData">
				<view class="task_topText">- 本月任务 -</view>
				<view class="taskflex">
					<view class="item">
						<view class="">{{ userData.taskAmounts }}</view>
						<view class="">任务总量</view>
					</view>
					<view class="item">
						<view class="">{{ userData.completedAmounts }}</view>
						<view class="">任务总量</view>
					</view>
					<view class="item">
						<view class="">{{ userData.transportMileage }}</view>
						<view class="">任务总量</view>
					</view>
				</view>
			</view>
			<view class="list">
				<uni-list :border="false">
					<uni-list-item to="/subpkg_user/truck/index" title="车辆信息" showArrow></uni-list-item>
					<uni-list-item to="/subpkg_user/task/index" title="任务数据" showArrow></uni-list-item>
					<uni-list-item to="/subpkg_user/settings/index" title="系统设置" showArrow></uni-list-item>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<style lang="scss">
@import './index.scss';
</style>
