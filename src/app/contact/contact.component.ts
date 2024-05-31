import { Component } from '@angular/core';
import { OperationService } from '../services/operation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contact } from '../models/contact';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactMsgs: Contact[] = [];


  constructor(private operation: OperationService, private _snackBar: MatSnackBar){}

  ngOnInit(){
    this.getContacts();
  }

  getContacts():void{
    this.operation.getContact().subscribe({
      next: (data) => {
        this.contactMsgs = data;
      },
      error: (error) =>{
        console.log(error);
      }
    });
  }

  //Delete contact message
  deleteContact(id: string) :void {
    if (window.confirm('Är du säker att du vill ta port detta meddelande?')){
      this.operation.deleteContact(id).subscribe({
        next: ()=>{
          this.getContacts();
          this.openSnackBar("Meddelande har raderats");
        },
        error: (error)=>{
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
