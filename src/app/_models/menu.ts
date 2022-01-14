export interface MenuItem {
  itemno: string;
  menutxt: string;
  nextmenu?: string;
  page?: string;
}

export interface MenuGroup {
  menuname: string;
  menu: MenuItem[];
}

export interface JobSearch {
  jobno: string;
  customer: string;
}
