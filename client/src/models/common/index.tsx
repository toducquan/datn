export interface BaseModel {
  id?: string;

  createdOnDate?: string;

  createdByUserId?: string;

  lastModifiedOnDate?: string;

  lastModifiedByUserId?: string;
}

export interface ResponseData<T> {
  signal: number;
  code: any;
  message: string;
  data: T;
}

export interface SearchBase {
  page?: number;
  size?: number;
}
