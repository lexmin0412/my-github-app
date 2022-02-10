const config = {
	defineConstants: {
		TARO_API_BASE: JSON.stringify(
			process.env.TARO_ENV === 'weapp' ? 'https://api.cellerchan.top' : '/api'
		), // h5本地调试时接口使用代理 指向需要请求的后端服务
	},
	h5: {
		devServer: {
			port: '9001',
			open: false,
			https: false,
			proxy: {
				'/api': {
					target: 'https://api.cellerchan.top',
					changeOrigin: true,
					ws: false,
					pathRewrite: {
						'^/api': ``,
					},
				},
			},
		},
	},
}

module.exports = config
