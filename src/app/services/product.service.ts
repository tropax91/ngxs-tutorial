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
  private taskTrackerUrl = environment.taskTrackerUrl;

  constructor(private http: HttpClient) { }

  // getProducts(): Observable<IGetProductsResult> {
  //   // const headerOptions = new HttpHeaders();
  //   // headerOptions.set('Content-Type', 'aplication/json');

  //   // return this.http.get<IGetProductsResult>(
  //   //   this.taskTrackerUrl + '/TaskTrackers'
  //   // );

  // }

  getProducts(): Observable<IGetProductsResult> {
    // TODO: slet nedenstående testdata og benyt rigtig service fra backend når den er klar
    const mockProduct1 = {
      id: 1,
      name: 'Drone Training',
      price: 1000,
      description: 'Drone training leveret af Dekra',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0211/3966/products/IMG_8124_540x.jpg?v=1609234590',
    } as IProduct;

    const mockProduct2 = {
      id: 2,
      name: 'Mini 2',
      price: 3.599,
      description: 'Drone training leveret af Dekra',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0211/3966/products/Side-View-in-Static_Global-Version_540x.jpg?v=1604598444',
    } as IProduct;

    const mockProduct3 = {
      id: 3,
      name: 'DJI FPV Drone Combo',
      price: 10.499,
      description: 'Drone training leveret af Dekra',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0211/3966/products/DJI-FPV-Drone_1_83371571-9a30-4133-b226-16d31d5d880b_540x.jpg?v=1614777795',
    } as IProduct;

    const mockProduct4 = {
      id: 4,
      name: 'Drone Thunder Glow',
      price: 249,
      description: 'Drone training leveret af Dekra',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0211/3966/products/DJI-FPV-Drone_1_83371571-9a30-4133-b226-16d31d5d880b_540x.jpg?v=1614777795',
    } as IProduct;

    const mockProduct5 = {
      id: 5,
      name: 'Drone Training',
      price: 1000,
      description: 'Drone training leveret af Dekra',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0211/3966/products/IMG_8124_540x.jpg?v=1609234590',
    } as IProduct;

    return of({
      products: [
        mockProduct1,
        mockProduct2,
        mockProduct3,
        mockProduct4,
        mockProduct5,
      ],
    });
    // End testdata
  }
}
