import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SignIn } from '../models/sign-in';
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  errorDiv: string = "";

  constructor(private authService: AuthService, private router: Router){}

  //login form
  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    password: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(25)])
    });

  //inloggning
  login():void{
    const loginInfo = this.loginForm.value;
    if(this.loginForm.valid && typeof loginInfo.username === "string" && typeof loginInfo.password?.toString() === "string")
    this.authService.login(loginInfo.username, loginInfo.password).subscribe({
      next: (response: SignIn) =>{
        if(typeof response === "string")
        localStorage.setItem("token", response);
        this.authService.loginOrOut;
        this.router.navigate(["/admin"]);
      },
      error: (error)=>{
        this.errorDiv = "Felaktigt användarnamn/lösenord";
        console.log(error)
      }
    });
  }
  //Password eye symbol
  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
}
