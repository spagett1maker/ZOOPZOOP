import Image from "next/image"

export default function CollaboSection() {
  // Array of collaboration logos with their details
  const collaborators = [
    { src: "/collabor/1.png", alt: "Kakao", width: 120, height: 40 },
    { src: "/collabor/2.png", alt: "KB 국민은행", width: 220, height: 40 },
    { src: "/collabor/3.png", alt: "KB 증권", width: 220, height: 40 },
    { src: "/collabor/4.png", alt: "KT", width: 220, height: 40 },
    { src: "/collabor/5.png", alt: "신한카드", width: 220, height: 40 },
    { src: "/collabor/6.png", alt: "삼성제", width: 120, height: 40 },
  ]

  return (
    <section className="pt-8 pb-16 px-4 sm:px-0 max-w-7xl mx-auto">
      {/* Logos Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
        {collaborators.map((logo, index) => (
          <div key={index} className="flex justify-center items-center p-2 sm:p-4">
            <Image
              src={logo.src || "/placeholder.svg"}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
