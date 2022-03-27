import { IProduct } from "src/app/services/product/models/IProduct";

//Cart Actions
export class AddToCart {
    static readonly type = '[Products] Add To Cart';
    constructor(public payload: IProduct) { }
}

export class RemoveFromCart {
    static readonly type = '[Products] Remove From Cart';
    constructor(public payload: IProduct) { }
}

export class EmptyCart {
    static readonly type = '[Products] Empty Cart';
    constructor() { }
}

export class RequestAlternativePayment {
    static readonly type = '[Users] Request Alternative Payment';
    constructor() { }
}

export class RequestAlternativePaymentSuccess {
    static readonly type = '[Users] Request Alternative Payment Success';
    constructor(public link: string) { }
}

export class RequestAlternativePaymentError {
    static readonly type = '[Users] Request Alternative Payment Error';
    constructor(public error: any) { }
}