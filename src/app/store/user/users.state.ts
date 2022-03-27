import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { Action, State, StateContext } from "@ngxs/store";
import { UserInfoForm } from "src/app/services/product/models/UserInfoForm";
import { UserService } from "src/app/services/user.service";
import { ShowErrorAlert } from "../alert/alert.action";
import { ILineitem } from "../products/products.state";
import { AddToCart, EmptyCart, RemoveFromCart } from "./users.action";

declare let Dibs: any

export interface shoppingData {
    firstName: string;
    lastName: string;
    email: string;
    address: string,
    postalCode: string,
    city: string,
    country: string,
    phoneNumber: string,
    password: string;
    confirmPassword: string;

    items: productData[];
}

export interface productData {
    id: string;
    quantity: number;
}

export interface UsersStateModel {
    registerForm: UserInfoForm;
    cart: ILineitem[];
    purchasedItems: ILineitem[];
}

@State<UsersStateModel>({
    name: 'user',
    defaults: {
        cart: [],
        purchasedItems: [],
        registerForm: {
            model: undefined,
            dirty: false,
            status: '',
            errors: {}
        },
    }
})

@Injectable()
export class UsersState {
    constructor(private userService: UserService, public router: Router, private ngZone: NgZone) { }


    //Add item to cart
    @Action(AddToCart)
    addToCart(ctx: StateContext<UsersStateModel>, action: AddToCart) {
        const oldCart = ctx.getState().cart;
        let newCart = [...oldCart];

        const existingItem = newCart.find(i => i.product.id === action.payload.id);

        if (existingItem) {
            const newExisting = { ...existingItem };
            //newExisting.quantity++;
            newCart = newCart.filter(i => i.product.id !== action.payload.id);
            newCart = [...newCart, newExisting]; // TODO: fjern måske
            // newCart.splice(existingItemIndex, 0, newExisting);
        } else {
            const newItem = { product: action.payload, quantity: 1 } as ILineitem;
            newCart.push(newItem);
        }

        ctx.patchState({
            cart: newCart
        });
    }

    //Remove item from cart
    @Action(RemoveFromCart)
    removeFromCart(ctx: StateContext<UsersStateModel>, action: RemoveFromCart) {
        const oldCart = ctx.getState().cart;
        const tempOldCart = [...oldCart];

        const newCart = tempOldCart.filter(x => x.product.id !== action.payload.id);

        ctx.patchState({
            cart: newCart
        });
    }

    //Remove all item from cart
    @Action(EmptyCart)
    emptyCart(ctx: StateContext<UsersStateModel>, action: EmptyCart) {
        ctx.patchState({
            cart: []
        });
    }

    // @Action(RequestPaymentId)
    // requestPaymentId(ctx: StateContext<UsersStateModel>, action: RequestPaymentId) {

    //     const data = ctx.getState().registerForm.model;
    //     const items = ctx.getState().cart.map(item => ({ id: item.product.id, quantity: item.quantity }));

    //     const dataToSend = { ...data, items: items } as shoppingData

    //     this.userService.requestPaymentId(dataToSend).pipe(first()).subscribe(result => {
    //         ctx.dispatch(new RequestPaymentIdSuccess(result.paymentId, result.checkoutKey, result.doceboLink));
    //     }, error => {
    //         ctx.dispatch(new RequestPaymentIdError(error));
    //     })
    // }

    // @Action(RequestPaymentIdSuccess)
    // requestPaymentIdSuccess(ctx: StateContext<UsersStateModel>, action: RequestPaymentIdSuccess) {
    //     const checkoutOptions = {
    //         checkoutKey: action.checkoutKey,
    //         paymentId: action.paymentId,
    //         containerId: "checkout-container-div",
    //     };
    //     const checkout = new Dibs.Checkout(checkoutOptions);

    //     const that = this;

    //     checkout.on('payment-completed', function (_response: any) {
    //         const purchased = ctx.getState().cart;

    //         ctx.patchState({
    //             purchasedItems: purchased
    //         });

    //         ctx.dispatch(new EmptyCart());
    //         that.ngZone.run(() => that.router.navigate(['ordersuccess', action.link]));
    //     });
    // }

    // @Action(RequestPaymentIdError)
    // requestPaymentIdError(ctx: StateContext<UsersStateModel>, action: RequestPaymentIdError) {
    //     ctx.dispatch(new ShowErrorAlert('Transaktionen gik ikke igennem!'))
    // }

    // @Action(RequestAlternativePayment)
    // requestAlternativePayment(ctx: StateContext<UsersStateModel>, action: RequestAlternativePayment) {

    //     const privateData = ctx.getState().privateUserForm.model;

    //     const items = ctx.getState().cart.map(item => ({ id: item.product.id, quantity: item.quantity }));

    //     const customerDataToSend = { ...privateData, items: items } as privateShoppingData;

    //     this.userService.requestAlternativePayment(customerDataToSend).pipe(first()).subscribe(result => {
    //         ctx.dispatch(new RequestAlternativePaymentSuccess(result.doceboLink));
    //     }, error => {
    //         ctx.dispatch(new RequestAlternativePaymentError(error));
    //     });
    // }

    // @Action(RequestAlternativePaymentSuccess)
    // requestAlternativePaymentSuccess(ctx: StateContext<UsersStateModel>, action: RequestAlternativePaymentSuccess) {
    //     const purchased = ctx.getState().cart;

    //     ctx.patchState({
    //         purchasedItems: purchased
    //     });

    //     ctx.dispatch(new EmptyCart());        
    //     this.ngZone.run(() => this.router.navigate(['successpage', action.link]));
    // }

    // @Action(RequestAlternativePaymentError)
    // requestAlternativePaymentError(ctx: StateContext<UsersStateModel>, action: RequestAlternativePaymentError) {
    //     ctx.dispatch(new ShowErrorAlert('Transaktionen gik ikke igennem!'))
    // }


}