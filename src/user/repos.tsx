/**
 * 用户仓库列表
 */
import { useRouter, usePageScroll } from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { Navbar, List, Loading, Sticky } from '@taroify/core'
import usersService from '@/services/github/users.service'
import Router from '@/utils/route'
import dayjs from 'dayjs'

import './repos.scss'

const Repos = (): JSX.Element => {

	const {params: { type, userName }} = useRouter() as any

	const [repos, setRepos] = useState<Array<any>>([])

	const [page, setPage] = useState(1)
	const [hasMore, setHasMore] = useState(true)
	const [loading, setLoading] = useState(false)
	const [scrollTop, setScrollTop] = useState(0)

	usePageScroll(({scrollTop: aScrollTop}) => setScrollTop(aScrollTop))

	useEffect(() => {
		getReposByPage()
	}, [])

	const getReposByPage = () => {
		setLoading(true)
		usersService.getUserDataByType({
			userName,
			type,
			sort: 'updated',
			page
		}).then((res: any) => {
			console.log('res', res)
			setRepos([...repos, ...res.data])
			setPage(page + 1)
			setLoading(false)
			if ( res.data && res.data.length < 30 ) {
				setHasMore(false)
			}
		})
	}

	const handleRepoClick = (userName: string) => {
		Router.navigateTo({
			url: `/repos/detail?userName=${userName}`
		})
	}

	return (
		<View className='users-repos-page'>
			<Sticky>
				<Navbar title="项目" />
			</Sticky>
			<List
				loading={loading}
				hasMore={hasMore}
				scrollTop={scrollTop}
				onLoad={getReposByPage}
			>
				{
					repos.map((item: any) => {
						return (
							<View className="repo-item"
								key={item.id}
								onClick={() => handleRepoClick(item)}
							>
								<View className="repo-item-header">
									<View className="repo-item-title">
										{item.name}
									</View>
									<View className="repo-item-starrgazer">
										⭐️ {item.stargazers_count}
									</View>
								</View>
								<View className="repo-item-desc">
									{item.description}
								</View>
								<View className="repo-item-bottom">
									<View className="repo-item-language">
										{item.language}
									</View>
									<View className="repo-item-update-time">
										{dayjs(item.updated_at).format('YYYY-MM-DD')}
									</View>
								</View>
							</View>
						)
					})
				}
				<List.Placeholder>
					{loading && <Loading>加载中...</Loading>}
					{!hasMore && "没有更多了"}
				</List.Placeholder>
			</List>
		</View>
	)
}

export default Repos
