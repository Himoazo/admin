import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { OperationService } from '../services/operation.service';
import { Orders } from '../models/orders';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, MatButtonModule, RouterLink, MatTableModule, CommonModule,
    MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
   orderList: Orders[] = [];
  displayedColumns: string[] = ["Kund", "Status", "Inkommen", "Summa", "Artiklar", "Hantera", "Radera"];
  constructor(private operation: OperationService, private _snackBar: MatSnackBar){}

  ngOnInit(){
    this.getOrders();
  }

  
  getOrders() :void{
    this.operation.getOrders().subscribe({
      next: (data) => {
        this.orderList = data;
      },
      error: (error) =>{
        console.log(error);
      }
    });
  }

  //Hantera order
  selected = "";
  status = ['pending' , 'in progress' , 'ready' , 'completed'];
  changeStatus(id: string): void {
    if (this.selected) {
      const newStatus = this.selected as 'pending' | 'in progress' | 'ready' | 'completed';
      this.operation.editOrder(id, newStatus).subscribe({
        next: () => {
          this.getOrders();
          this.openSnackBar("Orderstatus har ändrats");
        },
        error: (error) => {
          console.error(error);
          this.openSnackBar("Något gick fel, det gick inte att ändra status");
        }
      });
    } else {
      console.log("fel status");
    }
  }

  //Delete Order
  deleteOrder(id: string) :void{
    if (window.confirm('Är du säker att du vill ta port denna order?')){
      this.operation.deleteOrder(id).subscribe({
      next: ()=>{
        this.getOrders();
        this.openSnackBar("Order har raderats");
      },
      error: (error)=>{
        console.error(error);
        this.openSnackBar("Fel har inträffats");
      }
    });
    }
  }

   /* snackBar */
   openSnackBar(message: string) {
    this._snackBar.open(message, "X", {
      duration: 5000
    });
  }
}
