export interface ResponseError extends Error {
  response?: {
    message?: string;
  };
}
