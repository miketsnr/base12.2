import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../_models/lookups';
import { JobSearch, MenuGroup } from '../_models/menu';
export class NetworkNode {
  id: number = 0;
  collection: string = '';
  category: string = '';
  item: string = '';
  parent: number = 0;
  isselected: boolean = false;
  subcontract: string = '';
  specs: string = '';
  cost: number = 0;
  surcharge: number = 0;
  discount: number = 0;
  lineprice: number = 0;
  constructor() {
    this.id = 0;
    this.collection = '';
    this.category = '';
    this.item = '';
    this.parent = 0;
    this.isselected = false;
    this.subcontract = '';
    this.specs = '';
    this.cost = 0;
    this.surcharge = 0;
    this.discount = 0;
  }
}

/** Flat to-do item node with expandable and level information */
export class NetworkTreeNode extends NetworkNode {
  children?: NetworkTreeNode[] = [];
  constructor() {
    super();
    this.children = [];
  }
}

@Injectable({
  providedIn: 'root'
})
export class MasterdataService {
  rawdata = [{ id: 1, collection: 'tasks', category: "Collection", item: "", parent: 0, isselected: false },
  { id: 2, collection: 'tasks', category: "Collection", item: 'Decommission', parent: 1, isselected: false },
  { id: 3, collection: 'tasks', category: "Collection", item: "Disconnection", parent: 1, isselected: false },
  { id: 4, collection: 'tasks', category: "Preparation", item: "", parent: 0, isselected: false },
  { id: 5, collection: 'tasks', category: "Preparation", item: 'Remove Tight Pulley', parent: 4, isselected: false },
  { id: 6, collection: 'tasks', category: "Preparation", item: "Dismantle Pump", parent: 4, isselected: false },
  { id: 7, collection: 'tasks', category: "Preparation", item: "Sandblasting", parent: 4, isselected: false },
  { id: 8, collection: 'tasks', category: "Preparation", item: "HP Cleaning - Sanitize", parent: 4, isselected: false },
  { id: 9, collection: 'tasks', category: "Refurbish Winding", item: "", parent: 0, isselected: false },
  { id: 10, collection: 'tasks', category: "Refurbish Winding", item: 'Full Strip Rewind Varnish Bake', parent: 9, isselected: false },
  { id: 11, collection: 'tasks', category: "Refurbish Winding", item: "Replace Leads Revarnish Bake", parent: 9, isselected: false },
  { id: 12, collection: 'tasks', category: "Refurbish Winding", item: "Revarnish Bake", parent: 9, isselected: false },
  { id: 13, collection: 'tasks', category: "Refurbish Winding", item: "Wash Windings and Bake", parent: 9, isselected: false },
  { id: 14, collection: 'tasks', category: "Spares ", item: "", parent: 0, isselected: false },
  { id: 15, collection: 'tasks', category: "Spares", item: 'Bearings', parent: 14, isselected: false },
  { id: 16, collection: 'tasks', category: "Spares", item: "Cooling Fan", parent: 14, isselected: false },
  { id: 17, collection: 'tasks', category: "Spares", item: "Pump Spares", parent: 14, isselected: false },
  { id: 18, collection: 'tasks', category: "Spares", item: "Brake", parent: 14, isselected: false },
  { id: 19, collection: 'tasks', category: "Machining & Balancing ", item: "", parent: 0, isselected: false },
  { id: 20, collection: 'tasks', category: "Machining & Balancing", item: 'Shaft Rebuild', parent: 19, isselected: false },
  { id: 21, collection: 'tasks', category: "Machining & Balancing", item: "Bearing Journals", parent: 19, isselected: false },
  { id: 22, collection: 'tasks', category: "Machining & Balancing", item: "Specialised Welding", parent: 19, isselected: false },
  { id: 23, collection: 'tasks', category: "Machining & Balancing", item: "Balancing", parent: 19, isselected: false },
  { id: 24, collection: 'tasks', category: "Reinstate", item: "", parent: 0, isselected: false },
  { id: 25, collection: 'tasks', category: "Reinstate", item: 'Delivery', parent: 24, isselected: false },
  { id: 26, collection: 'tasks', category: "Reinstate", item: "Reconnect", parent: 24, isselected: false },
  { id: 27, collection: 'tasks', category: "Reinstate", item: "Testing under Load", parent: 24, isselected: false },
  { id: 28, collection: 'tasks', category: "Reinstate", item: "Rigging", parent: 24, isselected: false },
  ]
  treedata: NetworkTreeNode[] = this.buildTree('tasks', 0);
  jobcardBS = new BehaviorSubject<any>(null);
  jobcardOBS = this.jobcardBS.asObservable();

