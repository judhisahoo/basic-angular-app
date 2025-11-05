import { Injectable } from '@angular/core';
import { AppStateService } from './app-state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private apiUrl = "https://api.escuelajs.co/api/v1";; // demo login API

    constructor(private appState: AppStateService){
      
    }

    async login(email:string, password:string){
      try {
        const bodyObj = JSON.stringify({
          email:email,
          password:password
        });
        const response = await fetch(`${this.apiUrl}/auth/login`,{
          method:"POST",
          headers:{
            "Content-type":"application/json"
          },
          body:bodyObj
        });
        console.log('login response :::',response);
        if(!response.ok){
          console.log("Invalid user data");
          return false;
        }
        
        const data = await response.json();
        console.log('login response data :::',data);
        const {access_token,refresh_token} = data;
        localStorage.setItem('token',access_token);
        localStorage.setItem('refreshToken',refresh_token);
        this.appState.setToken(access_token);
        this.appState.setRefreshToken(refresh_token);
        
        const userData = await this.getUser();
        console.log('get userData ::',userData);
        localStorage.setItem('user',JSON.stringify(userData));
        this.appState.setUser(userData);
        this.appState.setIsLoggedIn(true);

        return true;
      } catch (error) {
        console.log('error in try catch',error);
        return false;
      }
    }

    async getUser(){
      const response  = await fetch(`${this.apiUrl}/auth/profile`,{
        method:"GET",
        headers:{
          "Content-type":"application/json",
          "Authorization":"Bearer "+this.appState.getToken()
        }
      });

      if(!response.ok){
        console.log('invalid token');
        return false;
      }

      return await response.json();
    }

    logout(){
      localStorage.clear();
      this.appState.clearAll();
    }
}
