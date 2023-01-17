import {Injectable} from '@angular/core';
import {Product} from '../models/product';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _product = new Product();
  private _products = new Array<Product>();
  public errorMessage: ' ';
  public isCreateFailed = false;
  public isCreateSucessed = false;
  private index: number;
  public successMessage: string;
  public nbr: number;
  private postResponse: Object;
  public prd: string;
  constructor(private http: HttpClient) {
  }

  get product(): Product {
    if (this._product == null) {
      this._product = new Product();
    }
    return this._product;
  }

  get products(): Array<Product> {
    if (this._products == null) {
      this._products = new Array<Product>();
    }
    return this._products;
  }

  set product(value: Product) {
    this._product = value;
  }

  set products(value: Array<Product>) {
    this._products = value;
  }
  private clone(product: Product) {
    const _clone = new Product();
    _clone.id = product.id;
    _clone.sku = product.sku;
    _clone.name = product.name;
    _clone.description = product.description;
    _clone.sellingPrice = product.sellingPrice;
    _clone.costPrice = product.costPrice;
    _clone.stockQuantity = product.stockQuantity;
    _clone.supplyLevel = product.supplyLevel;
    _clone.status = product.status;
    _clone.weight = product.weight;
    _clone.volume = product.volume;
    _clone.category = product.category;
    _clone.category.label = product.category.label;

    return _clone;
  }

  public save() {
    if (this.product.id == null) {
      this.http.post<string>('http://localhost:8080/api/v1/products/', this.product).subscribe(
        data => {

          this.products.push(this.clone(this.product));
          // @ts-ignore
          this.product = null;
          this.isCreateFailed = false;
          this.isCreateSucessed = true;
          // @ts-ignore
          this.successMessage = data.message;
          console.log(data);
        },
        error => {
          console.log('error tfou');
          this.errorMessage = error.error.message;
          this.isCreateFailed = true;
        },
      );
    } else {
      this.http.put<string>('http://localhost:8080/api/v1/products/' + this.product.id, this.product).subscribe(
        data => {

          this.products[this.index] = this.clone(this.product);
          this.product = null;
          this.isCreateFailed = false;
          this.isCreateSucessed = true;
          // @ts-ignore
          this.successMessage = data.message;
          console.log(data);


        },
        error => {
          console.log('erreur');
          this.errorMessage = error.error.message;
          this.isCreateFailed = true;

        }
      );
    }
  }
  public productList() {
    this.http.get<Array<Product>>('http://localhost:8080/api/v1/products').subscribe(
      data => {

        this._products = data;

      },
      error => {
        console.log('erreur');
      }
    );

  }

  public deleteProduct(product: number, index: number) {
    this.http.delete<void>('http://localhost:8080/api/v1/products/' + product).subscribe(
      data => {

        this.products.splice(index, 1);

      },
      error => {
        console.log('erreur');
      }
    );
  }

  public edit(index: number, p: Product) {
    this.product = this.clone(p);
    this.index = index;
  }

  public findById(sku: string) {


    this.http.get<Product>('http://localhost:8080/api/v1/products/' + sku).subscribe(
      data => {
         console.log('khdmat');
         this._product = data;
      },
      error => {
        console.log('erreur');

      }

      ,
    );


  }
  public findByAttributes(x: string) {
    this.http.get<Array<Product>>('http://localhost:8080/api/v1/products/findByAttributes/' + x).subscribe(
      data => {
        this._products = data;

      },
      error => {
        console.log('erreur');
      }
    );
  }
public out_of_stock() {
  this.http.get<number>('http://localhost:8080/api/v1/products/outOfStock').subscribe(
    data => {

    this.nbr = data;

},
error => {
  console.log('erreur');
}
);

}

  fetchProfileImage(sku:string): Observable<Blob> {
    let url = 'http://localhost:8080/api/v1/products/qrcode/' +sku;

    return this.http.get(url, { responseType: 'blob' });
  }

  public mostProduct() {
    this.http.get<string>('http://localhost:8080/api/v1/products/mostOrderdProduct').subscribe(
      data => {

        this.prd = data;

      },
      error => {
        console.log('erreur');
      }
    );

  }
}
