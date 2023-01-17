import { Injectable } from '@angular/core';
import {Product} from "../models/product";
import {Category} from "../models/category";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _category = new Category();
  private _categories = new Array<Category>();
  constructor(private http: HttpClient) { }

  public categoryList() {
    this.http.get<Array<Category>>('http://localhost:8080/api/v1/categories').subscribe(
      data => {

        this._categories = data;

      },
      error => {
        console.log('erreur');
      }
    );

  }
  get category(): Category {
    if (this._category == null) {
      this._category = new Category();
    }
    return this._category;
  }

  get categories(): Array<Category> {
    if (this._categories == null) {
      this._categories = new Array<Category>();
    }
    return this._categories;
  }
}
