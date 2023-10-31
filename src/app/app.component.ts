import { Component, OnDestroy, OnInit } from '@angular/core';
import { UiService } from './services/ui.service';
import { Subscription } from 'rxjs';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'twhatsapp-front';

  ready = false;
  suscriptionUI?: Subscription;
  constructor(private _uiService:UiService,
    private _chatService:ChatService){
    this.suscriptionUI = this._uiService.getObservableState().subscribe
    (state=>{
      if(state && state.ready){
        this.ready =true;
      }
    });
  
  }
  ngOnDestroy(): void {
    if(this.suscriptionUI)
      this.suscriptionUI.unsubscribe();
  }
  ngOnInit(): void {
  

  }
}
