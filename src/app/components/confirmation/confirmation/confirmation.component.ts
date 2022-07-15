import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/models/iorder';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  order?: IOrder;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.selectedOrder.subscribe((value) => {
      this.order = value;
    });
  }
}
