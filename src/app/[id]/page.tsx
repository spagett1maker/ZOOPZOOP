import { Metadata } from "next"
import { createClient } from '@supabase/supabase-js'
import { Subdivision } from '@/types/type'
//import dynamic from 'next/dynamic'
import HouseClient from './HouseClient'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const { data: subdivision } = await supabase
    .from('subdivisions')
    .select('*')
    .eq('id', id)
    .single()

  const region = subdivision?.area || '권역'
  const titleName = subdivision?.title || '사업명'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoopzoop.homes'
  const pageUrl = `${baseUrl}/${id}`
  const image = subdivision?.images?.[0] ? `${baseUrl}${subdivision.images[0]}` : `${baseUrl}/og-default.png`

  const title = `${region} ${titleName}, 분양가, 규제정보, 주변정보 | 아파트 청약은 줍줍`
  const description = `'${region} ${titleName}'의 기본정보와 아파트 분양가, 분양권 , 규제정보 , 전매제한여부 , 실거주의무 , 규제지역 여부 ,  분양가 상한제 , 즉시입주 아파트 , 입주예정일 , 주변 교통, 학교/학군, 병원/편의시설/어린이집/유치원, 상권 정보를 보여드립니다.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: 'article',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${region} ${titleName} 대표 이미지`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

//const HouseClient = dynamic(() => import('@/app/[id]/HouseClient'), { ssr: false })

export default async function HousePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data: subdivision, error } = await supabase
    .from('subdivisions')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching subdivision:', error)
    return <div>Error loading subdivision</div>
  }

  return <HouseClient subdivision={subdivision as Subdivision} />
}