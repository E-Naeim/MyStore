import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart } from 'src/app/models/icart';
import { IProduct } from 'src/app/models/iproduct';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  productList?: ICart[];
  product?: ICart;

  getCart(): Observable<ICart[]> {
    return this.http.get<ICart[]>(`${environment.API}` + `cart`);
  }

  postCart(_product: ICart) {
    return this.http.post(`${environment.API}` + `cart`, _product);
  }

  updateCart(_cart: ICart) {
    return this.http.put(`${environment.API}` + `cart/${_cart.id}`, _cart);
  }

  deleteCart(_cart: ICart) {
    return this.http.delete(`${environment.API}` + `cart/${_cart.id}`);
  }
}
