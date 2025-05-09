import { useEffect } from "react"
import { getChannelBootOption } from "@/lib/channel"

export function useChannelService(
  isLoaded: boolean,
  user?: { id: string; name?: string; email?: string }
) {
  useEffect(() => {
    if (!isLoaded || typeof window === "undefined" || !window.ChannelIO) return

    window.ChannelIO("boot", getChannelBootOption(user))

    return () => {
      window.ChannelIO?.("shutdown")
    }
  }, [isLoaded, user])
}
