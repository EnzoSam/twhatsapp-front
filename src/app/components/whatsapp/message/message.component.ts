import { Component, Input } from '@angular/core';
import { IChange } from 'src/app/models/ichange.interface';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  @Input() message: any;

  constructor(private _messageService: MessagesService) {

  }

  sended(): boolean {
    return this.message.changes.find((c: IChange) => c.status === 'sent') != null;
  }

  delivered(): boolean {
    return this.message.changes.find((c: IChange) => c.status === 'delivered') != null;
  }

  readed(): boolean {
    return this.message.changes.find((c: IChange) => c.status === 'read') != null;
  }

  error(): boolean {
    return this.message.changes.find((c: IChange) => c.status === 'failed') != null;
  }

  lastStatus(): string {

    if(this.message.changes.find((c: IChange)=>c.status === 'read'))
      return 'read';
    else if(this.message.changes.find((c: IChange)=>c.status === 'delivered'))
      return 'delivered';
    else if(this.message.changes.find((c: IChange)=>c.status === 'sent'))
      return 'sent';    
    else if(this.message.changes.find((c: IChange)=>c.status === 'failed'))
      return 'failed';    
    else
         return this.message.changes[this.message.changes.length - 1];
  }

  getIdentifier(): string {
    return this.message.id.replace(/[^a-z0-9]/gi, '');
  }

  getStatusView(_satutus:string):string
  {
    return this._messageService.getStatusView(_satutus);
  }
}
