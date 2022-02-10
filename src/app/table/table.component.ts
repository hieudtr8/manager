import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../products/product.model';
import { ProductsService } from '../products/products.service';
import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  listDisplay: User[] | Product[];
  currentPath: string;
  displayProducts: boolean;
  displayUsers: boolean;
  private usersChanged: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.currentPath = this.router.url;
    if (this.currentPath == '/products') {
      this.displayProducts = true;
      this.listDisplay = this.productsService.getProducts();
    } else if (this.currentPath == '/users') {
      this.displayUsers = true;
      this.listDisplay = this.usersService.getUsers();
      this.usersChanged = this.usersService.usersChanged.subscribe(
        (users: User[]) => {
          this.listDisplay = users;
        }
      );
    }
  }
  onEdit(id: number) {
    if (this.currentPath == '/users') {
      this.router.navigate(['/users', id, 'edit']);
    } else {
      this.router.navigate(['/products', id, 'edit']);
    }
  }
  onDelete(id: number) {
    if (this.currentPath == '/users') {
      this.usersService.deleteUser(id);
    }
    if (this.currentPath == '/products') {
      this.productsService.deleteProduct(id);
    }
  }
}
