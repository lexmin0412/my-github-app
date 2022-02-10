/**
 * 个人中心页面
 */

import React, { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { Navbar, Cell, Avatar } from '@taroify/core'

import usersService from '@/services/github/users.service'

import './index.scss'

const fileds = [
	{
		title: '项目',
		field: 'public_repos'
	},
	{
		title: '关注',
		field: 'following'
	},
	{
		title: '粉丝',
		field: 'followers'
	}
]

const UserIndex = (): JSX.Element => {

	const [userInfo, setUserInfo] = useState({})

	useEffect(() => {
		usersService.getUserInfo({
			userName: 'lexmin0412'
		}).then((res: any) => {
			setUserInfo(res.data)
		})
	}, [])

	return (
		<View className='user-index-page'>
			<Navbar title={userInfo.login} />
			<Avatar src={userInfo.avatar_url}
				size="large"
				className='user-avatar'
			/>
			{
				fileds.map((item)=>{
					return (
						<Cell title={item.title}
							key={item.field}
						>
							{userInfo[item.field]}
						</Cell>
					)
				})
			}
		</View>
	)
}

export default UserIndex
