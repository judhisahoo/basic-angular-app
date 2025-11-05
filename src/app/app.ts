import { Component, signal } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet, Event } from '@angular/router';
import { AppStateService } from './services/app-state.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  loading= false;
  protected readonly title = signal('simple-angular');

  constructor(private appState: AppStateService, private router: Router){
    this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationStart) this.loading = true;
      if(event instanceof NavigationEnd ) this.loading = false;
    })
  }
  ngOnInit(){
    this.appState.initFromStorage();
  }
}
