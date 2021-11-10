export class User {
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  cellno: string;
  sundry: string;
  email: string;
  token: string;
  ucemail: string;
  rfqtoken: string;
  userdetail: string;
  theme: string;
  profile: string[];
  constructor() {
  this.username = 'Guest';
  this.firstName = '';
  this.lastName = '';
  this.role = '';
  this.cellno = '';
  this.sundry = '';
  this.email = '';
  this.token = '';
  this.ucemail = '';
  this.rfqtoken = '';
  this.userdetail = '';
  this.profile = [];
  this.theme = '';
  }
}
export class Login {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  pwdshadow: string;
  cellno: string;
  otp: string;
  token: string;
  ucemail: string;
  rfqtoken: string;
  commethod: string;
  processname: string;

  constructor() {
  this.username = '';
  this.firstName = '';
  this.lastName = '';
  this.password = '';
  this.pwdshadow = '';
  this.cellno = '';
  this.otp = '';
  this.token = '';
  this.ucemail = '';
  this.rfqtoken = '';
  this.commethod = '';
  this.processname = 'signin';
  }
}

export interface UserTableItem {
  NAME_FIRST?: string;
  NAME_LAST?: string;
  EMAIL?: string;
  STATUS?: string;
  CELLNO?: string;
  ADD_TELNO?: string;
  CREATED_DATE?: string ;
}

