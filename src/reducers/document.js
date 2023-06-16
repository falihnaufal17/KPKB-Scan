import { createSlice } from '@reduxjs/toolkit'
import DocumentPicker from 'react-native-document-picker';
import XLSX from 'xlsx';
import { Buffer } from 'buffer';
import RNFS from 'react-native-fs';
import { PermissionsAndroid, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const document = createSlice({
  name: 'document',
  initialState: {
    data: [],
    loading: false,
    message: null,
    loadingDownload: false,
    loadingUpdate: false
  },
  reducers: {
    uploadDocument: (state, action) => {
      state.loading = action.payload.loading
      state.data = action.payload.data
      state.message = action.payload.message
    },
    downloadDocument: (state, action) => {
      state.loadingDownload = action.payload.loading
      state.message = action.payload.message
    },
    clearDocument: (state, action) => {
      state.data = []
      state.message = action.payload.message
    },
    updateDocument: (state, action) => {
      state.loadingUpdate = true
      const newArray = [...state.data]
      const index = newArray.findIndex(obj => obj.kodebarang === action.payload.id);
      newArray[index] = { ...newArray[index], qty: action.payload.value };

      state.data = newArray
      ToastAndroid.show('Data berhasil diubah', ToastAndroid.SHORT)

      action.payload.onDismiss()
    }
  },
})

// Action creators are generated for each case reducer function
export const { uploadDocument, downloadDocument, clearDocument, updateDocument } = document.actions

export const uploadDocumentAsnyc = () => async (dispatch) => {
  dispatch(uploadDocument({loading: true, data: [], message: null}))

  try {
    const file = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.xlsx, DocumentPicker.types.csv, DocumentPicker.types.xls],
    });
    const filePath = file.uri;
    const isLocalFile = filePath.startsWith('file://');
    const fileData = await RNFS.readFile(
      isLocalFile ? filePath.slice(7) : filePath,
      'base64',
    );
    const binaryData = Buffer.from(fileData, 'base64').toString('binary');
    const workbook = XLSX.read(binaryData, { type: 'binary' });
    const sheetNames = workbook.SheetNames;
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);

    await AsyncStorage.setItem('@excelData', JSON.stringify(sheetData))

    dispatch(uploadDocument({loading: false, data: sheetData, message: 'Dokumen berhasil diunggah'}))
  } catch (e) {
    dispatch(uploadDocument({loading: false, data: [], message: `Error reading file: ${e}`}))
  }
}

export const downloadDocumentAsync = (data) => async (dispatch) => {
  dispatch(downloadDocument({loading: true}))
  await requestStoragePermission()

  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const formattedDateTime = `${day}-${month}-${year}-${hours}-${minutes}-${seconds}`;
  const workbook = convertJsonToWorkbook(data)
  const wbout = XLSX.write(workbook, { type: 'binary', bookType: 'xlsx' });
  const path = `${RNFS.DownloadDirectoryPath}/KPKB-${formattedDateTime}.xlsx`;
  
  try {
    await RNFS.writeFile(path, wbout, 'ascii');
    dispatch(downloadDocument({loading: false, message: 'Berhasil mengunduh file'}))
  } catch (e) {
    dispatch(downloadDocument({loading: false, message: `Terjadi kesalahan ${e}`}))
    console.error(e)
  }
}

export const setDataExcel = (data) => (dispatch) => {
  dispatch(uploadDocument({loading: false, data, message: 'Dokumen berhasil muat'}))
}

export const updateDocumentAsync = (payload) => async (dispatch) => {
  dispatch(updateDocument(payload))

  await AsyncStorage.removeItem('@filteredData')
}

const convertJsonToWorkbook = (json) => {
  const sheet = XLSX.utils.json_to_sheet(json);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');
  return workbook;
}

const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'MyApp needs access to your device storage to save files.',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Storage permission granted');
    } else {
      console.log('Storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export default document.reducer