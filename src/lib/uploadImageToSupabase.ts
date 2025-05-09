import { supabase } from "@/lib/supabase-client"
import type { UploadedImage } from "@/components/image-upload"

export const uploadImagesToSupabase = async (
  images: UploadedImage[],
  userId?: string
): Promise<string[]> => {
  const uploadedImageUrls: string[] = []
  const tempUserId = userId || `temp-${Date.now()}`

  for (const image of images) {
    const fileExt = image.name.split(".").pop()
    const filePath = `${tempUserId}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from("subdivision-images")
      .upload(filePath, image)

    if (uploadError) {
      console.error("이미지 업로드 실패:", uploadError.message)
      throw uploadError
    }

    const { data } = supabase.storage
      .from("subdivision-images")
      .getPublicUrl(filePath)

    if (!data?.publicUrl) {
      throw new Error("퍼블릭 URL을 가져올 수 없습니다.")
    }

    uploadedImageUrls.push(data.publicUrl)
  }

  return uploadedImageUrls
}