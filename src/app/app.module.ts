import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from './envirorments/envirorments'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatListLateralPanelComponent } from './components/whatsapp/chat-list-lateral-panel/chat-list-lateral-panel.component';
import { MessageItemListComponent } from './components/whatsapp/chat-item-list/chat-item-list.component';
import { ChatContainerComponent } from './components/whatsapp/chat-container/chat-container.component';
import { FirebaseService } from './services/firebase.service';
import { MessagesService } from './services/messages.service';
import {  HttpClientModule } from '@angular/common/http';
import { ErrorDefaultComponent } from './components/whatsapp/error-default/error-default.component';
import { MessageComponent } from './components/whatsapp/message/message.component';
import { HomeComponent } from './components/shares/home/home.component';
import { ChatService } from './services/chat.service';
import { ContactService } from './services/contact.service';
import { ChangeService } from './services/change.service';

import { initializeApp } from "firebase/app";
import { MessageContentTextComponent } from './components/whatsapp/message-content-text/message-content-text.component';
import { MessageContentTemplateComponent } from './components/whatsapp/message-content-template/message-content-template.component';
import { SenderComponent } from './components/whatsapp/sender/sender.component';
import { UiService } from './services/ui.service';

initializeApp(environment.firebaseConfigHosting);

@NgModule({
  declarations: [
    AppComponent,
    ChatListLateralPanelComponent,
    MessageItemListComponent,
    ChatContainerComponent,
    ErrorDefaultComponent,
    MessageComponent,
    HomeComponent,
    MessageContentTextComponent,
    MessageContentTemplateComponent,
    SenderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [FirebaseService,     
    UiService,
    ContactService,
    ChatService,  
    MessagesService,
    ChangeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
