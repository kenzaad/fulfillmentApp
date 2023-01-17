import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Location} from '../models/location';
import {Order} from "../models/order";


@Injectable({
  providedIn: 'root'
})
export class LocationService {

private _location = new Location();
  private _locations = new Array<Location>();
  private index: number;
   isCreateFailed: boolean;
   errorMessage: any;
   isCreateSucessed: boolean;
   successMessage: any;
  constructor(private http: HttpClient) { }

  set location(value: Location) {
    this._location = value;
  }

  set locations(value: Array<Location>) {
    this._locations = value;
  }

  public locationList() {
    this.http.get<Array<Location>>('http://localhost:8080/api/v1/locations').subscribe(
      data => {

        this._locations = data;

      },
      error => {
        console.log('erreur');
      }
    );

  }
  get location(): Location {
    if (this._location == null) {
      this._location = new Location();
    }
    return this._location;
  }

  get locations(): Array<Location> {
    if (this._locations == null) {
      this._locations = new Array<Location>();
    }
    return this._locations;
  }

  private clone(location: Location) {
    const _clone = new Location();
    _clone.id = location.id;
    _clone.code = location.code;
    _clone.ails = location.ails;
    _clone.shelf = location.shelf;
    _clone.bin = location.bin;
    _clone.taken = location.taken;
    _clone.rack =  location.rack;


    return _clone;
  }

  public save() {
    if (this.location.id == null) {
      this.http.post<string>('http://localhost:8080/api/v1/locations/', this.location).subscribe(
        data => {

          this.locations.push(this.clone(this.location));
          // @ts-ignore
          this.location = null;
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
      this.http.put<string>('http://localhost:8080/api/v1/locations/' + this.location.id, this.location).subscribe(
        data => {

          this.locations[this.index] = this.clone(this.location);
          this.location=null;
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
  public deleteLocation(location: number, index: number) {
    this.http.delete<void>('http://localhost:8080/api/v1/locations/' + location).subscribe(
      data => {

        this.locations.splice(index, 1);

      },
      error => {
        console.log('erreur');
      }
    );
  }

  public edit(index: number, p: Location) {
    this.location = this.clone(p);
    this.index = index;
  }

  public findById(code: string)
  {


    this.http.get<Location>('http://localhost:8080/api/v1/locations/' + code).subscribe(
      data => {
        console.log("khdmat")
        this._location = data;
      },
      error => {
        console.log('erreur');

      }

      ,
    );


  }


  public notTaken() {
    this.http.get<Array<Location>>('http://localhost:8080/api/v1/locations/notTaken').subscribe(
      data => {

        this._locations = data;

      },
      error => {
        console.log('erreur');
      }
    );

  }
}