  openjobcardsBS = new BehaviorSubject<any>(null);
  openjobcardsOBS = this.openjobcardsBS.asObservable();
  customersBS = new BehaviorSubject<Customer[]>([]);
  customersOBS = this.customersBS.asObservable();
  // apiurl = 'https://api.mikethomson.biz';
  apiurl = 'http://localhost:55';
  constructor(private http: HttpClient) {
    this.buildMenu();
    this.currentMenu = this.basemenu[0];
  }

  private basemenu: MenuGroup[] = [];
  public currentMenu: MenuGroup;
  public currentJob: JobSearch  = {jobno:'', customer:''};

  buildMenu() {
    const entrypoint = {
      menuname: 'entrypoint',
      menu: [{ itemno: '1', menutxt: 'Jobs', nextmenu: 'base' },
      { itemno: '2', menutxt: 'Contacts', nextmenu: 'isolate' },

      { itemno: '4', menutxt: 'Quotes', page: 'quotes' },
      { itemno: '3', menutxt: 'Wire Calc', page: 'calcs' },
      ]
    };
    this.basemenu.push(entrypoint);
    const base = {
      menuname: 'base',
      menu: [{ itemno: '1', menutxt: 'Jobcards', page: 'jobcard' },
      { itemno: '2', menutxt: 'Open Jobs', page: 'openjobs' },
      { itemno: '3', menutxt: 'Spares', nextmenu: 'spares' },
      { itemno: '4', menutxt: 'Test Reports', nextmenu: 'tests' },
      { itemno: '5', menutxt: 'Send SMS', page: 'sendsms' },
      { itemno: '6', menutxt: 'Exit', nextmenu: 'entrypoint' }
      ]
    };
    this.basemenu.push(base);
    const bookins = {
      menuname: 'bookins',
      menu: [{ itemno: '1', menutxt: 'Appearance', page: 'jobcards' },
      { itemno: '2', menutxt: 'Request', nextmenu: 'bookins' },
      { itemno: '3', menutxt: 'Cause', nextmenu: 'spares' },
      { itemno: '4', menutxt: 'Photo', nextmenu: 'tests' },
      { itemno: '5', menutxt: 'Back to Previous', nextmenu: 'base' }
      ]
    };
    this.basemenu.push(bookins) ;
    const isolate = {
      menuname: 'isolate',
      menu: [{ itemno: '1', menutxt: 'Back',  nextmenu: 'entrypoint' }
      ]
    };
    this.basemenu.push(isolate) ;
  }

  setMenu(menuname: string) {
    this.currentMenu = this.basemenu.find(menitem => {
      return menitem.menuname === menuname;
    }) as MenuGroup ;
    }


  buildTree(collection: string = 'tasks', node: number): NetworkTreeNode[] {
    const tarray = this.rawdata.filter(element => {
      return element.collection === collection && element.parent === node;
    });
    const nettree: NetworkTreeNode[] = [];
    tarray.forEach(ele => {
      // let nettreenode = new NetworkTreeNode();
      let nettreenode = new NetworkTreeNode();
      Object.keys(ele).forEach((key) => {
        (nettreenode as any)[key] = (ele as any)[key]
      })
      nettreenode.children = this.buildTree(ele.collection, ele.id);
      nettree.push(nettreenode);
    })
    return nettree;
  }

  getsinglejob(jobcardno: number) {

    const params = new HttpParams()
      .set('code', 'jobcarddetail')
      .set('whe', "jobcardno='" + jobcardno + "'")
    this.http.get<any>( this.apiurl + "/util/processcode/", { params })
      .subscribe(data => {
        this.jobcardBS.next(data.data.list[0]);
      });
  }
  getcustomers() {

    const params = new HttpParams()
      .set('code', 'get_customers')
      .set('whe', "id > 0" )
    this.http.get<any>( this.apiurl +  "/util/processcode/", { params })
      .subscribe(data => {
        this.customersBS.next(data.data.list);
      });
  }

  updatejobcard(jobcardno: number) {

  }

  getOpenjobs(){

    const params = new HttpParams()
    .set('code', 'open_jobcards')
    .set('whe', "( invoice IS NULL  or invoice = '' ) and datebooked > '2021-01-01'")
  this.http.get<any>(  this.apiurl + "/util/processcode/", { params })
    .subscribe(data => {
      this.openjobcardsBS.next(data.data.list);
    });

  }

  insertNewjobs(jobs:any[]): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer 123456',
        Accept: 'application/json'
      })
    };
    const outputobj = {
      table: '',
      data: <any>[]
    };
    outputobj.table = 'tbl_jobcards';
    outputobj.data = [...jobs];
    alert(JSON.stringify(outputobj.data));
   return this.http.post( this.apiurl + '/util/postit', outputobj, httpOptions);

  }
}
