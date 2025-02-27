'use client'

import { FC } from 'react'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'

const ProfileAvatar: FC = () => {
  const { avatar } = useAuth()
  return (
    <Image
      src={avatar ?? '/img/user-big.svg'}
      priority={true}
      width={120}
      height={120}
      alt="user image"
    />
  )
}

export default ProfileAvatar
