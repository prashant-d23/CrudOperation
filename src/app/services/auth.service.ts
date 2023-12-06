import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  baseUrl:string = 'http://localhost:3000/'; //json server url

  httpHeaders:HttpHeaders = new HttpHeaders().set("Content-Type","application/json");


  // Authentication-related methods
  login(username:string, password:string){
    const url = this.baseUrl + 'login';
    const body = {username, password};
    return this.http.post(url,body,{headers:this.httpHeaders});
  }

  token:string | null = "KSHIDLGHE123"
  setToken(token:string):void{
    this.token = token
    sessionStorage.setItem('authToken',token);
  }

  logout(): void {
    this.token = null;
    // Clear the token from storage
    sessionStorage.removeItem('authToken');
  }

  getToken():string | null{
    return this.token || sessionStorage.getItem('authToken');
  }

  isAuthenticated():boolean{
    return !!this.getToken();
  }


}
