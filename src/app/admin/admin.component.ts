import { Component } from '@angular/core';
import { OperationService } from '../services/operation.service';
import { Orders } from '../models/orders';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  orderList: Orders[] = [];
  constructor(private operation: OperationService){}

  ngOnInit(){
    /* this.getOrders(); */
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
