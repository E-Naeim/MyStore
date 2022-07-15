import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICart } from 'src/app/models/icart';
import { IOrder } from 'src/app/models/iorder';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart?: ICart[];
  total: number = 0;
  userForm!: FormGroup;
  isExisted?: ICart;

  creditCardPattern =
    '^(3[47][0-9]{13}|(6541|6556)[0-9]{12}|389[0-9]{11}|3(?:0[0-5]|[68][0-9])[0-9]{11}|65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})|63[7-9][0-9]{13}|(?:2131|1800|35d{3})d{11}|9[0-9]{15}|(6304|6706|6709|6771)[0-9]{12,15}|(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}|(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))|(6334|6767)[0-9]{12}|(6334|6767)[0-9]{14}|(6334|6767)[0-9]{15}|(4903|4905|4911|4936|6333|6759)[0-9]{12}|(4903|4905|4911|4936|6333|6759)[0-9]{14}|(4903|4905|4911|4936|6333|6759)[0-9]{15}|564182[0-9]{10}|564182[0-9]{12}|564182[0-9]{13}|633110[0-9]{10}|633110[0-9]{12}|633110[0-9]{13}|(62[0-9]{14,17})|4[0-9]{12}(?:[0-9]{3})?|(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}))$';

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(6)]],
      cardNumber: [
        '',
        [Validators.required, Validators.pattern(this.creditCardPattern)],
      ],
    });

    this.getCart();
  }

  submit() {
    let order: IOrder = {
      name: this.userForm.value['fullName'],
      total: this.total,
    };
    this.productService.setOrder(order);
    this.cart!.forEach((cart) => {
      this.cartService.deleteCart(cart).subscribe();
    });

    this.router.navigate(['/confirmation']);
  }

  changeQuantity(value: string, _cart: ICart) {
    _cart.quantity = parseInt(value);

    this.cartService.getCart().subscribe({
      next: (res) => {
        this.isExisted = res.find(
          (cart) => cart.product.id == _cart?.product.id
        );

        if (this.isExisted) {
          _cart.id = this.isExisted.id;
          this.cartService.updateCart(_cart).subscribe({
            next: (res) => {
              this.toastr.success('Cart updated successfully.');
              this.getCart();
            },
            error: (err) => console.log(err),
          });
        } else {
          this.cartService.postCart(_cart).subscribe({
            next: (res) => this.toastr.success('Added to cart successfully.'),
            error: (err) => console.log(err),
          });
        }
      },

      error: (err) => console.log(err),
    });
  }

  getCart() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cart = res;
        this.total = 0;
        this.cart.forEach(
          (cart) => (this.total += cart.product.price * cart.quantity)
        );
      },
      error: (err) => console.log(err),
    });
  }

  delete(cart: ICart) {
    this.cartService.deleteCart(cart).subscribe({
      next: (res) => {
        this.toastr.success('deleted successfully.');
        this.getCart();
      },
    });
  }
}
