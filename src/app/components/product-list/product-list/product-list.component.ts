import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { IProduct } from 'src/app/services/product/models/IProduct';
import { ShowWarningAlert } from 'src/app/store/alert/alert.action';
import { AppState } from 'src/app/store/appState';
import { AddToCart, GetProducts } from 'src/app/store/products/products.action';
import { ILineitem } from 'src/app/store/products/products.state';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Select((state: AppState) => state.user?.cart)
  cart$?: Observable<ILineitem[]>;

  cart: ILineitem[];

  @Select((state: AppState) => state.products?.products)
  products$?: Observable<IProduct[]>;

  subs = new Array<Subscription>();

  constructor(private store: Store, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.dispatch(new GetProducts());

    this.subs.push(this.products$.subscribe(res => {
      console.log(res);
    }))

    this.subs.push(this.cart$.subscribe(x => this.cart = x));
  }

  addToCart(product: IProduct) {
    const existInCartAlready = this.cart.some(i => i.product.id === product.id);

    if (existInCartAlready) {
      this.store.dispatch(new ShowWarningAlert('Varen er allerede lagt i kurven!'));
    } else {
      this.store.dispatch(new AddToCart(product));
      //this.openDialog(product);
    }
  }

  // openDialog(product: IProduct) {
  //   this.dialog.open(CartModalComponent, {
  //     height: 'auto',
  //     width: 'auto',
  //     data: { productId: product.id } as DialogData
  //   });
  // }

}
