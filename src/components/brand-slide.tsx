"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    image: "/brand1.png",
    title: "누구나 실수하기 마련이지만 ,",
    subtitle: "집은 그렇지 않으니까.",
  },
  {
    id: 2,
    image: "/brand2.png",
    title: "당신의 공간에 ,",
    subtitle: "가치를 더하세요.",
  },
  {
    id: 3,
    image: "/brand3.png",
    title: "편안함과 스타일 ,",
    subtitle: "모두를 만족시키는 공간.",
  },
]

export function BrandSlide () {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[700px] overflow-hidden">
      <div
        className="flex transition-transform duration-1200 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full relative">
            <Image
              src={slide.image || "/placeholder.svg"}
              alt="Interior design"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
              <h2 className="text-2xl font-light mb-2">{slide.title}</h2>
              <p className="text-2xl">
                <span className="text-[#FF6B00] font-medium">{slide.subtitle}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 rounded-full p-2 text-white"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 rounded-full p-2 text-white"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )

}