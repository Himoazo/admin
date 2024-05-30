import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
    constructor(private Auth: AuthService){}
  //Hamburger menu
  openBtn = document.getElementById("open-menu");
  closeBtn = document.getElementById("close-menu");

  toggleMenu(): void {
      let navMenuEl: HTMLElement | null = document.getElementById("nav-menu");
  
      if(navMenuEl !== null){
          let style = window.getComputedStyle(navMenuEl);
  
      if(style.display === "none") {
          navMenuEl.style.display = "block";
      } else {
          navMenuEl.style.display = "none";
      }
      }
      }

    //Show/hide links at loggedin/out
    loggedIn():boolean{
        return this.Auth.loginOrOut();
    } 

    //Log out 
    logOut() :void{
        localStorage.removeItem("token");
        window.location.href = "/";
    }
    

}
