import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import {companyModel} from '../../model/companyModel';
import {branchModel} from '../../model/branchModel';

@Component({
  selector: 'app-branch-add',
  templateUrl: './branch-add.component.html',
  styleUrls: ['./branch-add.component.css']
})
export class BranchAddComponent implements OnInit {

  currentPage : string; 
  public myForm: FormGroup;
  isSuccess :boolean=false;
  brId:any;
  updateFlag:boolean=false;
  saveProcess:boolean=false;
  cmpModel :companyModel;
  brModel :branchModel;
  constructor(private router: Router, private route: ActivatedRoute,private fb: FormBuilder) { 
    this.route.params.subscribe( params => this.currentPage = params['page']);
    console.log('currentPage: '+ this.currentPage)   
    this.brModel = new branchModel();
  }

  ngOnInit() {
    this.cmpModel = JSON.parse(localStorage.getItem("companyList"));

    this.myForm = this.fb.group({
      companyName: ['', [Validators.required]],
      branchName: ['', [Validators.required]],
      address:['', [Validators.required]] ,
      city:['', [Validators.required]] ,
      state:[''],     
      country:['', Validators.required],
      telephone:['', Validators.required],       
      branchId:''
  });

  if(this.currentPage =='edit')
  {
    this.brId = localStorage.getItem("editbranchId");
    var brobj = JSON.parse(localStorage.getItem("branchList"));
    var port = brobj.filter(x=>x.id ==this.brId);
    this.form['branchId'].setValue(port[0].id);
    this.form['branchName'].setValue(port[0].branchName);
    this.form['companyName'].setValue(port[0].companyId);
    this.form['address'].setValue(port[0].address);
    this.form['city'].setValue(port[0].city);
    this.form['state'].setValue(port[0].state);
    this.form['country'].setValue(port[0].country);
    this.form['telephone'].setValue(port[0].telephone);

    this.updateFlag = true;
  }

  }

  get form(){return this.myForm.controls}

  back():void{
    this.router.navigate(['branchlist']);
  }

  saveBranch(){
    this.isSuccess =true;
    this.saveProcess = true;    
    if (this.myForm.invalid)
    {    
      alert('Enter all the details')
     this.saveProcess = false;
     return;
    }
    var brObj = JSON.parse(localStorage.getItem("branchList"));
    if(this.updateFlag == false){
      this.objectCreation();      
      var lastid =  Math.max.apply(Math, brObj.map(function(o) { return o.id; }))
      if(this.brModel.id != null) {this.brModel.id = lastid+1;} else {this.brModel.id = 1}
      brObj.push(this.brModel);
    }else
    {
      this.objectCreation(); 
      const index = brObj.findIndex((e) => e.id === parseInt(this.brId));
      if (index === -1) {
        //brObj.push(this.brModel);
      } else {
        brObj[index] = this.brModel;
      }
      
    }
    
    localStorage.setItem("branchList", JSON.stringify(brObj));
    this.router.navigate(['branchlist']);

  }

  objectCreation()
  {   
       this.brModel.id=this.myForm.get('branchId').value,
       this.brModel.companyId=this.myForm.get('companyName').value,
      // this.brModel.compayName = this.myForm.get('companyName').value
       this.brModel.address = this.myForm.get('address').value,
       this.brModel.city = this.myForm.get('city').value,
       this.brModel.state = this.myForm.get('state').value,
       this.brModel.country = this.myForm.get('country').value  
       this.brModel.telephone = this.myForm.get('telephone').value        
       return this.brModel;
  }

}
