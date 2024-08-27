import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  ClearDocumentPayload,
  DocumentState,
  DownloadDocumentPayload,
  Product,
  UploadDocumentPayload,
} from '../types/product';

const initialState: DocumentState = {
  data: [],
  loading: false,
  message: null,
  loadingDownload: false,
  loadingUpdate: false,
  scannedData: {
    barcode: '',
    code: '',
    difference: 0,
    name: '',
    qtyopname: 0,
    qtysystem: 0,
    unit: '',
  },
};

export const product = createSlice({
  name: 'product',
  initialState,
  reducers: {
    uploadDocument: (state, action: PayloadAction<UploadDocumentPayload>) => {
      state.loading = action.payload.loading;
      state.data = action.payload.data;
      state.message = action.payload.message;
    },
    downloadDocument: (
      state,
      action: PayloadAction<DownloadDocumentPayload>,
    ) => {
      state.loadingDownload = action.payload.loading;
      state.message = action.payload.message;
    },
    clearDocument: (state, action: PayloadAction<ClearDocumentPayload>) => {
      state.data = [];
      state.message = action.payload.message;
    },
    updateDocument: (state, action: PayloadAction<Product>) => {
      const newArray = [...state.data];
      const index = newArray.findIndex(
        (obj: Product) => obj.code === action.payload.code,
      );
      if (index !== -1) {
        newArray[index] = {
          ...newArray[index],
          qtyopname: action.payload.qtyopname,
          difference: action.payload.difference,
          state: action.payload?.state,
        };

        state.data = newArray;
      }
    },
    updateDocumentSuccess: state => {
      state.loadingUpdate = false;
      state.message = 'Data berhasil diubah';
    },
    scannedBarcode: (state, action: PayloadAction<Product>) => {
      state.scannedData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  uploadDocument,
  downloadDocument,
  clearDocument,
  updateDocument,
  updateDocumentSuccess,
  scannedBarcode,
} = product.actions;

export default product.reducer;
