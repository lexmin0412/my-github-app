/**
 * 是否是微信h5
 */
export const isWechatH5 = () => {
	if (navigator) {
		const userAgent: any = navigator.userAgent.toLowerCase()
		return userAgent.match(/MicroMessenger/i) == 'micromessenger'
	}
	return false
}
