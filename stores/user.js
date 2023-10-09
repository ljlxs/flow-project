import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useUserStore = defineStore(
	'counter',
	() => {
		const token = ref('');

		return { token };
	},
	{
		persist: true
	}
);
