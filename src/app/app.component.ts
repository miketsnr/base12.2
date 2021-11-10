import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Base-App';
  toggleme = true ;
  username = '';
  constructor(  private authService: AuthService, private router: Router) {
    this.authService.currentUserOBS.subscribe( x => {
       if (x.token) {
         this.username = x.username;
         this.router.navigate(['home']);
       } else {
       this.router.navigate(['login']);
       }
     });
    }
    toggler(){
      this.toggleme = !this.toggleme ;
    }
}
