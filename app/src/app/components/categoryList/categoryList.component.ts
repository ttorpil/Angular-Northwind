import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ICategoryModel } from 'src/app/Models';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-categoryList',
  templateUrl: './categoryList.component.html',
  styleUrls: ['./categoryList.component.scss']
})
export class CategoryListComponent implements OnInit {

  categoryList: Array<ICategoryModel> = new Array<ICategoryModel>();

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getList()
    .pipe(finalize(() => {

    }))
    .subscribe((response: any) => {
      this.categoryList = response.sort(function(a :ICategoryModel, b : ICategoryModel) {
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
