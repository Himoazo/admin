import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SignIn } from '../models/sign-in';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = "https://backend-project-production-f507.up.railway.app//api/auth/";
  constructor(private http: HttpClient) { }

  //logging in
  login(username: string, password: string) :Observable<SignIn>{
    return this.http.post<SignIn>(this.url + "login", {username, password});
  }

  //Create new user
  createAcc(newUser: User) :Observable<any>{
    //Get token
    const token = localStorage.getItem("token");
    const headers = {Authorization: "Bearer " + token};

    return this.http.post<User>(this.url + "register", newUser, {headers});
  }

  //Load account list
  getAccounts():Observable<User[]>{
    //Get token
    const token = localStorage.getItem("token");
    const headers = {Authorization: "Bearer " + token};

    return this.http.get<User[]>(this.url, {headers}).pipe(
      map((response: any) => response.users)
    );
  }

  //Delete account
  deleteAccounts(id: string):Observable<User>{
    //Get token
    const token = localStorage.getItem("token");
    const headers = {Authorization: "Bearer " + token};

    return this.http.delete<User>(this.url + id, {headers});
  }

  //Show/hide protected links relative to login/out
  loginOrOut(){
  if(localStorage.getItem("token")){
    return true;
  }else {
    return false;
  }
}

}
