import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../controller/services/product.service";
import {Router} from "@angular/router";
import {CategoryService} from "../../controller/services/category.service";
import {LocationService} from "../../controller/services/location.service";
import {Category} from "../../controller/models/category";
import {Product} from "../../controller/models/product";

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  x:string;
  constructor(public productService: ProductService,private router:Router,private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.productService.productList();
    this.findCategory();
  }
  get categorie(): Category {
    return  this.categoryService.category;
  }
  get product(): Product {
    return this.productService.product;
  }
  get products(): Array<Product>{
    return  this.productService.products;
  }

  update(i: number, c: any) {
    this.router.navigateByUrl('/products/product-create');
    this.productService.edit(i, c);

  }
  findCategory()
  {
    return this.categoryService.categoryList();
  }
  delete(product: number, index: number) {
    const conf = confirm("Are you sure you want to delete this product ?");
    if(!conf) return;
    this.productService.deleteProduct(product, index);

  }
  btnClick= function () {
    console.log('clicked');
    this.router.navigateByUrl('/products/product-create');

  };
  findByAttributes() {
    this.productService.findByAttributes(this.x);
  }

  findProducts() {
    this.productService.productList();

  }

  public detail(index: string) {
    this.router.navigate(['/products/product-details/', index] );
  }
}


