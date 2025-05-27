import { AppError } from "./AppError.js";

export class ValidationError extends AppError {
  readonly statusCode = 400;
  readonly code = "VALIDATION_ERROR";
  readonly fields?: Array<{ path: string; message: string }>;

  constructor(message: string, fields?: Array<{ path: string; message: string }>) {
    super(message, fields);
    this.fields = fields;
  }

  toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
        ...(this.fields && { fields: this.fields }),
      },
    };
  }
}

export class UnauthorizedError extends AppError {
  readonly statusCode = 401;
  readonly code = "UNAUTHORIZED";

  constructor(message: string = "Authentication required", details?: unknown) {
    super(message, details);
  }
}

export class ForbiddenError extends AppError {
  readonly statusCode = 403;
  readonly code = "FORBIDDEN";

  constructor(message: string = "Insufficient permissions", details?: unknown) {
    super(message, details);
  }
}

export class NotFoundError extends AppError {
  readonly statusCode = 404;
  readonly code = "NOT_FOUND";

  constructor(resource: string, details?: unknown) {
    super(`${resource} not found`, details);
  }
}

export class ConflictError extends AppError {
  readonly statusCode = 409;
  readonly code = "CONFLICT";

  constructor(message: string, details?: unknown) {
    super(message, details);
  }
}

export class InternalServerError extends AppError {
  readonly statusCode = 500;
  readonly code = "INTERNAL_SERVER_ERROR";

  constructor(message: string = "Internal server error", details?: unknown) {
    super(message, details);
  }
}

export { AppError };