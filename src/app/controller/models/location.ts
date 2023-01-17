import {Product} from "./product";

export class Location {
    id:number;
    code:string
    ails:string
    rack:string
    shelf:string
    bin:string
    pickNbr:number;
    taken:boolean;
    product: Product;
}
