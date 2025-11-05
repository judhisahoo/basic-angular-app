import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  user:any;
  constructor(private router:Router,private appState: AppStateService){

  }

  ngOnInit(){
    //let temp = localStorage.getItem("user") ; 
    this.user = this.appState.getUser(); //JSON.parse(temp!) ;
    console.log('this.user :::::',this.user);
  }


  onLogout(){
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
