import React from 'react'
import { Navbar, Sticky } from '@taroify/core'
import { isWechatH5 } from '@/utils/envs'

type NavHeaderProps = {
	title: string
}

export const NavHeader = (props: NavHeaderProps) => {
	const { title } = props

	const notInWechatWebview = !isWechatH5()

	return notInWechatWebview ? (
		<Sticky>
			<Navbar title={title} />
		</Sticky>
	) : null
}

export default NavHeader
