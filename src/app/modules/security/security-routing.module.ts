import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routesPaths, routesParams } from './constants/routes.contants';

const routes: Routes = [
  {
    path:'',
    redirectTo:routesPaths.home,
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
