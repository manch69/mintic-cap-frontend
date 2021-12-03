import { Injectable } from '@angular/core';

const USER_KEY = "UserKey"
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginState = false;
  constructor() { }

  updateState(){
    var user = this.getUser();
    if(user){
      this.loginState=true
    }else{
      this.loginState=false
    }
    return user;
  }

  setUser(user: any){
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY,JSON.stringify(user));
  }

  getUser(){
    return sessionStorage.getItem(USER_KEY);
  }

  LogOut(){
    sessionStorage.removeItem(USER_KEY);
  }

}
