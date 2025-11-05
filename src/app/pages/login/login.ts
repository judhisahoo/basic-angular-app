import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  //email = '';
  //password = '';
  loginForm!:FormGroup;
  errorMessage = '';
  isSubmitting = false;

  constructor(private auth:AuthService, private router: Router, private fb:FormBuilder ){

  }

  ngOnInit(){
    this.loginForm= this.fb.group({
      email: ["",[Validators.required,Validators.email]],
      password: ["",[Validators.required,Validators.minLength(6)]]
    });
  }

  get f(){
    return this.loginForm.controls;
  }

  async onLogin(){
    this.errorMessage ='';

    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fix validation errors before submitting.';
      return;
    }

    this.isSubmitting = true;
    const { email, password } = this.loginForm.value;

    try {
      const success = await this.auth.login(email,password);
      if(success){
        console.log("login success ::",success);
        this.router.navigate(["/dashboard"]);
      }else{
        this.errorMessage="Invalid credentials entered.";
        this.resetForm();
      }
    } catch (error) {
      console.log('error for try catch',error);
    }
  }

  private resetForm(){
    this.loginForm.reset();
    this.isSubmitting = false;
  }
}
