import { eMessageIcon, eMessageType, StatusFlags } from "../enum/common.enum";


export interface APIResponse {
  success: boolean
  message: string
  data: any
}

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
