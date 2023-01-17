import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../models/order";
import {OrderItem} from "../models/order-item";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private _order = new Order();
  private _orders = new Array<Order>();
  private _ordersItem = new Array<OrderItem>();
  private _orderItem = new OrderItem();


  public errorMessage: ' ';
  public isCreateFailed = false;
  public isCreateSucessed = false;
  private index: number;
  public successMessage: string;
  public nbr: number;
  constructor(private http: HttpClient) {
  }

  get order(): Order {
    if (this._order == null) {
      this._order = new Order();
    }
    return this._order;
  }

  get orders(): Array<Order> {
    if (this._orders == null) {
      this._orders = new Array<Order>();
    }
    return this._orders;
  }
  get ordersItem(): Array<OrderItem> {
    if (this._ordersItem == null) {
      this._ordersItem = new Array<OrderItem>();
    }
    return this._ordersItem;
  }

  set order(value: Order) {
    this._order = value;
  }

  set orders(value: Array<Order>) {
    this._orders = value;
  }
  private clone(order: Order) {
    const _clone = new Order();
    _clone.id = order.id;
    _clone.code = order.code;
    _clone.customer.fullName = order.customer.fullName;
    _clone.deliveredAt = order.deliveredAt;
    _clone.orderDate=order.orderDate;
    _clone.shippingAddress=order.shippingAddress;
    _clone.totalPrice=order.totalPrice;


    return _clone;
  }

  public save() {
    if (this.order.id == null) {
      this.http.post<string>('http://localhost:8080/api/v1/orders', this.order).subscribe(
        data => {

          this.orders.push(this.clone(this.order));
          // @ts-ignore
          this.order = null;
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
      this.http.put<string>('http://localhost:8080/api/v1/orders/' + this.order.id, this.order).subscribe(
        data => {

          this.orders[this.index] = this.clone(this.order);
          this.order = null;
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
  public orderList() {
    this.http.get<Array<Order>>('http://localhost:8080/api/v1/orders').subscribe(
      data => {

        this._orders = data;

      },
      error => {
        console.log('erreur');
      }
    );

  }

  public deleteOrder(order: number, index: number) {
    this.http.delete<void>('http://localhost:8080/api/v1/orders/' + order).subscribe(
      data => {

        this.orders.splice(index, 1);

      },
      error => {
        console.log('erreur');
      }
    );
  }

  public edit(index: number, p: Order) {
    this.order = this.clone(p);
    this.index = index;
  }

  public findById(code: string)
  {


    this.http.get<Order>('http://localhost:8080/api/v1/orders/' + code).subscribe(
      data => {
        console.log("khdmat")
        this._order = data;
      },
      error => {
        console.log('erreur');

      }

      ,
    );


  }


public findOrderitem(code: string)
{
  this.http.get<Array<OrderItem>>('http://localhost:8080/api/v1/orders/orderItem/' + code).subscribe(
    data => {

     return this._ordersItem = data;

    },
    error => {
      console.log('erreur');
    }
  );

}

public pendingOrder()
{
  this.http.get<number>('http://localhost:8080/api/v1/orders/orderPending').subscribe(
    data => {

      this.nbr = data;

    },
    error => {
      console.log('erreur');
    }
  );

}


}
