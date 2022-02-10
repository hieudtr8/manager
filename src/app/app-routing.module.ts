import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NewProductComponent } from './products/new-product/new-product.component';
import { ProductsComponent } from './products/products.component';
import { TableComponent } from './table/table.component';
import { NewUserComponent } from './users/new-user/new-user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      { path: '', component: TableComponent },
      { path: 'new', component: NewUserComponent },
      { path: ':id/edit', component: NewUserComponent },
    ],
  },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      { path: '', component: TableComponent },
      { path: 'new', component: NewProductComponent },
      { path: ':id/edit', component: NewProductComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
