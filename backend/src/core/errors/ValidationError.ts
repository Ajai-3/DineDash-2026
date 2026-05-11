import { AppError } from './AppError';
import { STATUS_CODES } from '../../shared/constants/statusCodes';

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, STATUS_CODES.BAD_REQUEST);
  }
}
