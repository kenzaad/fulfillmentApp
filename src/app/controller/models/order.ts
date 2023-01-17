import {Customer} from './customer';
import {OrderItem} from './order-item';

export class Order {

   id: number;
   code: string;
   orderDate: string;
   items = new Array<OrderItem>();
  customer = new Customer();
  shippingAddress: string;
   totalPrice: number;
   status: string;
  shippedAt: number;
   deliveredAt: number;

}
