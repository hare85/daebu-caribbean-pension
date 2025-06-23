declare global {
  interface Window {
    naver: {
      maps: {
        Map: new (element: string | HTMLElement, options: any) => any
        Marker: new (options: any) => any
        InfoWindow: new (options: any) => any
        LatLng: new (lat: number, lng: number) => any
        Event: {
          addListener: (target: any, type: string, listener: () => void) => void
        }
        ZoomControlStyle: {
          SMALL: string
        }
        Position: {
          TOP_RIGHT: string
        }
      }
    }
  }
}

export {}