
import Image from 'next/image'
import Link from 'next/link'

export default function Blog() {
  return (
    <section className='w-full mx-auto px-6 sm:px-0 max-w-[1280px] pt-[60px] pb-[50px]/'>
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-[32px] sm:mb-[60px]">
        <span className='text-[var(--zoop-blue)]'>Articles</span> and Blog
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        <Link href="https://acoustic-beechnut-d15.notion.site/KA-1e56cc418ff28072a862e12b02e96585" className='cursor-pointer'>
        <div className="rounded-lg overflow-hidden bg-white">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <Image
              src="/blog1.jpg"
              alt="Glass building architecture"
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="py-4 pl-1">
            <p className="text-sm text-gray-500 mb-2">May 9, 2024</p>
            <h3 className="font-medium text-xl">KA 한국 자산관리</h3>
            <div className='items-center flex justify-center py-[6px] px-[12px] relative bg-[var(--zoop-blue)] max-w-max rounded-full mt-5 ml-[-2px]'>
              <p className="text-white font-semibold text-xs">READ MORE</p>
            </div>
          </div>
        </div>
        </Link>

        <Link href="https://acoustic-beechnut-d15.notion.site/1bd6cc418ff28054aeb2e9a5a688a700" className='cursor-pointer'>
        <div className="rounded-lg overflow-hidden bg-white">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <Image
              src="/blog2.jpg"
              alt="Orange building architecture"
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="py-4 pl-1">
            <p className="text-sm text-gray-500 mb-2">May 9, 2024</p>
            <h3 className="font-medium text-xl">전세사기 특별법이 만료된다면?</h3>
            <div className='items-center flex justify-center py-[6px] px-[12px] relative bg-[var(--zoop-blue)] max-w-max rounded-full mt-5 ml-[-2px]'>
              <p className="text-white font-semibold text-xs">READ MORE</p>
            </div>
          </div>
        </div>
        </Link>

        <Link href="https://acoustic-beechnut-d15.notion.site/HF-HUG-SGI-1bd6cc418ff2805cb845e3a3b08e2c89" className='cursor-pointer'>
        <div className="rounded-lg overflow-hidden bg-white">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <Image
              src="/blog3.jpg"
              alt="Red architectural structure"
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="py-4 pl-1">
            <p className="text-sm text-gray-500 mb-2">May 9, 2024</p>
            <h3 className="font-medium text-xl">전세 보증금 반환 보증 HUG, HF, SGI 차이</h3>
            <div className='items-center flex justify-center py-[6px] px-[12px] relative bg-[var(--zoop-blue)] max-w-max rounded-full mt-5 ml-[-2px]'>
              <p className="text-white font-semibold text-xs">READ MORE</p>
            </div>
          </div>
        </div>
        </Link>
      </div>
    </section>
  )
}