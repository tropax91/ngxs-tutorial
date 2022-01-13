import { IProduct } from 'src/app/services/product/models/IProduct';
//Get Products
export class GetProducts {
  static readonly type = '[Products] Get All';
  constructor() {}
}
export class GetProductsSuccess {
  static readonly type = '[Products] Get All Success';
  constructor(public products: any[]) {}
}

export class GetProductsError {
  static readonly type = '[Products] Get All Error';
  constructor(public error: any) {}
}

//Cart Actions
export class AddToCart {
  static readonly type = '[Products] Add To Cart';
  constructor(public payload: IProduct) {}
}

export class RemoveFromCart {
  static readonly type = '[Products] Remove From Cart';
  constructor(public payload: IProduct) {}
}

export class EmptyCart {
  static readonly type = '[Products] Empty Cart';
  constructor() {}
}
