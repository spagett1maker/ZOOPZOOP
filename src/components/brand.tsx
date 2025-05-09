import { ChevronRight } from "lucide-react"

export default function BrandAboutSection() {
  return (
    <div className="bg-[var(--zoop-gray)]/20">
    <div className="relative min-h-max max-w-7xl mx-auto px-6 sm:px-0">
      <div className="container mx-auto pt-20 pb-12 sm:pb-24 relative z-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-16">
          {/* Left column with OUR STORY heading */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24 mb-6 lg:mb-0">
              <div className="mb-4 lg:mb-6">
                <span className="inline-block px-4 py-2 rounded-full bg-[var(--zoop-gray)]/30 text-[var(--zoop-blue)] font-semibold text-sm border border-[var(--zoop-blue)]/30">
                  OUR STORY
                </span>
              </div>
            </div>
          </div>

          {/* Right column with main content */}
          <div className="lg:col-span-10">
            {/* Main heading with gradient */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-5 leading-tight">
              <span className="bg-gradient-to-r from-[var(--zoop-blue)] to-[var(--zoop-blue-light)] bg-clip-text text-transparent">
                오늘의 준비가 내일의 집이 됩니다.
              </span>
            </h1>

            {/* Subheading with styled quotes - now horizontal */}
            <div className="flex flex-wrap items-center mb-8 sm:mb-12">
              <span className="text-[var(--zoop-blue)] text-2xl sm:text-3xl font-serif">{'"'}</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-medium px-2">줍줍</h2>
              <span className="text-[var(--zoop-blue)] text-2xl sm:text-3xl font-serif">{'"'}</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-medium px-2">과 함께라면</h2>
            </div>

            {/* Main description with improved typography */}
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800 mb-8 sm:mb-12">
              지금까지 힘겹게 달려온 어른이를 위한 안전한 집 .
            </p>

            {/* Content paragraphs with better spacing and readability */}
            <div className=" text-gray-600 tracking-tight leading-[1.8] sm:leading-[2.5] text-sm sm:text-base">
              물가 상승, 대출 규제 강화, 건축비 상승으로 인한 분양가 상승 등 개별 소비자들은 내 집 마련이 어려워 지고 있습니다.
              <br className="hidden sm:block"/>
              뿐만 아니라 전세 사기, 어려운 청약 제도, 시시각각 변하는 부동산 정책과 금융 정책 등 부동산 시장은 소비자들의 신뢰를 잃어가고 있습니다.
              <br className="hidden sm:block"/>
              그러나 집은 우리 모두에게 필요한 자산입니다.
              <br className="hidden sm:block"/>
              줍줍의 서비스는 “험난한 부동산 시장의 등대”가 되고자합니다. 시시각각 변화하는 제도를 지속적으로 반영해 맞춤 분석을 제공합니다.
              <br className="hidden sm:block"/>
              이를 통해 개별 소비자들이 부동산 시장에서 경쟁력을 극대화하고 위험을 회피할 수 있도록 도움을 드리고자 노력하고 있습니다. 
            </div>

            {/* Call to action section */}
            <div
              className="mt-10 sm:mt-16 p-6 sm:p-8 rounded-xl sm:rounded-2xl"
              style={{
                background: "linear-gradient(145deg, rgb(240, 248, 255),rgb(205, 218, 230))",
                boxShadow:
                  "10px 10px 30px rgba(0,0,0,0.05), -5px -5px 30px rgba(255,255,255,0.8), inset 2px 2px 5px rgba(255,255,255,0.5)",
              }}
            >
              <h3
                className="text-lg sm:text-xl font-medium text-gray-800 mb-3 sm:mb-4"
                style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.05)" }}
              >
                우리 역시 마찬가지 아닐까요?
              </h3>
              <p className="text-gray-600 text-sm sm:text-lg mb-5 sm:mb-6">
                어렵고 힘들지만 어른이 된다는 건 그런 거니까요, 어른이 되느라 고생한 당신의 정착과 독립을 응원합니다!
              </p>
              <button
                className="flex items-center text-[var(--zoop-blue)] font-medium hover:text-[var(--zoop-blue-light)] transition-colors cursor-pointer"
                style={{
                  textShadow: "0 1px 2px rgba(249, 115, 22, 0.2)",
                }}
              >
                원하는 청약 알림받기
                <ChevronRight
                  className="w-4 h-4 ml-1"
                  style={{ filter: "drop-shadow(1px 1px 1px rgba(249, 115, 22, 0.3))" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
