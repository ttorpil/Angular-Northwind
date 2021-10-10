import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './components/categoryList/categoryList.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/productList/productList.component';
import { SupplierListComponent } from './components/supplierList/supplierList.component';

const routes: Routes = [
  {
    path: 'Products',
    component: ProductListComponent,
  },
  {
    path: 'Suppliers',
    component: SupplierListComponent,
  },
  {
    path: 'Categories',
    component: CategoryListComponent,
  },
  {
    path: 'Product',
    component: ProductComponent,
  },
  {
    path: 'Product/:productID',
    component: ProductComponent,
  },
  {
    path: '',
    redirectTo: 'Products',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'Products',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
