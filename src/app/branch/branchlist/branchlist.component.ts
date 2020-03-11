import { Component, OnInit } from '@angular/core';
import {branchModel} from '../../model/branchModel';
import { Router } from "@angular/router";

@Component({
  selector: 'app-branchlist',
  templateUrl: './branchlist.component.html',
  styleUrls: ['./branchlist.component.css']
})
export class BranchlistComponent implements OnInit {

  branchList:branchModel[];
 

  constructor(private router:Router) { }

  ngOnInit() {
    var brobj = JSON.parse(localStorage.getItem("branchList"));
  
    if(brobj== null){
    this.branchList = [
      {id:1, companyId:1, compayName:'ABC ltd',branchName:'Branch1',address:'address',city:'chennai',state:'TN',country:'India',telephone:2323232}      
    ]

    localStorage.setItem("branchList", JSON.stringify(this.branchList));
  }
  else{
    this.branchList = brobj;
  }

  }

  addBranch():void
  {
    
    this.router.navigate(['branch/create']);
  }

  editBranch(id:number):void{
    localStorage.setItem("editbranchId", id.toString());
    this.router.navigate(['branch/edit']);
  }

  deleteBranch(id:number):void{
    
    const index = this.branchList.findIndex((e) => e.id === id);
    if (index > -1) {
    this.branchList.splice(index, 1);
    localStorage.setItem("branchList", JSON.stringify(this.branchList));
   }
  }

}
