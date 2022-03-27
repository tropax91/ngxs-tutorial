import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, of, Subscription } from 'rxjs';
import { IProduct } from 'src/app/services/product/models/IProduct';
import { AppState } from 'src/app/store/appState';
import { GetProducts } from 'src/app/store/products/products.action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @Select((state: AppState) => state.products?.products)
  products$?: Observable<IProduct[]>;

  subs = new Array<Subscription>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetProducts());

    this.subs.push(
      this.products$.subscribe((res) => {
        console.log(res);
      })
    );
  }

  // getMembership(): Observable<IProduct> {
  //   return of({
  //     id: 1,
  //     text: 'fghfghgf',
  //     day: 'fghfghfgh',
  //     reminder:true
  //   })
  // }
}
