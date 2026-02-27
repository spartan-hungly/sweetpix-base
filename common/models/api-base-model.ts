export type BaseAPIResponse<T> = {
  data: T;
  statusCode: number;
};

export interface BasePageableResponse<T> {
  items: T[];
  total: number;
}
