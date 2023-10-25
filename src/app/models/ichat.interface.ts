import { IChange } from "./ichange.interface";
import { IContact } from "./icontact.interface";
import { IMessage } from "./imessage.interface";

export interface IChat {
    
    id:any;
    contactId :any;
    contact:IContact;
    messages:IMessage[]
    lastChangeId: any;
    noReadsMessages:number | 0;
    lastChangeTimestamp?:any;
    lastMessage?:IMessage

}