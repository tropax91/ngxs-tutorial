import { ProductsStateModel } from './products/products.state';
import { UsersStateModel } from './user/users.state';

export class AppState {
  products?: ProductsStateModel;
  user?: UsersStateModel;
}

