import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { IProduct } from 'src/app/services/product/models/IProduct';
import { ShowWarningAlert } from 'src/app/store/alert/alert.action';
import { AppState } from 'src/app/store/appState';
import { AddToCart, GetProducts } from 'src/app/store/products/products.action';
import { ILineitem } from 'src/app/store/products/products.state';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Select((state: AppState) => state.user?.cart)
  cart$?: Observable<ILineitem[]>;

  id: number;
  private sub: any;

  product$: Observable<IProduct>;

  subs = new Array<Subscription>();
  cart: ILineitem[];

  constructor(private route: ActivatedRoute, private store: Store, public dialog: MatDialog) { }


  ngOnInit(): void {

    this.store.dispatch(new GetProducts());

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.product$ = this.store.select((state: AppState) => state.products.products.find(x => x.id === this.id));
    })
    this.subs.push(this.cart$.subscribe(x => this.cart = x));
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
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

  // openDialog(product:IProduct) {
  //   this.dialog.open(CartModalComponent, {
  //     height:'auto',
  //     width: 'auto',
  //     data:{productId: product.id} as DialogData
  //   });
  // }

}
