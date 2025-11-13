// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DebouncedFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void

const pendingRequests = new Map<string, Promise<unknown>>()
const debounceTimers = new Map<string, NodeJS.Timeout>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  delay: number,
  key: string
): DebouncedFunction<T> {
  return (...args: Parameters<T>) => {
    if (debounceTimers.has(key)) {
      clearTimeout(debounceTimers.get(key)!)
    }

    const timer = setTimeout(() => {
      fn(...args)
      debounceTimers.delete(key)
    }, delay)

    debounceTimers.set(key, timer)
  }
}

export async function deduplicateRequest<T>(
  key: string,
  fn: () => Promise<T>
): Promise<T> {
  if (pendingRequests.has(key)) {
    return pendingRequests.get(key)! as Promise<T>
  }

  const promise = fn().finally(() => {
    pendingRequests.delete(key)
  })

  pendingRequests.set(key, promise)
  return promise
}

export function clearDebounceTimer(key: string) {
  if (debounceTimers.has(key)) {
    clearTimeout(debounceTimers.get(key)!)
    debounceTimers.delete(key)
  }
}

export function createRequestKey(...parts: (string | number)[]): string {
  return parts.map(String).join(':')
}

export class PerformanceMonitor {
  private marks = new Map<string, number>()

  mark(name: string) {
    this.marks.set(name, performance.now())
  }

  measure(name: string, startMark: string): number {
    const start = this.marks.get(startMark)
    if (!start) return 0
    const duration = performance.now() - start
    if (duration > 100) {
      console.warn(`⚠️ Slow operation: ${name} took ${duration.toFixed(2)}ms`)
    }
    return duration
  }

  clear() {
    this.marks.clear()
  }
}

export const performanceMonitor = new PerformanceMonitor()
