<script setup>
import { ref } from 'vue';
import MobileLogin from './components/MobileLogin.vue';
const LoginTextInd = ref(0);
const LoginText = ref([
	{
		title: '账号登录',
		subTitle: '手机号登陆'
	},
	{
		title: '手机号登陆',
		subTitle: '账号登录'
	}
]);
const FlgeText = () => {
	LoginTextInd.value = Math.abs(LoginTextInd.value - 1);
};
</script>

<template>
	<view class="login">
		<view class="top">
			<view class="mobile-login">{{ LoginText[LoginTextInd].title }}</view>
			<view class="user-login" @click="FlgeText">
				{{ LoginText[LoginTextInd].subTitle }}
				<text class="iconfont icon-caret"></text>
			</view>
		</view>
		<MobileLogin />
	</view>
</template>

<style lang="scss">
.login {
	padding: 0 66rpx;
	.top {
		display: flex;
		margin: 100rpx 0 91rpx;
		justify-content: space-between;
		align-items: flex-end;
		.mobile-login {
			font-weight: 600;
			font-size: 48rpx;
			color: #2a2929;
		}
		.user-login {
			font-weight: 500;
			font-size: 32rpx;
			color: #ef4f3f;
			.icon-caret {
				margin-left: 14rpx;
				font-size: 50%;
			}
		}
	}
}
</style>
