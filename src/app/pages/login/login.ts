import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private auth:AuthService, private router: Router){

  }

  async onLogin(){
    this.errorMessage ='';
    try {
      const success = await this.auth.login(this.email,this.password);
      if(success){
        console.log("login success ::",success);
        this.router.navigate(["/dashboard"]);
      }
    } catch (error) {
      console.log('error for try catch',error);
    }
  }
}
