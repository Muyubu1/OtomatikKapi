import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// GitHub Pages basePath için yardımcı fonksiyon
const basePath = process.env.NODE_ENV === 'production' ? '/OtomatikKapi' : ''

export function getAssetPath(path: string): string {
  // Eğer path zaten basePath ile başlıyorsa, tekrar ekleme
  if (path.startsWith(basePath)) {
    return path
  }
  // Path / ile başlıyorsa basePath ekle
  if (path.startsWith('/')) {
    return `${basePath}${path}`
  }
  // Diğer durumlarda direkt döndür
  return path
}
