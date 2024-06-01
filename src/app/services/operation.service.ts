import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Orders } from '../models/orders';
import { Meal } from '../models/meal';
import { Sides } from '../models/side';
import { Dipps } from '../models/dipp';
import { Dipp, Menu , Side} from '../models/menu';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  private url: string = "https://backend-project-production-f507.up.railway.app/api/";
  constructor(private http: HttpClient) { }

  /**
   * GET METHOD
   */
  //Load meals
  getMeals(): Observable<Menu> {
    return this.http.get<Menu>(this.url);
  }
  //Load orders
  getOrders(): Observable<Orders[]> {
     //Get token
     const token = localStorage.getItem("token");
     const headers = {Authorization: "Bearer " + token};

    return this.http.get<Orders[]>(this.url + "orders", {headers}).pipe(
      map((response: any) => response.orders)
    );
  }

  //Get contact messages
  getContact(): Observable<Contact[]> {
    //Get token
    const token = localStorage.getItem("token");
    const headers = {Authorization: "Bearer " + token};

    return this.http.get<Contact[]>(this.url + "contact", {headers}).pipe(
      map((response: any) => response.messages)
    );
  }

  /**
   * POST methods 
   */

  //Place order
  addOrder(order: Orders) :Observable<any>{
    return this.http.post(this.url, order);
  }

  //add meal
  addMeal(meal: Meal) :Observable<Meal>{
    //Get token
    const token = localStorage.getItem("token");
    const headers = {Authorization: "Bearer " + token};

    return this.http.post<Meal>(this.url + "meals", meal, {headers});
  }

  //add Sides
  addSide(side: Sides) :Observable<Sides>{
    //Get token
    const token = localStorage.getItem("token");
    const headers = {Authorization: "Bearer " + token};

  return this.http.post<Sides>(this.url + "sides", side, {headers});
  }

  //add Dipps
  addDipps(dipp: Dipps) :Observable<Dipps>{
    //Get token
    const token = localStorage.getItem("token");
    const headers = {Authorization: "Bearer " + token};

  return this.http.post<Dipps>(this.url + "dipps", dipp, {headers});
  }

  /* PUT method */

  //Edit meal
  editMeal(meal: Meal, id: string) :Observable<Meal>{
    //Get token
    const token = localStorage.getItem("token");
    const headers = {Authorization: "Bearer " + token};

    return this.http.put<Meal>(this.url + "meals/" + id, meal, {headers});
  }

  //Edit side
  editSide(side: Sides, id: string) :Observable<Sides>{
    //Get token
    const token = localStorage.getItem("token");
    const headers = {Authorization: "Bearer " + token};

    return this.http.put<Sides>(this.url + "sides/" + id, side, {headers});

  }

  //Edit Dipp
  editDipp(dipp:Dipps, id:string) :Observable<Dipp>{
    //Get token
    const token = localStorage.getItem("token");
    const headers = {Authorization: "Bearer " + token};
    
    return this.http.put<Dipp>(this.url + "dipps/" + id, dipp, {headers});
  }

  //Edit order status
  editOrder(id:string, status: 'pending' | 'in progress' | 'ready' | 'completed') :Observable<any>{
    //Get token
    const token = localStorage.getItem("token");
    const headers = {Authorization: "Bearer " + token};

    return this.http.put(this.url + "orders/" + id, {status}, {headers});
  }

  /* DELETE METHOD */
  
  //Delete Meal
  deleteMeal(id: string) :Observable<Meal>{
    //Get token
    const token = localStorage.getItem("token");
    const headers = {Authorization: "Bearer " + token};

    return this.http.delete<Meal>(this.url + "meals/" + id, {headers});
  }

  //Delete Side
  deleteSide(id: string) :Observable<Side> {
    //Get token
    const token = localStorage.getItem("token");
    const headers = {Authorization: "Bearer " + token};

    return this.http.delete<Side>(this.url + "sides/" + id, {headers})
  }

  //Delete Dipp
  deleteDipp(id: string) :Observable<Dipp>{
    //Get token
    const token = localStorage.getItem("token");
    const headers = {Authorization: "Bearer " + token};
    
    return this.http.delete<Dipp>(this.url + "dipps/" + id, {headers});
  }

  //Delete Order
  deleteOrder(id: string) :Observable<Orders>{
    //Get token
    const token = localStorage.getItem("token");
    const headers = {Authorization: "Bearer " + token};

    return this.http.delete<Orders>(this.url + "orders/" + id, {headers});
  }

  //Delete contact message
  deleteContact(id: string) :Observable<Contact>{
    //Get token
    const token = localStorage.getItem("token");
    const headers = {Authorization: "Bearer " + token};

    return this.http.delete<Contact>(this.url + "contact/" + id, {headers});
  }
}
