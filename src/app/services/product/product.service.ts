import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../../models/iproduct';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IOrder } from 'src/app/models/iorder';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private order = new BehaviorSubject<IOrder>({ name: '', total: 0 });
  selectedOrder = this.order.asObservable();

  constructor(private http: HttpClient) {}

  setOrder(_order: IOrder) {
    this.order.next(_order);
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${environment.API}` + `products`);
  }

  getProductDetails(_productId: number): Observable<IProduct> {
    return this.http.get<IProduct>(
      `${environment.API}` + `products/${_productId}`
    );
  }
}
