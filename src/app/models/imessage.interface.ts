import { IChange } from "./ichange.interface";

export interface IMessage {
    id:any;
    chatId:any;
    content:any;
    changes:IChange[];
    timestamp:any;
    type:any;
}