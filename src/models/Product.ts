import AsyncStorage from '@react-native-async-storage/async-storage';
import {v4 as uuidv4} from 'uuid';
import {Product as ProductType} from '../types/product';

class Product {
  public uuid: string;

  constructor() {
    this.uuid = uuidv4();
  }

  async save(payload: any) {
    try {
      await AsyncStorage.setItem('products', JSON.stringify(payload));
    } catch (e: any) {
      throw e;
    }
  }

  async find(): Promise<ProductType[]> {
    try {
      const data: string | null =
        (await AsyncStorage.getItem('products')) || null;
      const result: ProductType[] = data && JSON.parse(data);

      return result ?? [];
    } catch (e: any) {
      throw e;
    }
  }

  async findByBarcode(barcode?: string) {
    try {
      if (!barcode) {
        throw new Error('No barcode detected');
      }

      const data: string | null = await AsyncStorage.getItem('products');
      if (data) {
        const result = JSON.parse(data);
        const singleData = result.find(
          (item: any) => item.barcode === barcode.toString(),
        );

        if (singleData) {
          return singleData;
        } else {
          throw new Error('Product not found');
        }
      } else {
        throw new Error('Products is empty');
      }
    } catch (e: any) {
      throw e;
    }
  }

  async update(uuid: string, payload: any) {
    try {
      const data: string | null = await AsyncStorage.getItem('products');
      if (data) {
        const parsedData = JSON.parse(data);

        const itemIndex = parsedData.findIndex(
          (item: any) => item.uuid === uuid,
        );

        if (itemIndex !== -1) {
          // Update the found item with the payload
          const updatedItem = {...parsedData[itemIndex], ...payload};
          parsedData[itemIndex] = updatedItem;

          // Save the updated data back to AsyncStorage
          await AsyncStorage.setItem('products', JSON.stringify(parsedData));
        } else {
          throw new Error('Single Data Not Found');
        }
      } else {
        throw new Error('Products is empty');
      }
    } catch (e: any) {
      throw e;
    }
  }
}

export default Product;
