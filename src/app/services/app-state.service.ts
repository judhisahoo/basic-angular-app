import { computed, Injectable, signal } from "@angular/core";

@Injectable({providedIn:'root'})
export class AppStateService {
  user = signal<any>(null);
  accessToken = signal<string|null>(null);
  refreshToken = signal<string|null>(null);
  isLoggedIn = signal<boolean>(false);

  fullState = computed(()=>({
    user: this.user(),
    token: this.accessToken(),
    refreshToken: this.refreshToken(),
    isLoggedIn:this.isLoggedIn()
  }))

  private get hasLocalStorage():boolean{
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  initFromStorage(){
    if(!this.hasLocalStorage) return;

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if(token && user){
      this.accessToken.set(token);
      this.user.set(JSON.parse(user));
      this.isLoggedIn.set(true);
    }
  }

  setUser(userData:any){
    this.user.set(userData);
    if(this.hasLocalStorage) localStorage.setItem('user',JSON.stringify(userData));
  }

  setToken(token:string){
    this.accessToken.set(token);
    if(this.hasLocalStorage) localStorage.setItem('token',token);
  }

  setRefreshToken(refreshToken:string){
    this.refreshToken.set(refreshToken);
    if(this.hasLocalStorage) localStorage.setItem('refresh_token',refreshToken);
  }

  setIsLoggedIn(isLoggedIn:boolean){
    this.isLoggedIn.set(isLoggedIn);
    
  }

  clearAll(){
    this.user.set(null);
    this.accessToken.set(null);
    this.refreshToken.set(null);
    this.isLoggedIn.set(false);
  }

  getUser(){
    return this.user();
  }

  getToken(){
    return this.accessToken();
  }

  getRefreshToken(){
    return this.refreshToken();
  }

  getIsLoggedIn(){
    return this.isLoggedIn();
  }

  getFullState(){
    return this.fullState();
  }
}