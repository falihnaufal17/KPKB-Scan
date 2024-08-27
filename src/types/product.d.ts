export type Product = {
  code: string;
  name: string;
  unit: string;
  barcode: string;
  qtyopname: number;
  qtysystem: number;
  difference: number;
  state?: string;
};

export type DocumentState = {
  data: Product[];
  loading: boolean;
  message: string | null;
  loadingDownload: boolean;
  loadingUpdate: boolean;
  scannedData: Product;
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
  code: string;
  value: any;
  data: Product[];
};
