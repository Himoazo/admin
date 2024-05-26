import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignIn } from '../models/sign-in';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = "http://127.0.0.1:3000/api/auth/login";
  constructor(private http: HttpClient) { }

  //logging in
  login(username: string, password: string) :Observable<SignIn>{
    return this.http.post<SignIn>(this.url, {username, password});
  }
}
