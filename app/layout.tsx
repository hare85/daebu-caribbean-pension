import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '대부도 캐리비안펜션 - 가족과 함께하는 특별한 휴식',
  description: '노래방, PC룸, 수영장, 바베큐장을 갖춘 프리미엄 펜션입니다.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <script
          type="text/javascript"
          src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=zwgf1tzman"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  )
}