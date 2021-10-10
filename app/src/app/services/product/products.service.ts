import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { IBaseModel, IProductModel } from 'src/app/Models';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // Private fields
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  private _errorMessage = new BehaviorSubject<string>('');

  constructor(private _httpClient: HttpClient) {}

  getList() {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const url = `http://localhost:3000/products`;
    return this._httpClient.get<IProductModel[]>(url).pipe(
      catchError((err) => {
        this._errorMessage.next(err);
        console.error('GET LIST', err);
        return of([]);
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  getItemById(id: number): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const url = `http://localhost:3000/products/${id}`;
    return this._httpClient.get<IProductModel>(url).pipe(
      catchError((err) => {
        this._errorMessage.next(err);
        console.error('GET ITEM BY IT', id, err);
        return of({ productID: -1 });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  add(product: IProductModel): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    return this._httpClient
      .post<IProductModel | IBaseModel>(
        `http://localhost:3000/products`,
        product
      )
      .pipe(
        catchError((err) => {
          this._errorMessage.next(err);
          console.error('CREATE product', err);
          return of({ id: undefined });
        }),
        finalize(() => this._isLoading$.next(false))
      );
  }

  
  update(product: IProductModel): Observable<any> {
    const url = `http://localhost:3000/products/${product.id}`;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    return this._httpClient.put(url, product).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('UPDATE product', product, err);
        return of(product);
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }
}
