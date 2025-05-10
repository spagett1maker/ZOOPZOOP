import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 분양 데이터 등에서 동적으로 URL 생성
  // 예시: supabase에서 id 목록 가져오기
  // 실제 fetch 로직은 프로젝트 상황에 맞게 작성
  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/subdivisions`, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    },
  })
  const subdivisions = await res.json()

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoopzoop.homes'

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    ...subdivisions.map((item: { id: string }) => ({
      url: `${baseUrl}/${item.id}`,
      lastModified: new Date(),
    })),
  ]
}