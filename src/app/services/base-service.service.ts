import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../envirorments/envirorments";

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  apiUrl:string;
  headers;
  protected defaultApiNameSpace:string = '';

  constructor(protected _http: HttpClient) { 
    this.apiUrl = environment.baseApiUrl;
    this.headers = new HttpHeaders().set('Content-Type','application/json');    
  }

}
