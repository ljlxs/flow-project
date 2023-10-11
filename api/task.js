import uniFetch from './uni-fetch.js';
//任务
export const getTasksList = (data) => {
	return uniFetch({ url: '/driver/tasks/list', method: 'GET', data });
};
// 任务详情
export const getTasksDetails = (jobId) => {
	return uniFetch({ url: `/driver/tasks/details/${jobId}`, method: 'GET' });
};
// 延迟提货
export const getTasksDelay = (data) => {
	return uniFetch.put('/driver/tasks/delay', data);
};
