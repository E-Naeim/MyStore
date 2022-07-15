import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/models/iproduct';
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
    private toastr: ToastrService
  ) {}

  product?: IProduct;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productService.getProductDetails(params['productId']).subscribe({
        next: (res) => (this.product = res),
        error: (err) => this.toastr.error(err),
      });
    });
  }
}
