import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-personnel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatButton],
  templateUrl: './personnel.component.html',
  styleUrl: './personnel.component.scss'
})
export class PersonnelComponent {
  
  constructor(private AuthService: AuthService, private _snackBar: MatSnackBar){}
  //Hamburger form
  personellForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    password: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    role: new FormControl("", [Validators.required])
    });

    
    formError: string = "";
    createAcc():void{
      const newAccForm = this.personellForm.value;
      this.AuthService.createAcc(newAccForm as unknown as User).subscribe({
        next: ()=>{
          this.openSnackBar("Användaren har skapats");

        },
        error: (error)=>{
          console.log(error);
          this.formError = error.message;
        }
      });
    }

    /* snackBar */
    openSnackBar(message: string) {
      this._snackBar.open(message, "X", {
        duration: 5000
      });
    }
    
}
