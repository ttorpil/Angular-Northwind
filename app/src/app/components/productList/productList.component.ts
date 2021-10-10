import { Component, OnInit } from '@angular/core';
import { IProductModel } from 'src/app/Models';
import { ProductsService } from 'src/app/services/product/products.service';

@Component({
  selector: 'app-productList',
  templateUrl: './productList.component.html',
  styleUrls: ['./productList.component.scss']
})
export class ProductListComponent implements OnInit {
  prodcutList: Array<IProductModel> = new Array<IProductModel>();

  constructor(
    private productService : ProductsService,) { }

  ngOnInit(): void {
    this.productService.getList()
    .subscribe((response: any) => {
      this.prodcutList = response.sort(function(a :IProductModel, b : IProductModel) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }, error => {

    });
  }

}
