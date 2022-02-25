/**
 * 动态
 */

import { usePageScroll } from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { View, Image } from '@tarojs/components'
import { List, Loading } from '@taroify/core'
import NavHeader from '@/components/nav_header'
import { Ellipsis } from '@taroify/icons'
import './index.scss'
import usersService from '@/services/github/users.service'
import dayjs from 'dayjs'

const Index = (): JSX.Element => {
	const [activities, setActivities] = useState<any[]>([])

	const [hasMore, setHasMore] = useState(true)
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)
	const [scrollTop, setScrollTop] = useState(0)

	usePageScroll(({ scrollTop: aScrollTop }) => setScrollTop(aScrollTop))

	useEffect(() => {
		usersService
			.getUserDataByType({
				userName: 'lexmin0412',
				type: 'received_events',
				page,
			})
			.then((res: any) => {
				setActivities(res.data)
			})
	}, [])

	const handleLoadMore = async () => {
		setLoading(true)
		try {
			const result: any = await usersService.getUserDataByType({
				userName: 'lexmin0412',
				type: 'received_events',
				page,
			})
			console.log('activities', activities)

			console.log('result', result)
			if (result.code === '0' && result.data) {
				setActivities([...activities, ...result.data])
				setHasMore(!(result.data.length < 30))
				setLoading(false)
				setPage(page + 1)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<View className='activity-index-page'>
			<NavHeader title='动态' />
			<List
				loading={loading}
				hasMore={hasMore}
				scrollTop={scrollTop}
				onLoad={() => handleLoadMore()}
				className='activity-list'
			>
				{activities.map(item => (
					<View className='activity-item' key={item.id}>
						<View className='activity-item-top'>
							<Image
								className='activity-item-avatar'
								src={item.actor.avatar_url}
							/>
							<View className='activity-item-name'>{item.actor.login}</View>
							<Ellipsis color='#333' />
						</View>
						<View className='activity-item-content'>
							<View className='activity-item-content-abbr'>{item.type}</View>
						</View>
						<View className='activity-item-bottom'>
							{dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss')}
						</View>
					</View>
				))}
				<List.Placeholder>
					{loading && <Loading>加载中...</Loading>}
					{!hasMore && '没有更多了'}
				</List.Placeholder>
			</List>
		</View>
	)
}

export default Index
