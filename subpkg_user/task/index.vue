<script setup>
import { ref } from 'vue';
const info = ref({
	lunar: true,
	range: true,
	insert: false,
	selected: []
});
</script>

<template>
	<view class="task">
		<uni-calendar class="uni-calendar--hook" :selected="info.selected" :showMonth="false" @change="change" @monthSwitch="monthSwitch" />
	</view>
</template>

<style lang="scss"></style>
