import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from './product/models/IProduct';
import { IGetProductsResult } from './product/results/IGetproductsResult';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = environment.apiUrl + '/products';
  private productUrl = environment.productUrl + '/product';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IGetProductsResult> {
    const headerOptions = new HttpHeaders();
    headerOptions.set('Content-Type', 'aplication/json');

    return this.http.get<IGetProductsResult>(this.productUrl + '/getall');
  }
}
