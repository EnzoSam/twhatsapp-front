import { IContact } from "./icontact.interface";

export interface IMessage {
    contact:IContact,
    text:string,
    date:any
}