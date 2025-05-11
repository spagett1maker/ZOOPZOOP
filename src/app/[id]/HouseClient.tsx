"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronRight, CircleCheck } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MapWithMarker from "@/components/map-with-marker"
import Link from "next/link"
import { Subdivision } from "@/types/type"
import { formatPrice } from "@/lib/utils"

interface HouseClientProps {
  subdivision: Subdivision | null
}

export default function HouseClient({ subdivision }: HouseClientProps) {
  const [imageIndex, setImageIndex] = useState(0)
  const images = subdivision?.images || ["/house1.png", "/house2.png", "/house3.png"]

  if (!subdivision) {
    return (
      <>
        <Header />
        <div className="h-16"></div>
        <div className="max-w-7xl mx-auto px-4 py-6 mb-12 font-sans">
          <div className="flex justify-center items-center h-[500px]">
            <p className="text-gray-500">매물 정보를 찾을 수 없습니다.</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="h-16"></div>
      <div className="max-w-7xl mx-auto px-4 py-6 mb-12 font-sans">
        {/* Breadcrumb */}
        <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-4">
          <span>홈</span>
          <ChevronRight className="w-3 h-3 mx-1" />
          <span>부동산</span>
          <ChevronRight className="w-3 h-3 mx-1" />
          <span className="text-gray-700">{subdivision.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column - Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative h-[300px] sm:h-[500px] bg-gray-100 rounded-lg overflow-hidden">
              <Image src={images[imageIndex] || "/placeholder.svg"} alt="Property image" fill className="object-fit" />
              <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 hover:bg-white/70 hover:scale-105 transition-transform duration-200 rounded-full p-1 cursor-pointer"
                onClick={() => setImageIndex((prev) => (prev + 1) % images.length)}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 flex items-center">
              <div className="px-2 flex items-center justify-between w-full">
                <div className="font-medium">{subdivision.title}</div>
                <div className="text-sm sm:text-sm text-gray-500">{subdivision.address}</div>
              </div>
            </div>

            {/* Safety Check Section */}
            <div className="mt-4 border-t border-gray-200 pt-4 pb-6 sm:pb-0">
              <h2 className="text-lg font-bold mb-2">필수 체크리스트</h2>
              <p className="text-sm text-gray-600 mb-4">분양 시 꼭 확인해야하는 요소들을 모아놨어요</p>

              <div className="bg-[#BAD6EB]/30 p-4 rounded-lg mb-6 flex items-center">
                <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2">
                  <span className="text-[var(--zoop-blue)]"><CircleCheck className="w-4 h-4" /></span>
                </div>
                <div>
                  <p className="font-medium text-sm text-[var(--zoop-blue)]">아파트 분양 시 아래 항목들을 꼭 확인하세요!</p>
                </div>
              </div>

              <div className="space-y-0">
                <div className="flex justify-between items-center py-2 border-gray-100">
                  <div className="font-medium">전매 제한 여부</div>
                  {subdivision.risk?.["전매제한 여부"] ? (
                    <button className="bg-red-50 text-red-400  text-xs px-3 py-1 rounded-full">전매 제한 되어있어요 ({subdivision.risk["전매제한 기간"]})</button>
                  ) : (
                    <button className="bg-green-50/ text-green-700/ bg-[var(--zoop-gray)] text-[var(--zoop-blue)] text-xs px-3 py-1 rounded-full">전매 가능해요</button>
                  )}
                </div>

                <div className="flex justify-between items-center py-2 ">
                  <p className="text-sm text-gray-600 mb-4">
                    분양받은 주택이나 분양권을 일정 기간 동안 다른 사람에게 매매하거나 양도하지 못하도록 하는 것을 말해요.
                  </p>
                </div>

                <div className="flex justify-between items-center py-2 border-gray-100">
                  <div className="font-medium">실거주 의무 여부</div>
                  {subdivision.risk?.["실거주 의무 여부"] ? (
                    <button className="bg-red-50 text-red-400 text-xs px-3 py-1 rounded-full">실거주 의무 있어요 ({subdivision.risk["실거주 의무 기간"]})</button>
                  ) : (
                    <button className="bg-[var(--zoop-blue-light)]/10 text-[var(--zoop-blue)] text-xs px-3 py-1 rounded-full">실거주 의무 없어요</button>
                  )}
                </div>

                <div className="flex justify-between items-center py-2 ">
                  <p className="text-sm text-gray-600 mb-4">
                    분양가 상한제를 적용받은 아파트 분양계약자가 입주 후 일정 기간 동안 해당 아파트에 거주하도록 하는 것을 말해요.
                  </p>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div className="font-medium">계약금 비율</div>
                  <button className=" text-sm px-3 py-1 rounded-full">{subdivision.risk?.["계약금 비율"]}%</button>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div className="font-medium">착공일</div>
                  <button className=" text-sm px-3 py-1 rounded-full">{subdivision.risk?.["착공일"]}</button>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div className="font-medium">학군</div>
                  <button className=" text-sm px-3 py-1 rounded-full">{subdivision.risk?.["학군"]}</button>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div className="font-medium">단지 내 커뮤니티 시설</div>
                  <button className=" text-sm px-3 py-1 rounded-full">{subdivision.communityes?.join(", ")}</button>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div className="font-medium">편의시설</div>
                  <button className=" text-sm px-3 py-1 rounded-full">{subdivision.amenities?.join(", ")}</button>
                </div>
              </div>

              <div className="w-full mx-auto pt-6">
                <h2 className="text-xl font-bold text-[var(--zoop-blue)] mb-4">분양가</h2>

                <div className=" overflow-hidden">
                  <table className="w-full border-collapse text-base">
                    <thead>
                      <tr className="bg-[var(--zoop-gray)]/30">
                        <th className="text-left px-6 py-2 font-medium text-gray-700 border-b border-gray-100">공급/전용(㎡)</th>
                        <th className="text-left px-6 py-2 font-medium text-gray-700 border-b border-gray-100">분양가</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subdivision.size?.map((property, index) => (
                        <tr key={index} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-3 text-gray-700">{property.type}</td>
                          <td className="px-6 py-3 text-gray-700">{formatPrice(property.price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="text-right text-sm text-gray-500 mt-2">※ 위 분양가는 타입별 최고가 기준입니다.</div>
              </div>
            </div>
          </div>

          {/* Right column - Details */}
          <div className="lg:w-1/2">
            <div className="text-sm text-gray-500 mb-1">{subdivision.property_type}</div>

            <div className="mb-2">
              <h1 className="text-2xl font-bold">
                <span className="text-[var(--zoop-blue)] sm:pr-2">분양중</span> 
                <br className="block sm:hidden"/>
                {formatPrice(subdivision.price || 0)} ~ {formatPrice(subdivision.size?.[subdivision.size.length - 1]?.price || 0)}
              </h1>
            </div>

            <div className="border-gray-200 py-4">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">건축물 용도</td>
                    <td className="py-2 font-medium">{subdivision.property_type}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">전체 세대수</td>
                    <td className="py-2 font-medium">{subdivision.units_number}세대</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">지상 / 지하</td>
                    <td className="py-2 font-medium">{subdivision.up_floor}층 / {subdivision.down_floor}층</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">입주 예정일</td>
                    <td className="py-2 font-medium">{subdivision.move_in_date}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">청약 시작일</td>
                    <td className="py-2 font-medium">{subdivision.sales_start_date}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">분양가 상한 제한 여부</td>
                    <td className="py-2 font-medium">{subdivision.is_price_limit ? "해당 있음" : "해당 없음"}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">투기과열지구</td>
                    <td className="py-2 font-medium">{subdivision.is_hot_market ? "해당 있음" : "해당 없음"}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">조정 대상지역</td>
                    <td className="py-2 font-medium">{subdivision.is_adjustment_target ? "해당 있음" : "해당 없음"}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">정비사업 대상지역</td>
                    <td className="py-2 font-medium">{subdivision.is_maintenance_target ? "해당 있음" : "해당 없음"}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">공공주택지구</td>
                    <td className="py-2 font-medium">{subdivision.is_public_housing_target ? "공공주택지구" : "공공주택지구 아님"}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">수도권 내 민영 공동주택지구</td>
                    <td className="py-2 font-medium">{subdivision.is_private_public_housing_target ? "수도권 내 민영 공동주택지구" : "수도권 내 민영 공동주택지구 아님"}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">공공주택 특별법 적용 여부</td>
                    <td className="py-2 font-medium">{subdivision.is_public_housing_special_law ? "해당 있음" : "해당 없음"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-bold mb-2">상세 내용</h2>
              <p></p>
            </div>

            <div className="mt-2 text-xs text-gray-500">
              <p>관심 21 · 조회 923 · 채팅 3</p>
            </div>

            <MapWithMarker address={subdivision.address || ""} />

            <div className="mt-4 text-sm">
              <p>{subdivision.address}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-bold mb-4">시행/시공 정보</h2>
              <table className="w-full text-sm text-gray-500">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500 w-1/3">시행사</td>
                    <td className="py-2 font-medium">{subdivision.developer}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">시공사</td>
                    <td className="py-2 font-medium">{subdivision.constructor}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* <div className="flex gap-6">
              <Link href="https://walla.my/v/jmGi5KblaB0pekmTaJyr" className="w-full text-center bg-[var(--zoop-blue)] cursor-pointer hover:bg-[var(--zoop-blue-light)] text-white py-3 rounded-lg mt-6 font-medium">
                관심 고객 등록하기
              </Link>
              <button className="bg-none text-black py-2 rounded-lg mt-6 font-medium">
                <MessageCircle className="stroke-[1.5] w-6 h-6" />
              </button>
            </div> */}
            <div className="flex flex-col sm:flex-row gap-6/ sm:gap-3">
              <Link href={subdivision.open_chat || ""} className="text-sm sm:text-base w-full text-center bg-[var(--zoop-blue)] cursor-pointer hover:bg-[var(--zoop-blue-light)] text-white py-3 rounded-lg mt-6 font-medium">
                {subdivision.title} 채팅하기
              </Link>
              {/* <button className="bg-none text-black py-2 rounded-lg mt-6 font-medium">
                <MessageCircle className="stroke-[1.5] w-6 h-6" />
              </button> */}
              <Link href="https://walla.my/v/jmGi5KblaB0pekmTaJyr" className="text-sm sm:text-base w-full text-center bg-[var(--zoop-blue)]/ cursor-pointer hover:bg-[var(--zoop-blue-light)] text-[var(--zoop-blue)] hover:text-white border border-[var(--zoop-blue)] py-3 rounded-lg mt-2 sm:mt-6 font-medium transition-colors duration-300">
                관심 고객 등록하기
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 