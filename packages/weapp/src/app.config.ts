const config: Taro.AppConfig = defineAppConfig({
	pages: [
		'pages/index/index',
		'pages/my/index',
	],
	window: {
		backgroundTextStyle: 'light',
		navigationBarBackgroundColor: '#fff',
		navigationBarTitleText: 'OK!',
		navigationBarTextStyle: 'black',
	},
	tabBar: {
		list: [
			{
				iconPath: 'asserts/calendar-small.png',
				selectedIconPath: 'asserts/calendar.png',
				pagePath: 'pages/index/index',
				text: '科创日历',
			},
			{
				iconPath: 'asserts/house-small.png',
				selectedIconPath: 'asserts/house.png',
				pagePath: 'pages/my/index',
				text: '我的信息',
			},
		],
	},
});
export default config;
