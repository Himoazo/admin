import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignIn } from '../models/sign-in';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = "http://127.0.0.1:3000/api/auth/";
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

    return this.http.post<User>(this.url + "register", newUser, {headers} )
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
