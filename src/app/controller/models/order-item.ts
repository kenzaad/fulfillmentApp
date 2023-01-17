import {Product} from './product';

export class OrderItem {


  public id: number;

  public product = new Product();
  public quantity: number;
}
