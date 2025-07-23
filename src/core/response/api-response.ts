import { PaginationMeta } from './paginated-response.interface'

export class ApiResponse<T> {
  constructor(
    public status: 'success' | 'error',
    public message: string,
    public data?: T,
    public pagination?: PaginationMeta
  ) {}

  static success<T>(data: T, message = 'Success', pagination?: PaginationMeta) {
    return new ApiResponse('success', message, data, pagination)
  }

  static error(message = 'Error') {
    return new ApiResponse('error', message)
  }
}
