import BaseRequest from '@/utils/request'
import { HOSTS } from '@/constants/index'

/**
 * 用户服务
 */
class RepoService extends BaseRequest {
	constructor() {
		super({
			hostKey: HOSTS.TARO_API_BASE,
		})
	}

	/**
	 * 获取仓库信息
	 */
	getRepoInfo(payload: { userName: string; repoName: string }) {
		const { userName, repoName } = payload
		console.log('userName', userName)
		console.log('repoName', repoName)

		return this.get({
			url: `/github/repos/${userName}/${repoName}`,
			data: {},
		})
	}

	/**
	 * 获取仓库信息
	 */
	getRepoInfoByType(payload: {
		userName: string
		repoName: string
		infoType?: 'stargazers' | 'readme'
	}) {
		const { userName, repoName, infoType } = payload
		return this.get({
			url: `/github/repos/${userName}/${repoName}/${infoType}`,
			data: {},
		})
	}
}

export default new RepoService()
