export type Product = {
  uuid: string;
  code: string;
  name: string;
  unit: string;
  barcode: string;
  qty: int;
};

export type DocumentState = {
  data: Product[];
  loading: boolean;
  message: string | null;
  loadingDownload: boolean;
  loadingUpdate: boolean;
};

export type UploadDocumentPayload = {
  loading: boolean;
  data: Product[];
  message: string | null;
};

export type DownloadDocumentPayload = {
  loading: boolean;
  message: string;
};

export type ClearDocumentPayload = {
  message: string;
};

export type UpdateDocumentPayload = {
  id: string;
  value: any;
  data: Product[];
};
