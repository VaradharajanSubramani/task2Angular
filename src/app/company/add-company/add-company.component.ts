import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import {companyModel} from '../../model/companyModel';


@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  currentPage : string; 
  public myForm: FormGroup;
  isSuccess :boolean=false;
  cmpId:any;
  updateFlag:boolean=false;
  saveProcess:boolean=false;
  cmpModel :companyModel;

  constructor( private router: Router, private route: ActivatedRoute,private fb: FormBuilder) { 
    this.route.params.subscribe( params => this.currentPage = params['page']);
    console.log('currentPage: '+ this.currentPage)
    this.cmpModel = new companyModel();
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      companyName: ['', [Validators.required]],
     website:['', [Validators.required]] ,
      contactNo:['', [Validators.required]] ,
      noOfEmployee:[''],     
      headquarters:['', Validators.required],     
      companyId:''
  });
     if(this.currentPage =='edit')
     {
      this.cmpId = localStorage.getItem("editCompanyId");
      var cmpobj = JSON.parse(localStorage.getItem("companyList"));
      var port = cmpobj.filter(x=>x.id ==this.cmpId);
      this.form['companyId'].setValue(port[0].id);      
      this.form['companyName'].setValue(port[0].compayName);
      this.form['website'].setValue(port[0].website);
      this.form['contactNo'].setValue(port[0].contactNo);
      this.form['noOfEmployee'].setValue(port[0].noOfEmployee);
      this.form['headquarters'].setValue(port[0].headquarters);

      this.updateFlag = true;
     }

  }

  get form(){return this.myForm.controls}

  saveCompany(){
    this.isSuccess =true;
    this.saveProcess = true;    
    if (this.myForm.invalid)
    {    
      alert('Enter all the details')
     this.saveProcess = false;
     return;
    }
    var cmpobj = JSON.parse(localStorage.getItem("companyList"));
    if(this.updateFlag == false){
      this.objectCreation();      
      var lastid =  Math.max.apply(Math, cmpobj.map(function(o) { return o.id; }))
      if(this.cmpModel.id != null) {this.cmpModel.id = lastid+1;} else {this.cmpModel.id = 1}
      cmpobj.push(this.cmpModel);
    }else
    {
      this.objectCreation(); 
      const index = cmpobj.findIndex((e) => e.id === parseInt(this.cmpId));
      if (index === -1) {
        cmpobj.push(this.cmpModel);
      } else {
        cmpobj[index] = this.cmpModel;
      }
      
    }
    
    localStorage.setItem("companyList", JSON.stringify(cmpobj));
    this.router.navigate(['companylist']);
 }

 objectCreation()
 {   
      this.cmpModel.id=this.myForm.get('companyId').value
      this.cmpModel.compayName = this.myForm.get('companyName').value
      this.cmpModel.website = this.myForm.get('website').value,
      this.cmpModel.contactNo = this.myForm.get('contactNo').value,
      this.cmpModel.noOfEmployee = this.myForm.get('noOfEmployee').value,
      this.cmpModel.headquarters = this.myForm.get('headquarters').value      
      return this.cmpModel;
 }


 back():void{
  this.router.navigate(['companylist']);
}

}
