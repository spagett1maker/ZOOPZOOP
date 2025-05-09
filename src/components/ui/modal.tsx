"use client"

import { useState, useEffect } from "react";

import { createPortal } from "react-dom"

// Custom Modal Component
export const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Add event listener to close modal on escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!mounted) return null

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />

      {/* Modal Content */}
      <div
        className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}
