import { Component, Input } from '@angular/core';
import { IMessage } from 'src/app/models/imessage.interface';

@Component({
  selector: 'app-message-content-text',
  templateUrl: './message-content-text.component.html',
  styleUrls: ['./message-content-text.component.css']
})
export class MessageContentTextComponent {

  @Input() message:IMessage | undefined;
}
