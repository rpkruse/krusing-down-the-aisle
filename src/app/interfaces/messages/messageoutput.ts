import { IMessageType } from './messagetype.enum';

export interface IMessageOutput {
  message: string,
  action: string,
  mType: IMessageType
}