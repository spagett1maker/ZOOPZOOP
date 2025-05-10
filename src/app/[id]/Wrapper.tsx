// app/[id]/HouseClientWrapper.tsx
'use client'

import dynamic from 'next/dynamic'
import { Subdivision } from '@/types/type'

// ssr: false가 필요한 이유가 있다면 여기에만 작성
const HouseClient = dynamic(() => import('./HouseClient'), { ssr: false })

export default function HouseClientWrapper({ subdivision }: { subdivision: Subdivision }) {
  return <HouseClient subdivision={subdivision} />
}
