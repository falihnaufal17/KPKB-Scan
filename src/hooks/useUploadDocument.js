import { useState } from 'react'
import XLSX from 'xlsx';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { Buffer } from 'buffer';
import { PermissionsAndroid, ToastAndroid } from 'react-native'

const useUploadDocument = () => {
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(false)
  const [loadingDownload, setLoadingDownload] = useState(false)

  const handleUpload = async () => {
    setLoading(true)
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

      setData(sheetData)
      setTotal(sheetData?.length)
      setLoading(false)
    } catch (error) {
      console.log('Error reading file:', error);
      setData([])
      setLoading(false)
    }
  };

  const clearSheetData = () => setData([])

  const handleUpdateData = (id, value, onDismiss) => {
    setData(prevArray => {
      const newArray = [...prevArray];
      const index = newArray.findIndex(obj => obj.kodebarang === id);
      newArray[index] = { ...newArray[index], qty: value };
      
      return newArray;
    })

    setTimeout(() => {
      ToastAndroid.show('Data berhasil diubah', ToastAndroid.SHORT)

      onDismiss()
    }, 800)
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

  const convertJsonToWorkbook = (json) => {
    const sheet = XLSX.utils.json_to_sheet(json);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');
    return workbook;
  }

  const handleDownload = async () => {
    await requestStoragePermission()

    setLoadingDownload(true)

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
      ToastAndroid.show('Berhasil mengunduh file', ToastAndroid.SHORT)
      setLoadingDownload(false)
    } catch (e) {
      setLoadingDownload(false)
      console.error(e)
    }

    return path;
  }
  return { sheetData: data, handleUpload, loading, clearSheetData, handleUpdateData, handleDownload, loadingDownload }
}

export default useUploadDocument