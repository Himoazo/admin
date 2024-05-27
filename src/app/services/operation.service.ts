import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../models/orders';
import { Meal } from '../models/meal';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  private url: string = "http://127.0.0.1:3000/api/";
  constructor(private http: HttpClient) { }

  //Load orders
  getOrders() :Observable<Orders[]>{
    //Get token
    const token = localStorage.getItem("token");
    const headers = {Authorization: "Bearer " + token};

    return this.http.get<Orders[]>(this.url + "orders", {headers})
  }

  //Place order
  addOrder(order: Orders) :Observable<any>{
    return this.http.post(this.url, order);
  }

  //add meal
  addMeal(meal: Meal) :Observable<Meal>{
    //Get token
    const token = localStorage.getItem("token");
    const headers = {Authorization: "Bearer " + token};

    return this.http.post<Meal>(this.url + "meals", meal, {headers})
  }
}
