import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

import { Button } from '@/components/ui'

const ButtonSocialYandex: FC = () => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_YANDEX_AUTH}`

  /*
    так как нет возможности изменить механизм работы бакэнда с этой авторизацией,
    проксирую логику работы здесь
  */
  //'https://oauth.yandex.com/authorize?client_id=b57308fc10884dc5ab8e5f39d728c99d&redirect_uri=http://127.0.0.1:8000/api/v1/complete/yandex-oauth2/&state=flXRuKzALNXYlPCah3D6FudVr7Wy4O4c&response_type=code'
  const url2 = `https://oauth.yandex.com/authorize?client_id=${process.env.NEXT_PUBLIC_YANDEX_KEY}&response_type=code`

  const onClick = async () => {
    console.log('click')

    const axiosInstance = axios.create()
    axiosInstance.defaults.maxRedirects = 1 // Set to 0 to prevent automatic redirects

    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        debugger
        if (error.response && [301, 302].includes(error.response.status)) {
          const redirectUrl = error.response.headers.location
          return axiosInstance.get(redirectUrl)
        }
        return Promise.reject(error)
      },
    )

    // 1. запрашиваем URL с параментами с бакэнда
    const loginUrl = await axiosInstance.get(url, {
      withCredentials: false,
    })
  }

  return (
    <>
      {/* <Button color="clear" onClick={onClick}>
        <Image src="/img/ya.svg" width={38} height={38} alt="yandex" />
      </Button> */}
      <Link href={url}>
        <Image src="/img/ya.svg" width={38} height={38} alt="yandex" />
      </Link>
    </>
  )
}

export default ButtonSocialYandex
