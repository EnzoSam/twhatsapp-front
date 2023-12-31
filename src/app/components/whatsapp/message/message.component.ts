import { Component, Input } from '@angular/core';
import { messageStatus } from 'src/app/constants/status.constats';
import { IChange } from 'src/app/models/ichange.interface';
import { IMessage } from 'src/app/models/imessage.interface';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  @Input() message: IMessage | undefined;

  constructor(private _messageService: MessagesService) {

  }

  sended(): boolean {
    return this.message?.changes.find((c: IChange) => c.status === 'sent') != null;
  }

  delivered(): boolean {
    return this.message?.changes.find((c: IChange) => c.status === 'delivered') != null;
  }

  readed(): boolean {
    return this.message?.changes.find((c: IChange) => c.status === 'read') != null;
  }

  error(): boolean {
    return this.message?.changes.find((c: IChange) => c.status === 'failed') != null;
  }

  lastStatus(): string {

    if(!this.message || !this.message?.changes)
      return '';

    if(this.message?.changes.find((c: IChange)=>c.status === messageStatus.readed))
      return  messageStatus.readed;
    else if(this.message?.changes.find((c: IChange)=>c.status ===messageStatus.delivered))
      return messageStatus.delivered;
    else if(this.message?.changes.find((c: IChange)=>c.status === messageStatus.sended))
      return messageStatus.sended;    
    else if(this.message?.changes.find((c: IChange)=>c.status === messageStatus.failed))
      return messageStatus.failed;    
    else
         return '';
  }

  getIdentifier(): string {
    return this.message?.id.replace(/[^a-z0-9]/gi, '');
  }

  getStatusView(_satutus:string):string
  {
    return this._messageService.getStatusView(_satutus);
  }

  getText():string
  {
    if(this.message?.type === 'text')
      return this.message.content;
    else if(this.message?.type === 'template')
      return this.message.content.fileName;
    else
      return 'Mensaje ' + this.message?.id;
  }
}
