"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

type FAQItem = {
  id: string
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    id: "item-1",
    question: "Q1. 줍줍은 어떤 서비스 인가요?",
    answer:
      "‘줍줍’은 보기 어려운 청약 공고문과 사용성이 낮은 LH 청약홈 웹사이트의 단점을 보완한 서비스 입니다. 줍줍은 웹사이트의 사용성을 높이고 어려운 청약 정보를 핵심 체크리스트로 정리해 청약시 유의해야할 점을 한번에 알 수 있습니다. ",
  },
  {
    id: "item-2",
    question: "Q2. 줍줍의 관심 고객 등록하면 어떤점이 좋은가요?",
    answer:
      "관심있는 아파트의 청약 일정을 문자로 알려드립니다! 뿐만 아니라 관심 지역을 등록해 주시면 관심 지역의 아파트 청약 정보를 전송해 드립니다. ",
  },
  {
    id: "item-3",
    question: "Q3. 부적격 청약시 어떤 불이익이 발생하나요? ",
    answer:
      "청약 신청 자격을 꼼꼼히 따져보고 청약을 진행하셔야 합니다. 부적격 청약으로 적발될시 적게는 1년에서 길게는 10년까지 청약 신청을 할 수 없을 수 있기에 유의 하셔야 합니다. 줍줍은 이를 방지하기 위한 AI 서비스를 개발중에 있습니다. ",
  },
]

export default function FAQSection() {
  const [openItem, setOpenItem] = useState<string | null>(null)

  const toggleItem = (itemId: string) => {
    setOpenItem(openItem === itemId ? null : itemId)
  }

  return (
    <section className="py-16 pb-24 sm:py-24 px-6 sm:px-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col justify-center items-center">
          {/* Left column */}
          <div className="mb-8 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              <span className="text-black">FAQ</span>
            </h2>
          </div>

          {/* Right column */}
          <div className="max-w-5xl">
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.id} className="rounded-2xl bg-gray-50 overflow-hidden">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full py-5 px-6 flex items-center justify-between text-left text-base sm:text-lg font-medium"
                    aria-expanded={openItem === item.id}
                    aria-controls={`content-${item.id}`}
                  >
                    <span>{item.question}</span>
                    <Plus
                      className={`h-5 w-5 shrink-0 transition-transform duration-500 ease-in-out ${
                        openItem === item.id ? "rotate-45" : ""
                      }`}
                    />
                  </button>

                  <div
                    id={`content-${item.id}`}
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openItem === item.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                    aria-hidden={openItem !== item.id}
                  >
                    <div className="px-6 pb-5 text-gray-600">{item.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

