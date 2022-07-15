import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { ConfirmationComponent } from './components/confirmation/confirmation/confirmation.component';
import { ProductDetailsComponent } from './components/product-details/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list/product-list.component';

const routes: Routes = [
  { path: 'home', component: ProductListComponent },
  {
    path: 'product/:productId',
    component: ProductDetailsComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ToastrModule.forRoot()],
  exports: [RouterModule],
})
export class AppRoutingModule {}
