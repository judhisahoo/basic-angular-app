import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';

export const nonAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const appState = inject(AppStateService);

  const token = appState.getToken();
  const isLoggedIn = appState.getIsLoggedIn();

  if(!isLoggedIn && !token){
    return true;
  }else{
    router.navigate(["/dashboard"]);
    return false;
  }
};
