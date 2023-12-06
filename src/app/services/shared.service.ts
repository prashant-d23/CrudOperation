import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient) { }


  baseUrl:string = 'http://localhost:3000/'; //json server url

  httpHeaders:HttpHeaders = new HttpHeaders().set("Content-Type","application/json");



  getDataFromServer(endPoint:string){
    const url = this.baseUrl + endPoint;
    return this.http.get(url,{headers:this.httpHeaders})
  };

  postDataToServer(endPoint:string, body:any){
    const url = this.baseUrl + endPoint;
    return this.http.post(url,body,{headers:this.httpHeaders})
  };

  updateDataToServer(endPoint:string, body:any){
    const url = this.baseUrl + endPoint;
    return this.http.put(url,body,{headers:this.httpHeaders})
  };

  deleteDataFromServer(endPoint:string){
    const url = this.baseUrl + endPoint;
    return this.http.delete(url);
  };

  isLoggedin:boolean = false;
}
