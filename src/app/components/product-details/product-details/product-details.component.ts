import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICart } from 'src/app/models/icart';
import { IProduct } from 'src/app/models/iproduct';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  product?: IProduct;
  quantity: string = '1';
  isExisted?: ICart;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productService.getProductDetails(params['productId']).subscribe({
        next: (res) => (this.product = res),
        error: (err) => this.toastr.error(err),
      });
    });
  }

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
