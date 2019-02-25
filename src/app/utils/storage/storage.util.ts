import { IStorageUtil } from './istorage.util';

export class StorageUtil implements IStorageUtil {
  
  public setValue(key: string, value: any): void {
    if (!key || !value) {
      console.error("Inavlid key/value pair for storage");
      return;
    }

    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public getValue(key: string): any {
    if (!key) {
      console.error("Key must not be null or undef.");
      return;
    }

    const value: string = sessionStorage.getItem(key);

    if (value && value !== "undefined" && value !== null)
      return JSON.parse(value);

    return null;
  }

  public hasValue(key: string): boolean {
    if (!key) {
      console.error("Key must not be null or undef.");
      return false;
    }

    return sessionStorage.getItem(key) !== null;
  }

  public removeValue(key: string): void {
    if (!key) {
      console.error("Key must not be null or undef.");
      return;
    }

    sessionStorage.removeItem(key);
  }

  public removeAll(): void {
    sessionStorage.clear();
  }
}