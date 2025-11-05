import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { AboutUs } from './pages/about-us/about-us';
import { EditProfile } from './pages/edit-profile/edit-profile';
import { nonAuthGuard } from './guards/non-auth-guard';
import { authGuard } from './guards/auth-guard';



export const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},


  //public routes
  {
    path:'login',
    //component:Login,
    loadComponent:()=>import('./pages/login/login').then(m=>m.Login),
    canActivate:[nonAuthGuard]
  },
  {
    path:'about-us',
    //component:AboutUs,
    loadComponent:()=>import('./pages/about-us/about-us').then(m=>m.AboutUs),
    canActivate:[nonAuthGuard]
  },


  //private routes
  {
    path:'dashboard',
    loadComponent: ()=> import('./pages/dashboard/dashboard').then(m=>m.Dashboard),
    canActivate:[authGuard]
  },
  {
    path:'edit-profile',
    //component:EditProfile,
    loadComponent:()=>import('./pages/edit-profile/edit-profile').then(m=>m.EditProfile),
    canActivate:[authGuard]
  },

  //fallback
  {path:'**',redirectTo:'login'}
];

