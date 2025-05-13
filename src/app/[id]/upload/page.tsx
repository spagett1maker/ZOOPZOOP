"use client"

import ImageUpload from "@/components/image-upload"
import type { UploadedImage } from "@/components/image-upload"
import { uploadImagesToSupabase } from "@/lib/uploadImageToSupabase"
import { useState } from 'react'
import { supabase } from "@/lib/supabase-client"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"


export default function PropertyImageUploadPageClient() {

  const { id } = useParams()
  const [images, setImages] = useState<UploadedImage[]>([])
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (images.length < 3) {
      alert("최소 3장의 사진을 업로드해주세요.")
      return
    }

    setSubmitting(true)

    try {
      const imageUrls = await uploadImagesToSupabase(images)
      
      const { data: subdivision, error: fetchError } = await supabase
        .from('subdivisions')
        .select('images')
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError

      const prevImages: string[] = subdivision?.images || []
      const newImages = [...prevImages, ...imageUrls]

      const { error: updateError } = await supabase
        .from('subdivisions')
        .update({ images: newImages })
        .eq('id', id)

      if (updateError) throw updateError

      alert("사진이 성공적으로 등록되었습니다!")
      router.push(`/${id}`)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("사진 등록 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="max-w-lg mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">매물 사진 업로드</h1>
      <form onSubmit={handleSubmit} className="space-y-8">

      <section className="rounded-lg bg-white py-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">사진 업로드</h2>
        <div className="space-y-6">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              매물 사진 (최소 3장) <span className="text-red-500">*</span>
            </label>
            <ImageUpload
              images={images}
              setImages={setImages}
              maxFiles={10}
              label="사진을 여기에 끌어다 놓거나 클릭하여 업로드하세요"
            />
            {images.length > 0 && (
              <p className="mt-2 text-sm text-gray-500">
                {images.length}장의 사진이 업로드되었습니다 (최소 3장 필요)
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {submitting ? "등록 중..." : "등록하기"}
        </button>
      </div>
      </form>
    </main>
  )
}
