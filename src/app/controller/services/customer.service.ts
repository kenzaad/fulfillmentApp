import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Customer} from "../models/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private _customer= new Customer();
  private _customers = new Array<Customer>();
  public errorMessage: ' ';
  public isCreateFailed = false;
  public isCreateSucessed = false;
  private index: number;

  public successMessage: string;
  constructor(private http: HttpClient) {
  }

  get customer(): Customer {
    if (this._customer == null) {
      this._customer = new Customer();
    }
    return this._customer;
  }

  get customers(): Array<Customer> {
    if (this._customers == null) {
      this._customers = new Array<Customer>();
    }
    return this._customers;
  }

  set customer(value: Customer) {
    this._customer = value;
  }

  set customers(value: Array<Customer>) {
    this._customers = value;
  }
  private clone(customer: Customer) {
    const _clone = new Customer();
    _clone.id = customer.id;
    _clone.code = customer.code;
    _clone.fullName = customer.fullName;
    _clone.email = customer.email;
    _clone.address = customer.address;
    _clone.cin = customer.cin;
    _clone.phone = customer.phone;

    return _clone;
  }

  public save() {
    if (this.customer.id == null) {
      this.http.post<string>('http://localhost:8080/api/v1/customers/', this.customer).subscribe(
        data => {

          this.customers.push(this.clone(this.customer));
          // @ts-ignore
          this.customer = null;
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
      this.http.put<string>('http://localhost:8080/api/v1/customers/' + this.customer.id, this.customer).subscribe(
        data => {

          this.customers[this.index] = this.clone(this.customer);
          this.customer = null;
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
  public customerList() {
    this.http.get<Array<Customer>>('http://localhost:8080/api/v1/customers').subscribe(
      data => {

        this._customers = data;

      },
      error => {
        console.log('erreur');
      }
    );

  }

  public deletecustomer(customer: number, index: number) {
    this.http.delete<void>('http://localhost:8080/api/v1/customers/' + customer).subscribe(
      data => {

        this.customers.splice(index, 1);

      },
      error => {
        console.log('erreur');
      }
    );
  }

  public edit(index: number, c: Customer) {
    this.customer = this.clone(c);
    this.index = index;
  }





}
