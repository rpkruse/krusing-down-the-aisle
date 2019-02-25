export interface IStorageUtil {
  setValue(key: string, value: any): void;
  getValue(key: string): any;
  hasValue(key: string): boolean;
  removeValue(key: string): void;
  removeAll(): void;
}