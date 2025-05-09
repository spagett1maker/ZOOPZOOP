
"use client"

import { useEffect } from "react"
import { getChannelBootOption } from "@/lib/channel"

interface ChannelUser {
  id: string
  name?: string
  email?: string
  phoneNumber?: string
}

interface ChannelServiceProps {
  user?: ChannelUser
}

// Replace the ChannelIOType interface and global declaration with:

// Extend the base function type that's already declared elsewhere
type ChannelIOType = ((...args: any[]) => void) & {
  q?: any[]
  c?: (args: any) => void
}

// Extend Window interface without redeclaring ChannelIO
declare global {
  interface Window {
    ChannelIOInitialized?: boolean
  }
}

export default function ChannelService({ user }: ChannelServiceProps) {
  useEffect(() => {
    if (typeof window === "undefined") return
    const w = window as Window & typeof globalThis

    // 중복 초기화 방지
    if (w.ChannelIO) {
      w.ChannelIO("shutdown")
      delete w.ChannelIO
    }

    // ChannelIO 초기 정의
    const ch: ChannelIOType = (...args: any[]) => {
      if (ch.c) {
        ch.c(args)
      }
    }
    ch.q = []
    ch.c = (args: any) => {
      if (ch.q) {
        ch.q.push(args)
      }
    }

    w.ChannelIO = ch

    // SDK 로드
    const loadScript = () => {
      if (w.ChannelIOInitialized) return
      w.ChannelIOInitialized = true

      const s = document.createElement("script")
      s.type = "text/javascript"
      s.async = true
      s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js"
      const x = document.getElementsByTagName("script")[0]
      if (x?.parentNode) {
        x.parentNode.insertBefore(s, x)
      }
    }

    if (document.readyState === "complete") {
      loadScript()
    } else {
      window.addEventListener("DOMContentLoaded", loadScript)
      window.addEventListener("load", loadScript)
    }

    // 부트 실행
    w.ChannelIO("boot", getChannelBootOption(user))

    return () => {
      if (w.ChannelIO) {
        w.ChannelIO("shutdown")
      }
    }
  }, [user])

  return null
}
