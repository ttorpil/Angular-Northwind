import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ICategoryModel } from 'src/app/Models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // Private fields
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  private _errorMessage = new BehaviorSubject<string>('');

  constructor(private _httpClient: HttpClient) {}

  // Getters
  getList() {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const url = `http://localhost:3000/Categories`;
    return this._httpClient.get<ICategoryModel[]>(url).pipe(
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
    return this._httpClient.get<ICategoryModel>(url).pipe(
      catchError((err) => {
        this._errorMessage.next(err);
        console.error('GET ITEM BY IT', id, err);
        return of({ productID: -1 });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }
}
