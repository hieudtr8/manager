import { Subject } from 'rxjs';
import { Product } from './product.model';

export class ProductsService {
  private products: Product[] = [];
  productsChanged = new Subject<Product[]>();
  constructor() {
    if (localStorage.getItem('listProducts')) {
      this.products = this.getProductStorage();
    }
  }
  getProducts() {
    return this.products;
  }
  getProduct(id: number) {
    return this.products.find((obj) => obj.id === id);
  }
  addProduct(product: Product) {
    this.products.push(
      new Product(product.id, product.title, product.quantity, product.price)
    );
    this.productsChanged.next(this.products.slice());
  }
  updateProduct(id, product) {
    let updateIndex = this.products.findIndex((obj) => obj.id == id);
    this.products[updateIndex] = product;
    this.updateProductStorage();
  }
  deleteProduct(id) {
    let deleteIndex = this.products.findIndex((obj) => obj.id == id);
    this.products.splice(deleteIndex);
    this.updateProductStorage();
  }
  updateProductStorage() {
    localStorage.setItem('listProducts', JSON.stringify(this.products));
  }
  getProductStorage() {
    return JSON.parse(localStorage.getItem('listProducts'));
  }
}
