import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from './envirorments/envirorments'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageListLateralPanelComponent } from './components/whatsapp/message-list-lateral-panel/message-list-lateral-panel.component';
import { MessageItemListComponent } from './components/whatsapp/message-item-list/message-item-list.component';
import { ChatContainerComponent } from './components/whatsapp/chat-container/chat-container.component';
import { FirebaseService } from './services/firebase.service';
import { MessagesService } from './services/messages.service';
import {  HttpClientModule } from '@angular/common/http';
import { ErrorDefaultComponent } from './components/whatsapp/error-default/error-default.component';
import { MessageComponent } from './components/whatsapp/message/message.component';
import { HomeComponent } from './components/whatsapp/home/home.component';
import { ChatService } from './services/chat.service';
import { ContactService } from './services/contact.service';
import { ChangeService } from './services/change.service';


@NgModule({
  declarations: [
    AppComponent,
    MessageListLateralPanelComponent,
    MessageItemListComponent,
    ChatContainerComponent,
    ErrorDefaultComponent,
    MessageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [FirebaseService, 
    MessagesService, 
    ChatService, 
    ContactService,
    ChangeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
