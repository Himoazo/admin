import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { OperationService } from '../services/operation.service';
import { Orders } from '../models/orders';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, MatButtonModule, RouterLink, MatTableModule, CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  orderList: Orders[] = [];
  /* orderList: MatTableDataSource<Orders> = new MatTableDataSource<Orders>(); */
  displayedColumns: string[] = ["Kund", "Status", "Inkommen", "Summa"]
  constructor(private operation: OperationService){}

  ngOnInit(){
    this.getOrders();
  }

  
  getOrders() :void{
    this.operation.getOrders().subscribe({
      next: (data) => {
        this.orderList = data;
        console.log(this.orderList);
      },
      error: (error) =>{
        console.log(error);
      }
    });
  }
}
