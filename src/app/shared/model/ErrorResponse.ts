export interface ErrorResponse {
  message: string;
  httpStatus: number;
  timeStamp: string;
  errors: string[];
}
