"use client"

import Script from "next/script"
import { useEffect, useRef, useState } from "react"

interface KakaoMapProps {
  address: string
}

export default function KakaoMap({ address }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") return

    const kakao = (window as any).kakao

    kakao.maps.load(() => {
      const container = mapRef.current
      if (!container) return

      const map = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 3,
      })

      const geocoder = new window.kakao.maps.services.Geocoder()

      geocoder.addressSearch(address, (result: any, status: string) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(+result[0].y, +result[0].x)
          new window.kakao.maps.Marker({
            map,
            position: coords,
          })
          map.setCenter(coords)
        } else {
          console.warn("주소 검색 실패", result)
        }
      })
    })
  }, [isLoaded, address])

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false&libraries=services`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log("✅ Kakao SDK script loaded")
          setIsLoaded(true)
        }}
      />
      <div ref={mapRef} className="mt-4 w-full h-[250px] bg-gray-100 rounded-lg" />
    </>
  )
}
