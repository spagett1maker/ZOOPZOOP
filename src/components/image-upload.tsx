"use client"

import { useState, useCallback, Dispatch, SetStateAction } from "react"
import { useDropzone, type FileRejection } from "react-dropzone"

export type UploadedImage = File & {
  preview: string
}

type ImageUploadProps = {
  images: UploadedImage[]
  setImages: Dispatch<SetStateAction<UploadedImage[]>>
  maxFiles?: number
  label?: string
}

export default function ImageUpload({ images, setImages, maxFiles = 10, label = "Upload images" }: ImageUploadProps) {
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles?.length) {
        const newImages = acceptedFiles.map(
          (file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }) as UploadedImage,
        )

        if (maxFiles === 1) {
          setImages(newImages)
        } else {
          setImages((prevImages: UploadedImage[]) => {
            const combinedImages = [...prevImages, ...newImages]
            return combinedImages.slice(0, maxFiles)
          })
        }
      }

      if (rejectedFiles?.length) {
        setRejectedFiles(rejectedFiles)
        setTimeout(() => {
          setRejectedFiles([])
        }, 5000)
      }
    },
    [maxFiles, setImages],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: maxFiles,
    maxSize: 30 * 1024 * 1024, // 5MB
  })

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
          isDragActive ? "border-sky-500 bg-sky-50" : "border-gray-300 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        <svg
          className="mb-2 h-10 w-10 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          ></path>
        </svg>
        <p className="mb-1 text-sm text-gray-500">{label}</p>
        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
      </div>

      {rejectedFiles.length > 0 && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                {rejectedFiles.length} {rejectedFiles.length === 1 ? "file" : "files"} could not be uploaded
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc space-y-1 pl-5">
                  {rejectedFiles.map((file, index) => (
                    <li key={index}>
                      {file.file.name} ({(file.file.size / 1024 / 1024).toFixed(2)}MB) -{" "}
                      {file.errors[0]?.code === "file-too-large" ? "File is too large" : file.errors[0]?.message}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {images.map((file, index) => (
            <div key={index} className="relative rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
              <img
                src={file.preview || "/placeholder.svg"}
                alt={`Preview ${index}`}
                className="h-32 w-full rounded object-cover"
                onLoad={() => {
                  URL.revokeObjectURL(file.preview)
                }}
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-sm hover:bg-red-600 focus:outline-none"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <p className="mt-1 truncate text-xs text-gray-500">{file.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
