import {  inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const appState = inject(AppStateService);

  const isLoggedIn = appState.getIsLoggedIn();
  const token = appState.getToken();

  if(isLoggedIn && token){
    return true
  }else{
    router.navigate(["/login"]);
    return false;
  }
};
