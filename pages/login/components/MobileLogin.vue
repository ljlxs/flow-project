<script setup>
import { ref } from 'vue';
import { login } from '@/api/login.js';
import { useUserStore } from '../../../stores/user.js';
import { onLoad } from '@dcloudio/uni-app';
const store = useUserStore();
const formData = ref({
	account: 'xbsj001',
	password: '123456'
});
const logForms = ref();
const redirectURL = ref();
const routeType = ref();
onLoad((e) => {
	redirectURL.value = e.redirectUrl;
	routeType.value = e.routeType;
});
const rules = ref({
	account: {
		rules: [
			{
				required: true,
				errorMessage: '请输入登录账号'
			},
			{
				pattern: /^[a-zA-Z0-9]{6,8}$/,
				errorMessage: '登录账号格式不正确'
			}
		]
	},
	password: {
		rules: [
			{
				required: true,
				errorMessage: '请输入登录密码'
			},
			{
				pattern: /^\d{6}$/,
				errorMessage: '登录密码格式不正确'
			}
		]
	}
});
//登录按钮
const loginBtn = async () => {
	try {
		const fromData = await logForms.value.validate();
		const res = await login(fromData);
		if (res.data) store.token = res.data;
		uni[routeType.value]({
			url: redirectURL.value
		});
	} catch (e) {
		console.log('e', e);
	}
};
</script>
<template>
	<uni-forms ref="logForms" :modelValue="formData" :rules="rules">
		<uni-forms-item name="account">
			<input placeholder-style="color: #818181" class="uni-input-input" type="text" v-model="formData.account" placeholder="请输入手机号" />
		</uni-forms-item>
		<uni-forms-item name="password">
			<input placeholder-style="color: #818181" class="uni-input-input" type="text" v-model="formData.password" placeholder="请输入密码" />
		</uni-forms-item>
	</uni-forms>
	<button @click="loginBtn" class="logBtn">登录</button>
</template>

<style lang="scss">
.uni-forms {
	.uni-forms-item {
		height: 100rpx;
		margin-bottom: 20 !important;
		border-bottom: 2rpx solid #eee;
		box-sizing: border-box;
		::v-deep .uni-forms-item__content {
			display: flex;
			align-items: center;
		}

		::v-deep input {
			width: 100%;
			font-size: $uni-font-size-base;
			color: $uni-main-text-color;
		}
		::v-deep .uni-forms-item__error {
			font-weight: 400;
			font-size: $uni-font-size-small;
			color: #ef4f3f;
			transition: none;
			width: 100%;
			padding-top: 19.5rpx;
			border-top: 2rpx solid $uni-main-color;
		}
	}
}
.logBtn {
	width: 100%;
	height: 100rpx;
	// background: #ef4f3f;
	background-color: #fadcd9;
	border-radius: 49.54rpx;
	color: $uni-white-color;
	font-size: $uni-font-size-big;
	margin-top: 80rpx;
}
.disabled {
	// background-color: #fadcd9;
	background: #ef4f3f;
	color: $uni-white-color;
}
</style>
