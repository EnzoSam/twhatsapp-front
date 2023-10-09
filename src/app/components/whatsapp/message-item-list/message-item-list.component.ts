import { Component, Input } from '@angular/core';
import { IChat } from 'src/app/models/ichat.interface';

@Component({
  selector: 'app-message-item-list',
  templateUrl: './message-item-list.component.html',
  styleUrls: ['./message-item-list.component.css']
})
export class MessageItemListComponent {

  @Input() chat?:IChat;

  
}
