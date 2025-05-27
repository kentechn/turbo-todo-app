import type { ContentfulStatusCode } from "hono/utils/http-status";

export abstract class AppError extends Error {
  abstract readonly statusCode: ContentfulStatusCode;
  abstract readonly code: string;
  readonly isOperational: boolean = true;
  readonly details?: unknown;

  constructor(message: string, details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
      },
    };
  }

  // For internal logging
  toLogObject() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      details: this.details,
      stack: this.stack,
    };
  }
}