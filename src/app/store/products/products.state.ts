import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { first } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/services/product/models/IProduct';
import { ShowSuccessAlert } from '../alert/alert.action';
import {
  AddToCart,
  EmptyCart,
  GetProducts,
  GetProductsError,
  GetProductsSuccess,
  RemoveFromCart,
} from './products.action';

export interface ILineitem {
  product: IProduct;
  quantity: number;
}

export interface ProductsStateModel {
  products: IProduct[];
  cart: ILineitem[];
}

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    products: [],
    cart: [],
  },
})
@Injectable()
export class ProductState {
  constructor(private productService: ProductService) {}

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
  getProductsSuccess(
    ctx: StateContext<ProductsStateModel>,
    action: GetProductsSuccess
  ) {
    ctx.patchState({
      products: action.products,
    });
  }

  @Action(GetProductsError)
  getProductsError(
    ctx: StateContext<ProductsStateModel>,
    action: GetProductsError
  ) {
    // TODO: implementer alerts i stedet for denne log
    // ctx.dispatch(new ShowWarningAlert('Error fetching products: ' + action.error.message));
    console.log(action.error.message);
  }

  //Add item to cart
  @Action(AddToCart)
  addToCart(ctx: StateContext<ProductsStateModel>, action: AddToCart) {
    const oldCart = ctx.getState().cart;
    let newCart = [...oldCart];

    const existingItem = newCart.find(
      (i) => i.product.id === action.payload.id
    );

    if (existingItem) {
      const newExisting = { ...existingItem };
      //newExisting.quantity++;
      newCart = newCart.filter((i) => i.product.id !== action.payload.id);
      newCart = [...newCart, newExisting]; // TODO: fjern måske
      // newCart.splice(existingItemIndex, 0, newExisting);
    } else {
      const newItem = { product: action.payload, quantity: 1 } as ILineitem;
      newCart.push(newItem);
    }

    ctx.patchState({
      cart: newCart,
    });

    ctx.dispatch(new ShowSuccessAlert('Item added to cart!'));
  }

  //Remove item from cart
  @Action(RemoveFromCart)
  removeFromCart(
    ctx: StateContext<ProductsStateModel>,
    action: RemoveFromCart
  ) {
    const oldCart = ctx.getState().cart;
    const tempOldCart = [...oldCart];

    const newCart = tempOldCart.filter(
      (x) => x.product.id !== action.payload.id
    );

    ctx.patchState({
      cart: newCart,
    });
  }

  //Remove all item from cart
  @Action(EmptyCart)
  emptyCart(ctx: StateContext<ProductsStateModel>, action: EmptyCart) {
    ctx.patchState({
      cart: [],
    });
  }
}
