import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm ={
    username: '',
    password: ''
  }
  constructor(private userService: UserService,
    private authService: AuthService,
    private enrutador: Router) { }

  ngOnInit(): void {
    this.authService.updateState();
    if(this.authService.loginState){
      this.enrutador.navigate(["/libro"]);
    }
  }

  Login(){
    this.userService.login(this.loginForm)
    .subscribe(
      respuesta=>{
        if(respuesta.proceso){
          //Logeado, respuesta.user
          this.authService.setUser(respuesta.user)
          this.enrutador.navigate(["/libro"]);
        }else{
          alert(respuesta.err);
        }
      },
      error=>{
        console.log("error: ", error)
      }
      )
  }

}
