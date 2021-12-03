import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularCrud';
  loginState=false;

  constructor(private authService: AuthService){
    this.authService.updateState();
    this.loginState = this.authService.loginState;
    //if(this.authService.loginState){}
  }
  LogOut(){
    this.authService.LogOut();
    this.authService.updateState();
    this.loginState = this.authService.loginState;
  }
  refreshComponent(){
    this.authService.updateState();
    this.loginState = this.authService.loginState;
  }
}
