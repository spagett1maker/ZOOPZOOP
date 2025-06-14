"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, X, Filter, Search } from "lucide-react"
import { HouseCard } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

import { supabase } from '@/lib/supabase';
import { Subdivision } from '@/types/type';

export default function Home() {
  const [majorRegion, setMajorRegion] = useState("처음")
  const [subRegion, setSubRegion] = useState("")
  const [showAllSubRegions, setShowAllSubRegions] = useState(true)
  const [subdivisions, setSubdivisions] = useState<Subdivision[]>([]);
  const [loading, setLoading] = useState(true)
  
  const [error, setError] = useState<string | null>(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(9)

  const [searchQuery, setSearchQuery] = useState('');

  // Major regions in Korea
  const majorRegions = ["서울", "경기", "인천", "강원", "경상", "전라", "충청", "제주"]

  // Sub-regions mapped to major regions
  const subRegionsMap: Record<string, string[]> = {
    서울: [
      "강남/서초",
      "강동/송파",
      "동작/관악",
      "영등포/금천/구로",
      "강서/양천",
      "마포/서대문/은평",
      "종로/중구/용산",
      "성북/강북/도봉/노원",
      "동대문/성동/중랑/광진",
     
    ],
    경기:
    [
      "성남/분당/과천",
      "용인/수원/화성/동탄",
      "부천/광명/안양",
      "구리/하남",
      "김포/고양/일산",
      "평택/안성/오산",
      "시흥/안산/군포/의왕",
      "이천/여주",
      "광주/남양주/의정부",
      "양평/가평/포천/연천/동두천",
      "파주/양주",
     
    ],
    인천:
    [
      "연수/송도",
      "서구/검단",
      "부평/계양",
      "남동/미추홀", 
      "중구/동구/옹진",
      "강화/갑곶"
    ],

    강원: [
      "춘천",
      "속초/강릉",
      "동해/삼척/태백"
    ],

    충청: [
      "천안/아산",
      "대전/세종/공주",
      "청주/충주",
    ],

    경상: [
      "부산/창원/김해",
      "울산/양산/경주",
      "포항/영덕",
      "대구/경산",
    ],

    전라: [
      "광주",
      "전주",
      "순천/여수",
    ],

    제주: [
      "제주/애월",
      "서귀포",
    ],

  }

  // // Fetch properties when region changes
  // useEffect(() => {
  //   const fetchProperties = async () => {
  //     setLoading(true)
  //     try {
  //       const data = await propertyService.getProperties({
  //         region: majorRegion,
  //         district: showAllSubRegions ? undefined : subRegion,
  //       })
  //       setProperties(data)
  //     } catch (error) {
  //       console.error("Failed to fetch properties:", error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchProperties()
  // }, [majorRegion, subRegion, showAllSubRegions])

  useEffect(() => {
    async function fetchSubdivisions() {
      try {
        let query = supabase
          .from('subdivisions')
          .select('*')
          .order('created_at', { ascending: false });

        if (!showAllSubRegions) {
          query = query.eq('address_category', subRegion);
        }
        if (majorRegion !== "처음") {
          query = query.eq('area', majorRegion);
        }

        // if (!showAllSubRegions && subRegion) {
        //   query = query.eq('address_category', subRegion);
        // }
        // if (!showAllSubRegions && majorRegion) {
        //   query = query.eq('area', majorRegion);
        // }

        const { data, error } = await query;

        if (error) throw error;
        setSubdivisions(data || []);
        setVisibleCount(9); // 지역 변경 시 초기화
        console.log(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchSubdivisions();
  }, [majorRegion, subRegion, showAllSubRegions]);

  // Close filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const filterElement = document.getElementById("region-filter")
      if (isFilterOpen && filterElement && !filterElement.contains(event.target as Node)) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isFilterOpen])

  // Prevent scrolling when filter is open on mobile
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isFilterOpen])

  const handleMajorRegionChange = (region: string) => {
    setMajorRegion(region)
    setSubRegion(subRegionsMap[region][0]) // Set first sub-region as default
    //setShowAllSubRegions(false) // Reset show all flag when changing major region
    setShowAllSubRegions(true)

  }

  const handleSubRegionChange = (region: string) => {
    setSubRegion(region)
    setShowAllSubRegions(false)
    if (window.innerWidth < 768) {
      setIsFilterOpen(false) // Close filter on mobile after selection
    }
  }

  const handleShowAllClick = () => {
    setShowAllSubRegions(true)
    if (window.innerWidth < 768) {
      setIsFilterOpen(false) // Close filter on mobile after selection
    }
  }

  // Extract district name for display
  const getDisplayLocation = () => {
    if (showAllSubRegions) {
      return majorRegion + " 전체"
    } else {
      return subRegion
    }
  }

  const filteredSubdivisions = subdivisions.filter((item) => {
    const keyword = searchQuery.trim().toLowerCase();
    if (!keyword) return true;
  
    return (
      item.title?.toLowerCase().includes(keyword) ||
      item.address?.toLowerCase().includes(keyword) ||
      item.description?.toLowerCase().includes(keyword)
    );
  });
  
  

  if (error) return <div>오류: {error}</div>;


  return (
    <>
      <Header />
      <div className="min-h-screen bg-white/ bg-[#FDFDFC] pt-16 px-3 sm:px-6">

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center">
          {/* <div className="relative">
            <button className="flex items-center bg-gray-100 rounded-full px-4 py-2 mr-2">
              <span className="mr-1">{getDisplayLocation()}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div> */}

          <div className="flex-1 relative">
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden px-1">
              <div className="flex-1 px-4">
                <input 
                  type="text" 
                  placeholder="관심가는 매물을 찾아보세요" 
                  className="w-full py-2 outline-none"   
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="bg-gray-100 p-3 rounded-full">
                <Search className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-2 mt-3 text-sm text-gray-700 px-4">
          {/* <button className="px-3 py-1 rounded-full hover:bg-gray-100">태그</button> */}
          <button className="rounded-full hover:bg-gray-100">
            <div className="flex items-center gap-1 text-[12px] bg-green-100 text-green-600 hover:bg-green-200/80 transition-colors ease-in-out font-medium rounded-lg py-1 px-2">
              즉시입주
            </div>
          </button>
          <button className="rounded-full hover:bg-gray-100">
            <div className="flex items-center gap-1 text-[12px] bg-[var(--zoop-blue-light)]/10 text-[var(--zoop-blue)] font-medium rounded-lg py-1 px-2">
              전매가능
            </div>
          </button>
          <button className="rounded-full hover:bg-gray-100">
            <div className="flex items-center gap-1 text-[12px] bg-red-100 hover:bg-red-200/80 transition-colors ease-in-out text-red-400 font-medium rounded-lg py-1 px-2">
              전매제한
            </div>
          </button>
          <button className="rounded-full hover:bg-gray-100">
            <div className="flex items-center gap-1 text-[12px] bg-gray-200/80 text-gray-600 hover:bg-gray-300/80 transition-colors ease-in-out font-medium rounded-lg py-1 px-2">
              분양가 상한제
            </div>
          </button>
          <button className="rounded-full hover:bg-gray-100">
            <div className="flex items-center gap-1 text-[12px] bg-purple-100 text-purple-500 hover:bg-purple-200/80 transition-colors ease-in-out font-medium rounded-lg py-1 px-2">
              신혼주택
            </div>
          </button>
          <button className="rounded-full hover:bg-gray-100">
            <div className="flex items-center gap-1 text-[12px] bg-yellow-200 text-yellow-600 hover:bg-yellow-300/80 transition-colors ease-in-out font-medium rounded-lg py-1 px-2">
              공공지원 
            </div>
          </button>
        </div>
      </div>

        {/* Breadcrumb */}
        <div className="pt-6 max-w-7xl mx-auto px-4 py-2 flex items-center text-sm">
          <a href="#" className="text-gray-500">
            홈
          </a>
          <span className="mx-1 text-gray-400">›</span>
          <a href="#" className="text-gray-500">
            부동산
          </a>
        </div>

        {/* Title and Mobile Filter Button */}
        <div className="max-w-7xl mx-auto px-4 pb-4 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold">
            {majorRegion === "처음" ? "" : majorRegion} {showAllSubRegions ? "전체" : getDisplayLocation()} 부동산
          </h1>
          <button
            className="md:hidden flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1.5 text-sm"
            onClick={() => setIsFilterOpen(true)}
          >
            <Filter className="h-4 w-4" />
            필터
          </button>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:py-4 flex flex-col md:flex-row">
          {/* Mobile Filter Overlay */}
          <div
            className={`fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity duration-300 ${
              isFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />

          {/* Sidebar - Desktop (always visible) and Mobile (slide in from bottom) */}
          <div
            id="region-filter"
            className={`
              md:w-64 md:mr-8 md:static  d:block md:translate-y-0 md:pb-0
              fixed left-0 right-0 bottom-0 z-30 bg-white rounded-t-2xl md:rounded-none
              transform transition-transform duration-300 ease-in-out
              ${isFilterOpen ? "translate-y-0" : "translate-y-full md:translate-y-0"}
              max-h-[80vh] md:max-h-none overflow-auto
              shadow-[0_-4px_20px_rgba(0,0,0,0.1)] md:shadow-none
            `}
          >
            {/* Mobile Filter Header */}
            <div className="flex justify-between items-center p-4 border-b md:hidden">
              <h3 className="font-medium">지역 선택</h3>
              <button className="p-1 rounded-full hover:bg-gray-100" onClick={() => setIsFilterOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="md:sticky overflow-hidden p-4 md:p-0 rounded-xl">
              {/* Region Filter */}
              <div className="flex flex-col min-h-0 md:flex-row rounded-xl shadow-md overflow-hidden/ sm:h-[384px]">
                {/* Major Regions */}
                <div className="w-full md:w-1/3 h-full">
                  {majorRegions.map((region, index) => (
                    <button
                      key={region}
                      className={`w-full text-left px-4 py-3.5 text-sm transition-all duration-200 ${
                        majorRegion === region ? "bg-gray-900 text-white font-medium" : "bg-gray-50 hover:bg-gray-100"
                      } ${index === 0 ? "md:rounded-tl-xl" : ""} ${index === majorRegions.length - 1 ? "md:rounded-bl-xl" : ""}`}
                      onClick={() => handleMajorRegionChange(region)}
                    >
                      {region}
                    </button>
                  ))}
                </div>

                {/* Sub Regions */}
                <div className="w-full min-h-0 md:w-2/3 bg-white h-full border-[1.5] border-gray-50 overflow-hidden">
                  <div className="flex justify-between items-center py-2.5 px-4 border-b border-gray-100">
                    <span className="text-lg font-medium">{majorRegion === "처음" ? "서울" : majorRegion}</span>
                    <button
                      className={`text-sm flex items-center text-gray-600 hover:text-gray-900 transition-colors ${showAllSubRegions ? "font-bold" : ""}`}
                      onClick={handleShowAllClick}
                    >
                      전체 <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                  <div className="max-h-[300px] sm:max-h-[336px] overflow-y-auto">
                    {(subRegionsMap[majorRegion] ?? subRegionsMap["서울"]).map((region) => (
                      <button
                        key={region}
                        className={`w-full text-left px-5 py-3.5 text-sm transition-all duration-200 hover:bg-gray-50 ${
                          !showAllSubRegions && subRegion === region ? "font-medium text-gray-900" : "text-gray-700"
                        }`}
                        onClick={() => handleSubRegionChange(region)}
                      >
                        {region}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/** 매물 업로드 버튼 */}
            <div className="relative mt-6 hidden md:block h-[100px] w-full overflow-hidden rounded-lg group mb-1">
              <Link href="https://walla.my/v/K9IViOO4mtIYwEBNvZ8h" className="absolute inset-0 z-30" />
              <Image 
                src="/side_upload.png"
                alt="side"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
              />
              <div className="absolute inset-0 bg-black opacity-50 z-10 rounded-lg" />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <p className="text-white text-base font-semibold">온라인 대행문의</p>
              </div>
            </div>
            
          </div>

          {/* Property Listings */}
          <div className="flex-1 mt-6 md:mt-0 pb-8">
            {/* Mobile Upload Button */}
            {/* <div className="md:hidden relative h-[100px] w-full overflow-hidden rounded-lg group mb-3">
              <Link href="https://walla.my/v/K9IViOO4mtIYwEBNvZ8h" className="absolute inset-0 z-30" />
              <Image 
                src="/side_upload.png"
                alt="side"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
              />
              <div className="absolute inset-0 bg-black opacity-50 z-10 rounded-lg" />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <p className="text-white text-base font-semibold">분양 광고 문의</p>
              </div>
            </div> */}
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            ) : filteredSubdivisions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500">검색 결과가 없습니다.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
                  {filteredSubdivisions.slice(0, visibleCount).map((house) => (
                    <HouseCard key={house.id} house={house} />
                  ))}
                </div>
                {filteredSubdivisions.length > visibleCount && (
                  <div className="flex justify-center mt-6">
                    <button
                      className="px-6 py-2 rounded-full bg-white text-black border border-gray-300 font-semibold hover:bg-gray-900 hover:text-white transition-colors"
                      onClick={() => setVisibleCount((prev) => prev + 9)}
                    >
                      더보기
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
