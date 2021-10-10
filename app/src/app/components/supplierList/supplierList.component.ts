import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ISupplierModel } from 'src/app/Models';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-supplierList',
  templateUrl: './supplierList.component.html',
  styleUrls: ['./supplierList.component.scss']
})
export class SupplierListComponent implements OnInit {

  supplierList: Array<ISupplierModel> = new Array<ISupplierModel>();

  constructor(
    private supplierService: SupplierService) { }

  ngOnInit() {
    this.supplierService.getList()
    .pipe(finalize(() => {

    }))
    .subscribe((response: any) => {
      this.supplierList = response.sort(function(a :ISupplierModel, b : ISupplierModel) {
        var nameA = a.companyName.toUpperCase();
        var nameB = b.companyName.toUpperCase();
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
