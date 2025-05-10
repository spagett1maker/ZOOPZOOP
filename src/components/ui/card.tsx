import Image from "next/image";
import Link from "next/link";
// import { House } from "lucide-react";
import { Subdivision } from "@/types/type";
import { formatPrice } from "@/lib/utils";


export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // 초 단위 차이 계산

  const units = [
    { label: "년 전", seconds: 60 * 60 * 24 * 365 },
    { label: "개월 전", seconds: 60 * 60 * 24 * 30 },
    { label: "일 전", seconds: 60 * 60 * 24 },
    { label: "시간 전", seconds: 60 * 60 },
    { label: "분 전", seconds: 60 },
    { label: "방금 전", seconds: 0.1 },
  ];

  for (const unit of units) {
    const value = Math.floor(diff / unit.seconds);
    if (value > 0) {
      return `${value}${unit.label}`;
    }
  }

  return "방금 전";
}


export function HouseCard({ house }: { house: Subdivision }) {
  return (
    <Link href={`/${house.id}`} className="flex flex-col overflow-hidden gap-3 cursor-pointer mb-6">
      <div className="relative aspect-6/5 w-full rounded-lg overflow-hidden">
        <Image src={house.images?.[0] || "/placeholder.svg"} alt={house.subdivision_name || "분양 정보"} fill className="object-cover rounded-lg hover:scale-105 duration-300 transition-transform hover:z-10" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="relative">
          <div className="text-sm text-gray-700">{house.property_type}</div>
          <div className="text-xl font-bold">{house.subdivision_name}</div>
          <div className="text-lg font-medium">{formatPrice(house.price || 0)} ~</div>
        </div>
        <div className="relative">
          <div className="flex text-base">
            <div className="">{house.size?.[0]?.type ? `${house.size[0].type} ~` : '면적 정보 없음'}</div>
          </div>
          <div className="flex text-base">
            <div className="">{house.up_floor}층</div>
            <div className="ml-1">·</div>
            <div className="ml-1">총 {house.units_number}세대</div>
          </div>
        </div>
        <div className="flex gap-2 py-[2px]">
          {house.tags?.[0] && (
            <div className="flex items-center gap-1 text-[12px] bg-[var(--zoop-blue-light)]/10 text-[var(--zoop-blue)] font-medium rounded-lg py-1 px-2">
              {/* <House className="w-4 h-4 text-[#068C6D]" />  */} 즉시입주
            </div>
          )}
          {house.tags?.[1] ? (
            <div className="flex items-center gap-1 text-[12px] bg-[var(--zoop-blue-light)]/10 text-[var(--zoop-blue)] font-medium rounded-lg py-1 px-2">
              {/* <House className="w-4 h-4 text-[#068C6D]" /> 전매가능 */} 전매가능
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[12px] bg-red-100 text-red-400 font-medium rounded-lg py-1 px-2">
              {/* <House className="w-4 h-4 text-[#f37021]" /> 전매제한 */} 전매제한
            </div>
          )}
          {house.tags?.[2] && (
            <div className="flex items-center gap-1 text-[12px] bg-[var(--zoop-blue-light)]/10 text-[var(--zoop-blue)] font-medium rounded-lg py-1 px-2">
              {/* <House className="w-4 h-4 text-[#068C6D]" /> 다주택 가능 */} 분양가 상한제
            </div>
          )}
        </div>
        
        <div className="relative">
          <div className="flex gap-1 text-sm text-gray-600">
            <div>{house.address}</div>
            {/* <div>·</div>
            {house.created_at && <div>{formatRelativeTime(new Date(house.created_at))}</div>} */}
          </div>
          {/* <div className="flex items-center gap-3 mt-1">
            <div className="flex gap-1 items-center text-gray-600">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{house.chats}</span>
            </div>
            <div className="flex gap-1 items-center text-gray-600">
              <Heart className="w-4 h-4" />
              <span className="text-s">{house.likes}</span>
            </div>
          </div> */}
        </div>
      </div>
    </Link>
  );
}