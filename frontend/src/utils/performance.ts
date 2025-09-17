/**
 * Performance optimization utilities for 3D components
 */

/**
 * Throttle function calls using requestAnimationFrame
 */
export function throttleRAF<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 16 // ~60fps
): T {
  let timeoutId: number | null = null
  let lastExecTime = 0

  return ((...args: Parameters<T>) => {
    const currentTime = Date.now()

    if (currentTime - lastExecTime > delay) {
      func(...args)
      lastExecTime = currentTime
    } else {
      if (timeoutId) {
        cancelAnimationFrame(timeoutId)
      }
      
      timeoutId = requestAnimationFrame(() => {
        func(...args)
        lastExecTime = Date.now()
      })
    }
  }) as T
}

/**
 * Debounce function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T {
  let timeoutId: NodeJS.Timeout | null = null

  return ((...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }) as T
}

/**
 * Check if device supports hardware acceleration
 */
export function supportsHardwareAcceleration(): boolean {
  if (typeof window === 'undefined') return false
  
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  return !!gl
}

/**
 * Get optimal animation settings based on device capabilities
 */
export function getOptimalAnimationSettings() {
  const isLowEndDevice = !supportsHardwareAcceleration() || 
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4)
  
  return {
    enableComplexAnimations: !isLowEndDevice,
    animationDuration: isLowEndDevice ? 0.2 : 0.3,
    maxTiltDegrees: isLowEndDevice ? 8 : 12,
    enableGlare: !isLowEndDevice,
    enableShadows: !isLowEndDevice,
    reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
}

/**
 * Optimize CSS transforms for better performance
 */
export function optimizeTransform(element: HTMLElement, transform: string) {
  // Use transform3d to force hardware acceleration
  element.style.transform = transform.replace(
    /translate\(([^,]+),\s*([^)]+)\)/g,
    'translate3d($1, $2, 0)'
  )
  
  // Enable hardware acceleration
  element.style.willChange = 'transform'
  element.style.backfaceVisibility = 'hidden'
  element.style.perspective = '1000px'
}

/**
 * Clean up performance optimizations
 */
export function cleanupOptimizations(element: HTMLElement) {
  element.style.willChange = 'auto'
  element.style.backfaceVisibility = 'visible'
  element.style.perspective = 'none'
}

/**
 * Check if element is in viewport for intersection-based optimizations
 */
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * Intersection Observer for performance optimization
 */
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  }
  
  return new IntersectionObserver(callback, defaultOptions)
}