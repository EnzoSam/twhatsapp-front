import { IChange } from "./ichange.interface";
import { IContact } from "./icontact.interface";

export interface IMessage {
    id:any,
    contact?:IContact,
    text:string,
    date:any,
    changes:IChange[]
}