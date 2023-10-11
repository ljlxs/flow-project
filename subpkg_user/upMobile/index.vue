<script setup>
import { ref } from 'vue';
const formData = ref({
	mobel: '',
	code: ''
});
const rules = ref();
const codeText = ref('获取验证码');
let down = 0;
const time = ref(0);
const queryCode = () => {
	if (time.value > 0) return;
	time.value = 60;
	clearInterval(down);
	down = setInterval(() => {
		time.value--;
		codeText.value = `${time.value}s后重新获取`;
		if (time.value <= 0) {
			clearInterval(down);
			codeText.value = `获取验证码`;
		}
	}, 1000);
};
</script>

<template>
	<view class="upmobel">
		<uni-forms ref="logForms" :modelValue="formData" :rules="rules">
			<uni-forms-item name="mobel">
				<input placeholder-style="color: #818181" class="uni-input-input" type="text" v-model="formData.mobel" placeholder="请输入已绑定手机号" />
			</uni-forms-item>
			<uni-forms-item name="code" class="inpCode">
				<input placeholder-style="color: #818181" class="uni-input-input" type="text" v-model="formData.code" placeholder="请输入验证码" />
				<view class="code" :class="{ active: time > 0 }" @click="queryCode">{{ codeText }}</view>
			</uni-forms-item>
		</uni-forms>
	</view>
</template>

<style lang="scss">
.upmobel {
	padding: 0 66rpx;
	.uni-forms {
		input {
			border-bottom: 1px solid #eee;
		}
	}
	.inpCode {
		> input {
			position: relative;
			display: flex;
			align-items: center;
		}
		.code {
			position: absolute;
			right: 0;
			top: 50%;
			transform: translate(0, -50%);
			padding: 6rpx 30rpx;
			border-left: 1px solid #eee;
			font-size: 28rpx;
			background-color: #fff;
		}
		.active {
			color: #eee;
		}
	}
}
</style>
