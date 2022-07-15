import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ICart } from 'src/app/models/icart';
import { IProduct } from 'src/app/models/iproduct';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  @Input() product?: IProduct;
  quantity: string = '1';
  isExisted?: ICart;

  ngOnInit(): void {}

  addToCart() {
    let cart: ICart = {
      product: this.product!,
      quantity: parseInt(this.quantity),
    };

    this.cartService.getCart().subscribe({
      next: (res) => {
        this.isExisted = res.find(
          (cart) => cart.product.id == this.product?.id
        );

        if (this.isExisted) {
          cart.id = this.isExisted.id;
          this.cartService.updateCart(cart).subscribe({
            next: (res) => this.toastr.success('Cart updated successfully.'),
            error: (err) => console.log(err),
          });
        } else {
          this.cartService.postCart(cart).subscribe({
            next: (res) => this.toastr.success('Added to cart successfully.'),
            error: (err) => console.log(err),
          });
        }
      },

      error: (err) => console.log(err),
    });
  }

  onSelected(value: string) {
    this.quantity = value;
  }
}
