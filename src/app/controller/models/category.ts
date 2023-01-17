import {Product} from "./product";

export class Category {
  public id: number;
   public label: string;
   public products= new Array<Product>();
}
