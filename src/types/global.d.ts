export {}

declare global {
  namespace kakao.maps {
    function load(callback: () => void): void

    class LatLng {
      constructor(latitude: number, longitude: number)
    }

    interface MapOptions {
      center: LatLng
      level?: number
    }

    class Map {
      constructor(container: HTMLElement, options: MapOptions)
      setCenter(latlng: LatLng): void
    }

    interface MarkerOptions {
      map: Map
      position: LatLng
    }

    class Marker {
      constructor(options: MarkerOptions)
    }

    namespace services {
      type Status = "OK" | "ZERO_RESULT" | "ERROR"

      interface AddressResult {
        x: string
        y: string
      }

      type AddressSearchCallback = (
        result: AddressResult[],
        status: Status
      ) => void

      class Geocoder {
        addressSearch(address: string, callback: AddressSearchCallback): void
      }
    }
  }

  interface Window {
    // ✅ kakao 타입은 maps 속성을 가진 객체로 선언 + 확장 가능성 포함
    kakao: {
      maps: any
      [key: string]: any // 다른 속성들 (services, clusterer 등)도 허용
    }

    // ✅ channel.io 관련 선언도 같이 안전하게 병합
    ChannelIO?: ((...args: any[]) => void) & {
      q?: any[]
      c?: (args: any) => void
    }

    ChannelIOInitialized?: boolean
  }

  const kakao: {
    maps: typeof kakao.maps
  }
}

export {}

declare global {
  interface Window {
    ChannelIO?: (...args: any[]) => void
    ChannelIOInitialized?: boolean
  }
}
