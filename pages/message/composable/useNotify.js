import { ref } from 'vue';
import { getMessagesPage, getMessagesReadAll } from '@/api/message.js';

export default function useNotify() {
	const isEmpty = ref(false);
	const hasMore = ref(false);
	// 下拉加载
	const isTriggered = ref(false);
	const contentType = ref('201');
	const page = ref(0);
	const pageSize = ref(5);
	const notifyPageList = ref([]);
	const notifyMessagesPage = async () => {
		page.value += 1;
		if (page.value == 1) notifyPageList.value = [];
		const res = await getMessagesPage(contentType.value, page.value, pageSize.value);
		notifyPageList.value = [...notifyPageList.value, ...(res.data.items || [])];
		hasMore.value = page.value == res.data.pages;
		isEmpty.value = notifyPageList.value.length === 0;
	};
	// 上拉刷新
	const onScrolltolower = () => {
		if (hasMore.value) return;
		notifyMessagesPage();
	};
	// 下拉加载
	const onRefresh = async () => {
		isTriggered.value = true;
		page.value = 0;
		await notifyMessagesPage();
		isTriggered.value = false;
	};
	// 全部已读
	const allRead = async () => {
		const res = await getMessagesReadAll(contentType.value);
		page.value = 0;
		notifyMessagesPage();
	};
	return { isEmpty, isTriggered, notifyPageList, notifyMessagesPage, onScrolltolower, onRefresh, allRead };
}
