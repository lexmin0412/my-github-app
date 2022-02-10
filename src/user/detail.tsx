/**
 * 用户详情
 */
import { useRouter } from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { View, Image } from '@tarojs/components'
import { Navbar } from '@taroify/core'
import dayjs from 'dayjs'

import usersService from '@/services/github/users.service'

import './detail.scss'

const statsList = [
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

const baseInfoList = [
	{
		title: '公司',
		field: 'company'
	},
	{
		title: '邮箱',
		field: 'email'
	},
	{
		title: '位置',
		field: 'location'
	},
	{
		title: '博客',
		field: 'blog'
	},
	{
		title: '加入时间',
		field: 'created_at',
		transformRule: (value: string) => dayjs(value).format('YYYY-MM-DD')
	}
]

const Detail = (): JSX.Element => {

	const {params} = useRouter()
	const [userInfo, setUserInfo] = useState({})

	useEffect(() => {
		if ( !params.userName ) {
			return
		}
		usersService.getUserInfo({
			userName: params.userName
		}).then((res: any)=>{
			console.log('结果', res);
			setUserInfo(res.data)
		})
	}, [])

	return (
		<View className='user-detail-page'>
			<Navbar title="用户详情" />
			<View className="user-info">
				<View className="user-info-top">
					<View className="user-avatar-box">
						<Image className='user-avatar' src={userInfo.avatar_url} />
					</View>
					<View className="user-name">
						{userInfo.login}
					</View>
					<View className="user-bio">
						{userInfo.bio}
					</View>
				</View>
				<View className="user-stats">
					{
						statsList.map((item)=>{
							return (
								<View className="user-stats-item"
									key={item.field}
								>
									<View className="user-stats-item-count">
										{userInfo[item.field]}
									</View>
									<View className="user-stats-item-title">
										{item.title}
									</View>
								</View>
							)
						})
					}
				</View>
				<View className="user-base-info">
					{
						baseInfoList.map((item)=>{
							return (
								<View className="user-base-info-item"
									key={item.field}
								>
									<View className="user-base-info-item-title">
										{item.title}
									</View>
									<View className="user-base-info-item-value">
										{
											item.transformRule ?
												item.transformRule(userInfo[item.field])
												:
											userInfo[item.field]
										}
									</View>
								</View>
							)
						})
					}
				</View>
			</View>
		</View>
	)
}

export default Detail
