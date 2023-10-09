import uniFetch from './uni-fetch.js';

export const login = (data) => {
	return uniFetch({ url: '/driver/login/account', method: 'post', data });
};
// 获取用户信息
export const getUserInfo = (data) => {
	return uniFetch({ url: '/driver/users', method: 'GET' });
};
// 任务数据
export const getMyUserList = (data) => {
	return uniFetch({ url: '/driver/users/taskReport', method: 'GET', data });
};
// 车辆信息
export const getUserTruck = () => {
	return uniFetch({ url: '/driver/users/truck', method: 'GET' });
};
