import { Injectable } from '@angular/core';
import {Packaging} from "../models/packaging";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PackagingService {


  private _packaging = new Packaging();
  private _packagings = new Array<Packaging>();
  private index: number;
  isCreateFailed: boolean;
  errorMessage: any;
  isCreateSucessed: boolean;
  successMessage: any;
  constructor(private http: HttpClient) { }

  set packaging(value: Packaging) {
    this._packaging = value;
  }

  set packagings(value: Array<Packaging>) {
    this._packagings = value;
  }

  public packagingList() {
    this.http.get<Array<Packaging>>('http://localhost:8080/api/v1/packaging').subscribe(
      data => {

        this._packagings = data;

      },
      error => {
        console.log('erreur');
      }
    );

  }
  get packaging(): Packaging {
    if (this._packaging == null) {
      this._packaging = new Packaging();
    }
    return this._packaging;
  }

  get packagings(): Array<Packaging> {
    if (this._packagings == null) {
      this._packagings = new Array<Packaging>();
    }
    return this._packagings;
  }
  public save(code:string) {
    if (this.packaging.id == null) {
      this.http.post<string>('http://localhost:8080/api/v1/packaging/packageOrder', this.packaging).subscribe(
        data => {
          this.packaging.order.code = code;
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
    }

  }

}
