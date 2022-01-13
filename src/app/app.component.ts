import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth/auth.service';
import { HelpComponent } from './help/help.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Base-App';
  toggleme = true ;
  username = '';
  closeResult = '';


  constructor(  private authService: AuthService, private router: Router, private modalService: NgbModal) {
    this.authService.currentUserOBS.subscribe( x => {
       if (x.token) {
         this.username = x.username;
         this.router.navigate(['home']);
       } else {
       this.router.navigate(['home']);
       }
     });
    }
    toggler(){
      this.toggleme = !this.toggleme ;
    }
    open() {
      this.modalService.open(HelpComponent, {size:'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }
}
