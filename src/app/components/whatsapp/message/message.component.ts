import { Component, Input } from '@angular/core';
import { IChange } from 'src/app/models/ichange.interface';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  @Input() message:any;

  sended():boolean
  {
    return this.message.changes.find((c: IChange)=>c.status === 'sent') != null;
  }

  delivered():boolean
  {
    return this.message.changes.find((c: IChange)=>c.status === 'delivered') != null;
  }  

  readed():boolean
  {
    return this.message.changes.find((c: IChange)=>c.status === 'read') != null;
  }   

  error():boolean
  {
    return this.message.changes.find((c: IChange)=>c.status === 'failed') != null;
  }   

  lastStatus():string
  {
    let lastChange = this.message.changes[this.message.changes.length - 1];
    return lastChange? lastChange.status : 'delivered';
  }

  showStatus():void
  {
    let m = '';
      for(let c of this.message.changes)
      {
        if(c.text)
            m+=c.text + '\n';
      }

      if(m !== '')
        alert(m);
  }
}
