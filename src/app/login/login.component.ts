import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SignIn } from '../models/sign-in';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  errorDiv: string = "";

  constructor(private authService: AuthService, private router: Router){

  }

  //inloggning
  login():void{
    this.authService.login(this.username, this.password).subscribe({
      next: (response: SignIn) =>{
        if(typeof response === "string")
        localStorage.setItem("token", response);
        this.router.navigate(["/admin"])
      },
      error: (error)=>{
        this.errorDiv = "Felaktigt användarnamn/lösenord";
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
