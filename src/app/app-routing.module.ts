import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanylistComponent } from './company/companylist/companylist.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { BranchlistComponent } from './branch/branchlist/branchlist.component';
import { BranchAddComponent } from './branch/branch-add/branch-add.component';


const routes: Routes = [
  {path:'companylist', component:CompanylistComponent },
  {path:'company/:page',component:AddCompanyComponent},
  {path:'',redirectTo:'companylist',pathMatch:'full'},
  {path:'branchlist',component:BranchlistComponent},
  {path:'branch/:page',component:BranchAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
