import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  if (price === 0) return "가격 미정"
  
  const billion = Math.floor(price / 10000)
  const million = price % 10000
  
  if (billion === 0) {
    return `${million.toLocaleString()}만원`
  }
  
  if (million === 0) {
    return `${billion}억원`
  }
  
  return `${billion}억 ${million.toLocaleString()}만원`
} 