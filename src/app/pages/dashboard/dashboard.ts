import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  user:any;
  constructor(private router:Router){

  }

  ngOnInit(){
    let temp = localStorage.getItem("user") ; 
    this.user = JSON.parse(temp!) ;
    console.log('this.user :::::',this.user);
  }


  onLogout(){
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
