import {
  QueryConstraint,
  where,
  orderBy,
  limit,
  startAfter,
  endBefore,
  DocumentSnapshot,
} from 'firebase/firestore'

export interface QueryOptions {
  filters?: Array<{ field: string; operator: '<' | '==' | '>' | '<=' | '>='; value: unknown }>
  sortBy?: { field: string; direction: 'asc' | 'desc' }
  pageSize?: number
  startAfterDoc?: DocumentSnapshot
  endBeforeDoc?: DocumentSnapshot
}

export class FirestoreQueryBuilder {
  private constraints: QueryConstraint[] = []
  private pageSize = 100

  addFilter(field: string, operator: '<' | '==' | '>' | '<=' | '>=', value: unknown): this {
    this.constraints.push(where(field, operator, value))
    return this
  }

  addFilters(filters: Array<{ field: string; operator: '<' | '==' | '>' | '<=' | '>='; value: unknown }>): this {
    filters.forEach(filter => {
      this.constraints.push(where(filter.field, filter.operator, filter.value))
    })
    return this
  }

  sort(field: string, direction: 'asc' | 'desc' = 'asc'): this {
    this.constraints.push(orderBy(field, direction))
    return this
  }

  paginate(size: number): this {
    this.pageSize = size
    this.constraints.push(limit(size + 1))
    return this
  }

  startAfter(doc: DocumentSnapshot): this {
    this.constraints.push(startAfter(doc))
    return this
  }

  endBefore(doc: DocumentSnapshot): this {
    this.constraints.push(endBefore(doc))
    return this
  }

  build(): QueryConstraint[] {
    return this.constraints
  }

  reset(): this {
    this.constraints = []
    this.pageSize = 100
    return this
  }

  getPageSize(): number {
    return this.pageSize
  }
}

export class QueryCache {
  private cache = new Map<string, { data: unknown; timestamp: number }>()
  private readonly ttl: number

  constructor(ttlSeconds: number = 600) {
    this.ttl = ttlSeconds * 1000
  }

  set(key: string, data: unknown): void {
    this.cache.set(key, { data, timestamp: Date.now() })
  }

  get(key: string): unknown | null {
    const cached = this.cache.get(key)
    if (!cached) return null

    if (Date.now() - cached.timestamp > this.ttl) {
      this.cache.delete(key)
      return null
    }

    return cached.data
  }

  invalidate(pattern: string): void {
    const regex = new RegExp(pattern)
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key)
      }
    }
  }

  clear(): void {
    this.cache.clear()
  }

  size(): number {
    return this.cache.size
  }
}

export function buildCacheKey(...parts: (string | number | boolean)[]): string {
  return parts.filter(p => p !== undefined && p !== null).map(String).join('|')
}

export function estimateDocumentSize(doc: unknown): number {
  return JSON.stringify(doc).length
}

export function shouldFetchNextPage(currentCount: number, pageSize: number): boolean {
  return currentCount >= pageSize
}
