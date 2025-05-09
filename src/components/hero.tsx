import Image from "next/image"

export default function HeroSection() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-4 pt-32 pb-12 flex flex-col items-center">
      {/* Badge */}
      <div className="mb-6">
        <span className="inline-block px-4 py-1 rounded-full bg-[var(--zoop-gray)]/30 text-[var(--zoop-blue)] border border-[var(--zoop-gray)]/50 text-sm font-medium">
          ZOOP ZOOP | 아파트 청약정보는 줍줍
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-3xl sm:text-5xl leading-snug font-bold text-center mb-12 max-w-4xl">
        내 집 마련,
        <br className="" />
        이젠 꿈이 아닌
        <br className="block sm:hidden" />
        <span className="text-[var(--zoop-blue)]"> 현실</span>입니다.
      </h1>

      {/* Image */}
      <div className="w-full max-w-5xl">
        <div className="rounded-3xl overflow-hidden">
          <Image
            src="/hero.jpg"
            alt="Modern wooden and brick house"
            width={1200}
            height={700}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </div>
    </div>
  )
}
