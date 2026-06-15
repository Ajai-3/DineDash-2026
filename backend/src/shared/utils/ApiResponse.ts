import { Response } from 'express';

export class ApiResponse {
  static success<T>(res: Response, statusCode: number, message: string, data: T | null = null) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static paginated<T>(
    res: Response,
    statusCode: number,
    message: string,
    data: T[],
    total: number,
    page: number,
    limit: number,
    totalPages: number
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      total,
      page,
      limit,
      totalPages,
    });
  }

  static error(res: Response, statusCode: number, message: string, errors: any = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }
}
