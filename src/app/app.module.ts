import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { TableComponent } from './table/table.component';
import { ProductsComponent } from './products/products.component';
import { HeadersComponent } from './headers/headers.component';
import { UsersService } from './users/users.service';
import { ProductsService } from './products/products.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewUserComponent } from './users/new-user/new-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewProductComponent } from './products/new-product/new-product.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
import { KeysPipe } from './keys.pipe';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    TableComponent,
    ProductsComponent,
    HeadersComponent,
    NewUserComponent,
    NewProductComponent,
    KeysPipe,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatNativeDateModule,
    MatDatepickerModule,
    NgbModule,
  ],
  providers: [UsersService, ProductsService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
