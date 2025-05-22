import { MetadataRoute } from 'next'

interface Subdivision {
  id: string
  updated_at?: string // subdivision 테이블에 수정일 컬럼이 있다면 반영
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoopzoop.homes'
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase 환경변수가 누락되었습니다.')
  }

  let subdivisions: Subdivision[] = []
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/subdivisions?select=id,updated_at`, {
      headers: {
        apikey: supabaseKey,
      },
      next: { revalidate: 60 * 60 }, // 1시간마다 캐싱 (선택)
    })
    if (!res.ok) throw new Error('Supabase fetch 실패')
    subdivisions = await res.json()
  } catch (error) {
    console.error('Sitemap 생성 중 오류 발생:', error)
    // 에러 발생 시 최소한 홈만 sitemap에 포함
    return [
      {
        url: `${baseUrl}/`,
        lastModified: new Date(),
      },
    ]
  }

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    ...subdivisions
      .filter((item) => !!item.id)
      .map((item) => ({
        url: `${baseUrl}/${item.id}`,
        lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
      })),
  ]
}