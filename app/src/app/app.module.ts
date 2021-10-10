import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupplierListComponent } from './components/supplierList/supplierList.component';
import { CategoryListComponent } from './components/categoryList/categoryList.component';
import { ProductListComponent } from './components/productList/productList.component';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  declarations: [				
    AppComponent,
      ProductListComponent,
      ProductComponent,
      SupplierListComponent,
      CategoryListComponent
   ],
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
