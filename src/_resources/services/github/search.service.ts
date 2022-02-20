import BaseRequest from '@/utils/request'
import { HOSTS } from '@/constants/index'

/**
 * 搜索服务
 */
class SearchService extends BaseRequest {
	constructor() {
		super({
			hostKey: HOSTS.TARO_API_BASE,
		})
	}

	/**
	 * 获取用户信息
	 */
	searchByType(payload: { type: string; keyword: string }) {
		const { type, keyword } = payload
		return this.get({
			url: `/github/search/${type}?q=${keyword}`,
			data: payload,
		})
	}
}

export default new SearchService()
