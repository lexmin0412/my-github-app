/**
 * 关注
 */

import { useRouter } from '@tarojs/taro'
import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { Avatar, Navbar } from '@taroify/core'
import Router from '@/utils/route'

import './index.scss'
import usersService from '@/services/github/users.service'

const Index = (): JSX.Element => {

	const {params: { type, userName }} = useRouter() as any

	const [following, setFollowing] = useState([])

	useEffect(() => {
		usersService.getUserDataByType({
			userName,
			type
		}).then((res: any)=>{
			console.log('res', res)
			setFollowing(res.data)
		})
	}, [])

	const handleUserItemClick = (userName: string) => {
		Router.navigateTo({
			url: `/user/detail?userName=${userName}`
		})
	}

	return (
		<View className='follow-index-page'>
			<Navbar title={type === 'following' ? "关注" : '粉丝'} />
			{
				following.map((item: any) => {
					return (
						<View className="following-item"
							key={item.id}
							onClick={()=>handleUserItemClick(item.login)}
						>
							<Avatar className='following-item-avatar' size='small' src={item.avatar_url} />
							<div className='following-item-name'>{item.login}</div>
						</View>
					)
				})
			}
		</View>
	)
}

export default Index
