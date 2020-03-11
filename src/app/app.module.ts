import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { CompanylistComponent } from './company/companylist/companylist.component';
import { BranchlistComponent } from './branch/branchlist/branchlist.component';
import { BranchAddComponent } from './branch/branch-add/branch-add.component';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,    
    AddCompanyComponent,
    CompanylistComponent,
    BranchlistComponent,
    BranchAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
