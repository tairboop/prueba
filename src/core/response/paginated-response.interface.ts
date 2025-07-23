export interface PaginationMeta {
  total_records: number
  current_page: number
  total_pages: number
  next_page: number | null
  prev_page: number | null
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: PaginationMeta
}
