import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  ClearDocumentPayload,
  DocumentState,
  DownloadDocumentPayload,
  Product,
  UpdateDocumentPayload,
  UploadDocumentPayload,
} from '../types/product';

const initialState: DocumentState = {
  data: [],
  loading: false,
  message: null,
  loadingDownload: false,
  loadingUpdate: false,
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
    updateDocument: (state, action: PayloadAction<UpdateDocumentPayload>) => {
      state.loadingUpdate = true;
      const newArray = [...state.data];
      const index = newArray.findIndex(
        (obj: Product) => obj.uuid === action.payload.id,
      );
      if (index !== -1) {
        newArray[index] = {...newArray[index], qty: action.payload.value};
        state.data = newArray;
      }
    },
    updateDocumentSuccess: state => {
      state.loadingUpdate = false;
      state.message = 'Data berhasil diubah';
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
} = product.actions;

export default product.reducer;
