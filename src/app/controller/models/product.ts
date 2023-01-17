import {Category} from "./category";
import {Location} from "./location";

export class Product {
  public id: number;
  public name: string;
  public sku: string;
  public description: string;
  public sellingPrice: number;
  public costPrice: number;
  public stockQuantity: number;
  public supplyLevel: number;
  public status: string;
  public volume: number;
  public weight: number;
  public category = new Category();
  public locations = new Array<Location>();
}
