import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../model/product.model';
import { ProductsService } from '../service/products.service';
import { User } from '../model/user.model';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() listDisplay: User[] | Product[];
  tableHeaders: string[] = [];
  currentPath: string;
  emptyTable: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    if (this.listDisplay == []) {
      this.emptyTable = true;
    }
    console.log(this.listDisplay);
  }
  onEdit(id: number) {
    if (this.currentPath == '/users') {
      this.router.navigate(['/users', id, 'edit']);
    } else {
      this.router.navigate(['/products', id, 'edit']);
    }
  }
  onDelete(id: number) {
    if (confirm('Do you really want to delete this record?')) {
      if (this.currentPath == '/users') {
        this.usersService.deleteUser(id);
      }
      if (this.currentPath == '/products') {
        this.productsService.deleteProduct(id);
      }
    }
  }
}
