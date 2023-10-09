import { IContact } from "./icontact.interface";
import { IMessage } from "./imessage.interface";

export interface IChat {
    contact:IContact
    messages:IMessage[]
    lastMessage?:IMessage
}