import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MasterdataService } from '../services/masterdata.service';
import { Customer } from '../_models/lookups';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-quickjob',
  templateUrl: './quickjob.component.html',
  styleUrls: ['./quickjob.component.css']
})
export class QuickjobComponent implements OnInit {
  myControl = new FormControl();
  currentjobcard: any = {};
  newjobcardlist: any[] = [];
  copies = 1 ;
  options: Customer[] = [{id:1,name:'dynamotor electrical'}];
  public searchlist = [];
  public validcode = '';
  public searchcust = false;
  public searchbox: any;
  public motortypes = ['Foot','Flange', 'FootFlange', 'Blower Fan', 'Compressor','Pump','Other']
  constructor(public apiService:MasterdataService,
   private _snackBar: MatSnackBar) {
    this.apiService.jobcardOBS.subscribe(data => {
      if(data) {
        this.currentjobcard = data ;
      }
  }) ;
  if(this.apiService.customersBS.value.length === 0){
    this.apiService.getcustomers();
  }
  this.apiService.customersOBS.subscribe(data => {
    if(data) {
      this.options = data ;
    }
}) ;
   }

  ngOnInit(): void {

  }
custchanged(item: any) {
  this.searchcust = false;
  this.currentjobcard.customernumber = item.name ;
}
makecopyof(countof: number) {
  this.newjobcardlist.length = 0;
  if ( isNaN(this.currentjobcard.jobcardno)) {
    this._snackBar.open('Jobcard No must be a number', 'Cancel' , {
      duration: 2000
    });
    return ;
  }
  // this.currentjobcard.priority = this.currentjobcard.priority === false ? 'Normal' : 'Urgent';
  // this.currentjobcard.quoterequest = this.currentjobcard.quoterequest === 0 ? 0 : 1;
  for (var cof=0; cof<countof; cof++){
      var lclobj = {...this.currentjobcard} ;
      lclobj.jobcardno = (this.currentjobcard.jobcardno && this.currentjobcard.jobcardno < 1000) ?
       ( this.currentjobcard.jobcardno * 1 ) + cof : "";
      this.newjobcardlist.push(lclobj);
  }
  if(this.newjobcardlist.length > 0){
    this.apiService.insertNewjobs(this.newjobcardlist).subscribe(data => {
      alert(data);
    }, error => {
      alert("error" + error.message);
    });
  }
}

}
