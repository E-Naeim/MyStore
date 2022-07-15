import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/models/iproduct';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  productList?: IProduct[];

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (res) => (this.productList = res),
      error: (err) => this.toastr.error(err),
    });
  }
}
