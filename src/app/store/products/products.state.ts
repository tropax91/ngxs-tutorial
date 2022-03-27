import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { first } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/services/product/models/IProduct';
import { ShowSuccessAlert, ShowWarningAlert } from '../alert/alert.action';
import {
  AddToCart,
  GetProducts,
  GetProductsError,
  GetProductsSuccess,
} from './products.action';

export interface ILineitem {
  product: IProduct;
  quantity: number;
}

export interface ProductsStateModel {
  products: IProduct[];
}

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    products: [],
  },
})
@Injectable()
export class ProductState {
  constructor(private productService: ProductService) { }

  @Action(GetProducts)
  getProducts(ctx: StateContext<ProductsStateModel>) {
    this.productService
      .getProducts()
      .pipe(first())
      .subscribe({
        next: (result) => {
          ctx.dispatch(new GetProductsSuccess(result.products));
        },
        error: (error) => {
          ctx.dispatch(new GetProductsError(error));
        },
      });
  }

  @Action(GetProductsSuccess)
  getProductsSuccess(ctx: StateContext<ProductsStateModel>, action: GetProductsSuccess) {
    ctx.patchState({
      products: action.products,
    });
  }

  @Action(GetProductsError) getProductsError(ctx: StateContext<ProductsStateModel>,
    action: GetProductsError
  ) {
    ctx.dispatch(
      new ShowWarningAlert('Error fetching products: ' + action.error.message)
    );
    console.log(action.error.message);
  }
}
