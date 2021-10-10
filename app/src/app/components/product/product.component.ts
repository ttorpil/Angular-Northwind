import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ICategoryModel, IProductModel, ISupplierModel } from 'src/app/Models';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductsService } from 'src/app/services/product/products.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

const EMPTY_PRODUCT: IProductModel = {
  id: undefined,
  supplierID: undefined,
  categoryID: undefined,
  quantityPerUnit: "",
  unitPrice: 0,
  unitsInStock: 0,
  discontinued: false,
  name: ""
};

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @ViewChild('prodctForm') prodctForm!: NgForm;
  product: IProductModel = EMPTY_PRODUCT;
  productID: number = 0;

  formInValid = false;

  categories: ICategoryModel[] = [];
  suppliers: ISupplierModel[] = [];
  
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private productsService: ProductsService,
    private categoryService : CategoryService,
    private supplierService: SupplierService) { }

  ngOnInit() {
    const sb = this._route.paramMap.pipe(
      switchMap(params => {
        // get id from URL
        this.productID = Number(params.get('productID'));
        
        if (this.productID || this.productID > 0) {
          return this.productsService.getItemById(this.productID);
        }
        return of(EMPTY_PRODUCT);
      }),
      catchError((errorMessage) => {
        //this.errorMessage = errorMessage;
        return of(undefined);
      }),
    ).subscribe((res: IProductModel | any) => {
      if (!res) {
        this._router.navigate(['/products'], { relativeTo: this._route });
      }
      
      this.product = res;
      
    });

     this.supplierService.getList().subscribe(res=> {
      this.suppliers = res;
    });

    this.categoryService.getList().subscribe(res=> {
     this.categories = res;
   });
  }


  addOrUpdate() {

    if (this.prodctForm.valid ) {


      if(this.productID){
        this.productsService.update(this.product).subscribe(res =>{
          this.prodctForm.resetForm();
          alert('Malzeme Güncellendi');
        })
      }
      else{
        this.productsService.add(this.product).subscribe(res =>{
          this.prodctForm.resetForm();
          alert('Malzeme Eklendi');
        })
      }
      

      // this._router.navigateByUrl('/');
    } else {
      this.formInValid = true;
    }
  }
}
