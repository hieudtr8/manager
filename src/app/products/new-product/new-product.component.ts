import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  product: Product = {
    id: 0,
    title: '',
    quantity: 0,
    price: 0,
  };
  constructor(
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}
  // --- Edit Products ----
  editMode = false;
  id: number;

  signupForm: FormGroup;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      if (this.editMode) {
        this.product = this.productService.getProduct(this.id);
        console.log(this.product);
      }
    });
    if (this.editMode) {
      this.createFormEdit(this.product);
    } else {
      this.createFormNew();
    }
  }
  onSubmit() {
    this.product.id = this.signupForm.value.id;
    this.product.title = this.signupForm.value.title;
    this.product.quantity = this.signupForm.value.quantity;
    this.product.price = this.signupForm.value.price;

    if (this.editMode) {
      this.productService.updateProduct(this.id, this.product);
      this.toastr.success('Edit product successfully!');
    } else {
      this.productService.addProduct(this.product);
      this.signupForm.reset();
      this.toastr.success('Add product successfully!');
      this.router.navigate(['/products'], { relativeTo: this.route });
    }
    this.productService.updateProductStorage();
  }
  duplicatedIdValidator(control: FormControl) {
    let id = control.value;
    let list_products = this.productService.getProducts();
    if (id && list_products.find((obj) => obj.id == id)) {
      return {
        duplicatedId: {
          id: id,
        },
      };
    }
    return null;
  }
  createFormEdit(input) {
    this.signupForm = new FormGroup({
      id: new FormControl(input.id, [
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        Validators.required,
      ]),
      title: new FormControl(input.title, [Validators.required]),
      quantity: new FormControl(input.quantity, [
        Validators.required,
        Validators.min(0),
      ]),
      price: new FormControl(input.price, [
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        Validators.required,
        Validators.min(0),
      ]),
    });
  }
  createFormNew() {
    this.signupForm = new FormGroup({
      id: new FormControl(null, [
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        Validators.required,
        Validators.min(0),
        this.duplicatedIdValidator.bind(this),
      ]),
      title: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required, Validators.min(0)]),
      price: new FormControl(null, [
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        Validators.required,
        Validators.min(0),
      ]),
    });
  }
}
