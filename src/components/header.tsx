"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Modal } from "@/components/ui/modal";

export default function Header() {
  const { user,  signOut } = useAuth()

  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)


  // const handleDownloadClick = () => {
  //   setIsOpen(true)

  //   // Track the click event
  //   trackDownloadClick()

  //   // Simulate preparation process
  //   setTimeout(() => {
  //     // After preparation is complete, you could:
  //     // 1. Close the modal
  //     // 2. Redirect to download page
  //     // 3. Start the download
  //     setIsOpen(false)
  //   }, 3000)
  // }

  // const trackDownloadClick = () => {
  //   // This function would implement your tracking logic
  //   // For example:
  //   const userId = localStorage.getItem("userId") || "anonymous"
  //   const timestamp = new Date().toISOString()

  //   console.log(`Download clicked by ${userId} at ${timestamp}`)

  //   // In a real application, you would send this data to your analytics service
  //   // Example:
  //   // fetch('/api/track-download', {
  //   //   method: 'POST',
  //   //   body: JSON.stringify({ userId, timestamp }),
  //   //   headers: { 'Content-Type': 'application/json' }
  //   // })
  // }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        const mobileMenu = document.getElementById("mobile-menu")
        const menuButton = document.getElementById("menu-button")
      
        if (
          isMobileMenuOpen &&
          mobileMenu &&
          !mobileMenu.contains(target) &&
          menuButton &&
          !menuButton.contains(target)
        ) {
          setIsMobileMenuOpen(false)
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [isMobileMenuOpen])
  
    // Prevent scrolling when mobile menu is open
    useEffect(() => {
      if (isMobileMenuOpen) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
  
      return () => {
        document.body.style.overflow = ""
      }
    }, [isMobileMenuOpen])

  return (
    <header className={`${hasScrolled ? "border-b border-gray-200" : ""} fixed w-full z-50 bg-white px-3 sm:px-6`}>
      <div className="container mx-auto max-w-[1280px] px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link href="/" className="mr-4 sm:mr-8 cursor-pointer flex flex-col items-center">
            <p className="text-xl sm:text-3xl font-extrabold tracking-tighter">
              <span className="text-zoop-blue/80 text-[var(--zoop-blue)]">ZOOP</span> ZOOP
            </p>
            {/* <p className="text-sm text-gray-500">아파트 청약 정보는 &apos;줍줍&apos;</p> */}
          </Link>
          
        </div>
        <div className="flex items-center">
          <nav className="hidden md:flex space-x-10 px-10 font-medium">
            <Link href="/service" className="">
              <p className="hover:font-semibold">KA 한국자산관리</p>
            </Link>
            <Link href="https://walla.my/v/K9IViOO4mtIYwEBNvZ8h" className="">
              <p className="hover:font-semibold">광고 문의하기</p>
            </Link>
          </nav>
          <div className="hidden md:flex items-center">
            {user ? (
              <button onClick={() => {
                console.log("logout")
                signOut()
                }} className=" hover:bg-black text-black/90 hover:text-white font-medium border mr-3 rounded-md px-4 py-2 text-sm transition-colors ease-in-out cursor-pointer">
                로그아웃
              </button>
            ) : (
              <Link href="/login" className=" hover:bg-black text-black/90 hover:text-white font-medium border border-black mr-3 rounded-md px-4 py-2 text-sm transition-colors ease-in-out cursor-pointer">
                로그인 
              </Link>
            )}
            <Link href="https://walla.my/v/jmGi5KblaB0pekmTaJyr" className="bg-[var(--zoop-blue)] hover:bg-[var(--zoop-blue-light)] text-white font-semibold rounded-md px-4 py-2 text-sm transition-colors ease-in-out cursor-pointer">
              청약 알림받기
            </Link>
          </div>

          {/* Mobile Menu Button and Download Button */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href="https://walla.my/v/jmGi5KblaB0pekmTaJyr"
              className="bg-zoop-blue hover:bg-zoop-blue/80 text-white font-semibold rounded-md px-3 py-1.5 text-sm transition-colors ease-in-out cursor-pointer"
            >
              청약 알림받기
            </Link>

            <button
              id="menu-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            id="mobile-menu"
            className={`fixed top-0 right-0 h-full w-[250px] sm:w-[300px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col space-y-6 text-lg font-medium mb-8">
                <Link
                  href="/service"
                  className="hover:text-orange-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  서비스 소개
                </Link>
                <Link
                  href="https://walla.my/v/K9IViOO4mtIYwEBNvZ8h"
                  className="hover:text-orange-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  광고 문의하기
                </Link>
              </nav>
              <div className="mt-auto">
                {user ? (
                  <button
                    onClick={() => {
                      console.log("logout")
                      signOut()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full hover:bg-black text-black/90 hover:text-white font-medium border rounded-md px-4 py-2 text-sm transition-colors ease-in-out cursor-pointer"
                  >
                    로그아웃
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="block w-full text-center hover:bg-black text-black/90 hover:text-white font-medium border rounded-md px-4 py-2 text-sm transition-colors ease-in-out cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    로그인
                  </Link>
                )}
              </div>
            </div>
          </div>
          
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="flex flex-col items-center justify-center py-6">
              <div className="h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <h3 className="text-lg mb-6 font-medium">준비중입니다 !</h3>
              {/* <p className="text-sm text-gray-500 my-1">앱이 준비되면 알려드리겠습니다.</p> */}
              {/* <Link href="/signup" className="text-orange-500 font-medium text-sm mt-4 hover:font-bold">알림 받기</Link> */}
              <a href="tel:01021578187" className="hover:underline flex items-center text-base gap-1 mb-2">📞 광고 문의 하기</a>
              <a href="mailto:contact@zoopzoop.homes" className="hover:underline mb-3 text-base"> 📧 광고 문의 하기</a>
            </div>
          </Modal>
        </div>
      </div>
    </header>
  )
}