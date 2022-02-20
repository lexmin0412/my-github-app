/**
 * 项目详情
 */

import { useRouter } from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { View, Image } from '@tarojs/components'
import ReposService from '@/services/github/repos.service'
import { Navbar } from '@taroify/core'
import { EyeOutlined, StarOutlined, ClusterOutlined } from '@taroify/icons'
import Router from '@/utils/route'

import './detail.scss'

const iconDataGroup = [
	{
		field: 'watchers_count',
		icon: <EyeOutlined />,
	},
	{
		field: 'stargazers_count',
		icon: <StarOutlined />,
	},
	{
		field: 'forks_count',
		icon: <ClusterOutlined />,
	},
]

const Detail = (): JSX.Element => {
	const { params } = useRouter() as any
	const [repoInfo, setRepoInfo] = useState<any>({
		owner: {},
	})
	console.log('params', params)

	useEffect(() => {
		// 获取项目基本信息
		ReposService.getRepoInfo({
			userName: params.owner,
			repoName: params.name,
		}).then((res: any) => {
			console.log('res', res)
			setRepoInfo(res.data)
		})

		// 获取项目的readme
		ReposService.getRepoInfoByType({
			userName: params.owner,
			repoName: params.name,
			infoType: 'readme',
		})
	}, [])

	const handleOwnerClick = () => {
		Router.navigateTo({
			url: `/user/detail?userName=${repoInfo.owner.login}`,
		})
	}

	return (
		<View className='repo-detail-page'>
			<Navbar title={repoInfo.name} />
			<View className='repo-desc'>{repoInfo.description}</View>
			<View className='icon-data-group'>
				{iconDataGroup.map((item: any) => {
					return (
						<View className='icon-data-item' key={item.field}>
							{item.icon}
							<View className='icon-data-text'>{repoInfo[item.field]}</View>
						</View>
					)
				})}
			</View>
			<View className='owner'>
				<View className='owner-title'>拥有者</View>
				<View className='owner-info' onClick={handleOwnerClick}>
					<Image className='owner-avatar' src={repoInfo.owner.avatar_url} />
					<View className='owner-info-right'>
						<View className='owner-info-name'>{repoInfo.owner.login}</View>
						<View className='repo-created-time'>{repoInfo.created_at}</View>
					</View>
				</View>
			</View>
		</View>
	)
}

export default Detail
