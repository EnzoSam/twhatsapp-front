import { Component, Input } from '@angular/core';
import { IMessage } from 'src/app/models/imessage.interface';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-message-content-template',
  templateUrl: './message-content-template.component.html',
  styleUrls: ['./message-content-template.component.css']
})
export class MessageContentTemplateComponent {

  @Input() message: IMessage | undefined;

  constructor(private _messageService: MessagesService) {

  }

  download() {
    if (this.message) {
      this._messageService.downloadMessageContent(this.message).subscribe
        (data => {
          const blob = new Blob([data], { type: 'application/octet-stream' });
          const downloadURL = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadURL;
          link.download = this.message?.content.fileName;
          link.click();
          window.URL.revokeObjectURL(downloadURL);
        }, error => {
          console.log(error);
          alert(error);
        }
        );
    }
  }
}
