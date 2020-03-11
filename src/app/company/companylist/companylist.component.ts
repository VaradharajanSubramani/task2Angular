import { Component, OnInit } from '@angular/core';
import {companyModel} from '../../model/companyModel';
import { Router } from "@angular/router";

@Component({
  selector: 'app-companylist',
  templateUrl: './companylist.component.html',
  styleUrls: ['./companylist.component.css']
})
export class CompanylistComponent implements OnInit {

  companyList:companyModel[];

  constructor(private router:Router) { }

  ngOnInit() {
    var cmpobj = JSON.parse(localStorage.getItem("companyList"));
    if(cmpobj== null){
    this.companyList = [
      {id:1,compayName:'ABC ltd',contactNo:'12456',website:'www.abc.com',noOfEmployee:100,headquarters:'USA'},
      {id:2,compayName:'xyz',contactNo:'124563',website:'www.xyz.com',noOfEmployee:500,headquarters:'UK'}
    ]

    localStorage.setItem("companyList", JSON.stringify(this.companyList));
  }
  else{
    this.companyList = cmpobj;
  }
  }

  addCompany():void
  {
    
    this.router.navigate(['company/create']);
  }

  editCompany(id:number):void{
    localStorage.setItem("editCompanyId", id.toString());
    this.router.navigate(['company/edit']);
  }

  deleteCompany(id:number):void{
    
    const index = this.companyList.findIndex((e) => e.id === id);
    if (index > -1) {
    this.companyList.splice(index, 1);
    localStorage.setItem("companyList", JSON.stringify(this.companyList));
   }
   

  }


}
