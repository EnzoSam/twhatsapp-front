import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routesPaths, routesParams } from './constants/routes.contants';
import { ChatContainerComponent } from './components/whatsapp/chat-container/chat-container.component';
import { ErrorDefaultComponent } from './components/whatsapp/error-default/error-default.component';
import { HomeComponent } from './components/shares/home/home.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:routesPaths.home,
    pathMatch:'full'
  },
  {
    path:routesPaths.home,
    component:HomeComponent
  },
  {
    path:routesPaths.chat + "/:" + routesParams.contactId,
    component:ChatContainerComponent
  },
  {
    path:'**',
    component:ErrorDefaultComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
