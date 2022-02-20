import { usePageScroll } from '@tarojs/taro'
import React, { useState } from 'react'
import { View } from '@tarojs/components'
import Router from '@/utils/route'
import {
	Avatar,
	Loading,
	List,
	Toast,
	Search,
	Navbar,
	Sticky,
} from '@taroify/core'
import searchService from '@/services/github/search.service'

import './index.scss'

const Index = (): JSX.Element => {
	const [value, setValue] = useState('')
	const [open, setOpen] = useState(false)
	const [list, setList] = useState([])

	const [hasMore, setHasMore] = useState(true)
	const [loading, setLoading] = useState(false)
	const [scrollTop, setScrollTop] = useState(0)

	usePageScroll(({ scrollTop: aScrollTop }) => setScrollTop(aScrollTop))

	const handleSearch = async () => {
		console.log('handleSearch', value)
		setLoading(true)
		try {
			const result: any = await searchService.searchByType({
				type: 'users',
				keyword: value,
			})
			console.log('result', result)
			if (result.code === '0' && result.data) {
				setList(result.data.items)
				setHasMore(list.length < 40)
				setLoading(false)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleUserItemClick = (userName: string) => {
		Router.navigateTo({
			url: `/user/detail?userName=${userName}`,
		})
	}

	return (
		<View className='index'>
			<Sticky>
				<Navbar title='发现' />
			</Sticky>
			<Toast open={open} onClose={() => setOpen(false)}>
				取消
			</Toast>
			<Search
				className='search-bar'
				value={value}
				placeholder='请输入搜索关键词，暂只支持搜索用户'
				onChange={e => setValue(e.detail.value)}
				onCancel={() => setOpen(true)}
				onSearch={() => handleSearch()}
			/>
			<List
				loading={loading}
				hasMore={hasMore}
				scrollTop={scrollTop}
				onLoad={() => handleSearch}
			>
				{list.map(item => (
					<div
						className='user-item'
						key={item.id}
						onClick={() => handleUserItemClick(item.login)}
					>
						<Avatar
							className='user-item-avatar'
							size='small'
							src={item.avatar_url}
						/>
						<div className='user-item-name'>{item.login}</div>
					</div>
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
