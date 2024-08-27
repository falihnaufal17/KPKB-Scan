import {
  clearDocument,
  downloadDocument,
  updateDocument,
  updateDocumentSuccess,
  uploadDocument,
} from '../reducers/product';
import DocumentPicker from 'react-native-document-picker';
import XLSX from 'xlsx';
import {Buffer} from 'buffer';
import RNFS from 'react-native-fs';
import {PermissionsAndroid, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ClearDocumentPayload,
  Product,
  UpdateDocumentPayload,
} from '../types/product';
import ProductModel from '../models/Product';

export const uploadDocumentAsync = () => async (dispatch: any) => {
  dispatch(uploadDocument({loading: true, data: [], message: null}));

  try {
    const file = await DocumentPicker.pickSingle({
      type: [
        DocumentPicker.types.xlsx,
        DocumentPicker.types.csv,
        DocumentPicker.types.xls,
      ],
    });
    const filePath = file.uri;
    const isLocalFile = filePath.startsWith('file://');
    const fileData = await RNFS.readFile(
      isLocalFile ? filePath.slice(7) : filePath,
      'base64',
    );
    const binaryData = Buffer.from(fileData, 'base64').toString('binary');
    const workbook = XLSX.read(binaryData, {type: 'binary'});
    const sheetNames = workbook.SheetNames;
    const sheetData: Product[] = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetNames[0]],
    );
    const product = new ProductModel();

    await product.save(sheetData);

    dispatch(
      uploadDocument({
        loading: false,
        data: sheetData,
        message: 'Dokumen berhasil diunggah',
      }),
    );
  } catch (e) {
    dispatch(
      uploadDocument({
        loading: false,
        data: [],
        message: `${e}`,
      }),
    );
  }
};

export const downloadDocumentAsync = (data: any[]) => async (dispatch: any) => {
  dispatch(downloadDocument({loading: true, message: ''}));
  await requestStoragePermission();

  const now = new Date();
  const formattedDateTime = `${now.getDate()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${now.getFullYear()}-${now
    .getHours()
    .toString()
    .padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now
    .getSeconds()
    .toString()
    .padStart(2, '0')}`;
  const workbook = convertJsonToWorkbook(data);
  const wbout = XLSX.write(workbook, {type: 'binary', bookType: 'xlsx'});
  const path = `${RNFS.DownloadDirectoryPath}/KPKB-${formattedDateTime}.xlsx`;

  try {
    await RNFS.writeFile(path, wbout, 'ascii');
    dispatch(
      downloadDocument({loading: false, message: 'Berhasil mengunduh file'}),
    );
  } catch (e) {
    dispatch(
      downloadDocument({loading: false, message: `Terjadi kesalahan ${e}`}),
    );
    console.error(e);
  }
};

export const getProductsAsync = () => async (dispatch: any) => {
  const product = new ProductModel();
  const data = await product.find();

  dispatch(
    uploadDocument({loading: false, data, message: 'Dokumen berhasil muat'}),
  );
};

export const updateDocumentAsync =
  (payload: UpdateDocumentPayload) => async (dispatch: any) => {
    dispatch(updateDocument(payload));

    try {
      await AsyncStorage.setItem('@excelData', JSON.stringify(payload.data));
      dispatch(updateDocumentSuccess());
      ToastAndroid.show('Data berhasil diubah', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Failed to update document:', error);
      ToastAndroid.show('Gagal mengubah data', ToastAndroid.SHORT);
    }

    await AsyncStorage.removeItem('@filteredData');
  };

const convertJsonToWorkbook = (json: any[]) => {
  const sheet = XLSX.utils.json_to_sheet(json);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');
  return workbook;
};

const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'MyApp needs access to your device storage to save files.',
        buttonPositive: 'OK',
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

export const clearDocumentAsync =
  (payload: ClearDocumentPayload) => async (dispatch: any) => {
    dispatch(clearDocument(payload));

    try {
      await AsyncStorage.removeItem('products');
    } catch (err) {
      console.log(err);
    }
  };
