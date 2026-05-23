import { eMessageIcon, eMessageType, StatusFlags } from "../enum/common.enum";

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: StatusFlags;
}


export interface Options {
  key: eMessageType;
  value: string;
  icon: eMessageIcon;
}
