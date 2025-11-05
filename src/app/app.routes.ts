import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { AboutUs } from './pages/about-us/about-us';
import { EditProfile } from './pages/edit-profile/edit-profile';



export const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:Login,},
  {path:'dashboard',component:Dashboard},
  {path:'about-us',component:AboutUs},
  {path:'edit-profile',component:EditProfile}
];

