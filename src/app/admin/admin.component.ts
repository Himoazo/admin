import { Component } from '@angular/core';
import { OperationService } from '../services/operation.service';
import { Orders } from '../models/orders';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, MatMenuModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  
}
