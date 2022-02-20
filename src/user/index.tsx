/**
 * 个人中心页面
 */

import React, { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { Navbar, Cell, Avatar, Sticky } from '@taroify/core'

import Router from '@/utils/route'
import usersService from '@/services/github/users.service'

import './index.scss'
import toast from '@/utils/toast'

const fileds = [
	{
		title: '项目',
		field: 'public_repos',
	},
	{
		title: '关注',
		field: 'following',
	},
	{
		title: '粉丝',
		field: 'followers',
	},
]

const userName = 'lexmin0412'

const UserIndex = (): JSX.Element => {
	const [userInfo, setUserInfo] = useState({})

	useEffect(() => {
		usersService
			.getUserInfo({
				userName: 'lexmin0412',
			})
			.then((res: any) => {
				setUserInfo(res.data)
			})
	}, [])

	const handleFuncClick = (
		field: 'public_repos' | 'following' | 'followers'
	) => {
		switch (field) {
			case 'public_repos':
				Router.navigateTo({
					url: `/user/repos`,
					query: {
						userName,
						type: 'repos',
					},
				})
				break
			case 'followers':
				Router.navigateTo({
					url: `/follow/index`,
					query: {
						userName,
						type: 'followers',
					},
				})
				break
			case 'following':
				Router.navigateTo({
					url: `/follow/index`,
					query: {
						userName,
						type: 'following',
					},
				})
				break
			default:
				toast.info('非法类型～')
				break
		}
	}

	return (
		<View className='user-index-page'>
			<Sticky>
				<Navbar title={userInfo.login} />
			</Sticky>
			<Avatar src={userInfo.avatar_url} size='large' className='user-avatar' />
			{fileds.map(item => {
				return (
					<Cell
						title={item.title}
						key={item.field}
						onClick={() => handleFuncClick(item.field)}
					>
						{userInfo[item.field]}
					</Cell>
				)
			})}
		</View>
	)
}

export default UserIndex
