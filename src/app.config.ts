export default defineAppConfig({
	entryPagePath: 'activity/index',
	pages: [
		'index/index',
		'activity/index',
		'user/index',
		'user/detail',
		'user/repos',
	],
	subpackages: [
		{
			root: 'default',
			pages: ['404'],
		},
		{
			root: 'demo',
			pages: ['router/router', 'router/routerTarget'],
		},
		{
			root: 'webview',
			pages: ['index'],
		},
		{
			root: 'follow',
			pages: ['index'],
		},
		{
			root: 'repo',
			pages: ['detail'],
		},
	],
	tabBar: {
		custom: true,
		selectedColor: '#ff0036',
		list: [
			{
				pagePath: 'activity/index',
				text: '动态',
				iconPath: './_resources/assets/icons/activity.png',
				selectedIconPath: './_resources/assets/icons/activity_selected.png',
			},
			{
				pagePath: 'index/index',
				text: '发现',
				iconPath: './_resources/assets/icons/home.png',
				selectedIconPath: './_resources/assets/icons/home_selected.png',
			},
			{
				pagePath: 'user/index',
				text: '我的',
				iconPath: './_resources/assets/icons/user.png',
				selectedIconPath: './_resources/assets/icons/user_selected.png',
			},
		],
	},
	window: {
		navigationStyle: 'custom',
	},
	// 页面切换动画
	animation: {
		duration: 196, // 动画切换时间，单位毫秒
		delay: 50, // 切换延迟时间，单位毫秒
	},
})
