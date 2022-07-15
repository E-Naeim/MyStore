import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { ConfirmationComponent } from './components/confirmation/confirmation/confirmation.component';
import { ProductItemComponent } from './components/product-item/product-item/product-item.component';
import { ProductDetailsComponent } from './components/product-details/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list/product-list.component';
import { SharedComponent } from './components/shared/shared/shared.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ConfirmationComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    ProductListComponent,
    SharedComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
