// 导⼊安装好的 uni-app-fetch 模块
import { createUniFetch } from 'uni-app-fetch';
import { useUserStore } from '../stores/user.js';
// taBber页面
const tabBarPagePaths = ['pages/task/index', 'pages/my/index', 'pages/message/index'];
// 配置符合⾃身业务的请求对象
const uniFetch = createUniFetch({
	loading: { title: '正在加载...' },
	baseURL: 'https://slwl-api.itheima.net',
	intercept: {
		// 请求拦截器
		request(options) {
			const store = useUserStore();
			const defaultHeader = {
				Authorization: store.token
			};
			// 对象合并后面会覆盖前面
			options.header = Object.assign({}, defaultHeader, options.header);
			return options;
		},
		// 响应拦截器
		response(result) {
			if (result.statusCode === 200 && result.data.code === 200) {
				return result.data;
			}
			if (result.statusCode === 401) {
				//token过期处理
				const pageStack = getCurrentPages();
				const redirectUrl = pageStack[pageStack.length - 1].route;
				const routeType = tabBarPagePaths.includes(redirectUrl) ? 'switchTab' : 'redirectTo';
				return uni.redirectTo({
					url: `/pages/login/index?routeType=${routeType}&redirectUrl=/${redirectUrl}`
				});
			}
			uni.utils.toast(result.data.msg || '请求失败');
		}
	}
});
export default uniFetch;
