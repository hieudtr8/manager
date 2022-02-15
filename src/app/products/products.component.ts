import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product.model';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[];
  currentRoute: string;
  listDisplay: Product[];
  displayTable: boolean = false;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((segments) => {
      this.currentRoute = '/' + segments[0].path;
      if (this.currentRoute == '/products') {
        this.displayTable = true;
        this.listDisplay = this.productService.getProducts();
      } else {
        this.displayTable = false;
      }
    });
    // On event change URL
    this.router.events.subscribe((event) => {
      this.currentRoute = this.router.url;
      if (this.currentRoute == '/products') {
        this.displayTable = true;
        this.listDisplay = this.productService.getProducts();
      } else {
        this.displayTable = false;
      }
    });
  }
  onNewProduct() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
