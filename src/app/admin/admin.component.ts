import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, MatMenuModule, MatIconModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  constructor(){}

}
