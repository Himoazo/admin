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

    //Create new account
    formError: string = "";
    createAcc():void{
      const newAccForm = this.personellForm.value;
      this.AuthService.createAcc(newAccForm as unknown as User).subscribe({
        next: ()=>{
          this.openSnackBar("Användaren har skapats");

        },
        error: (error)=>{
          console.log(error);
          if(error.status === 403){
            this.formError = "Du saknar behörigheten för att skapa en ny användare!"
          }else{
            this.formError = error.message;
          }
          
        }
      });
    }

    ngOnInit(){
      this.fetchAccoutns(); 
    }

    //Load all accounts
    userList: User[] = []
    fetchAccoutns():void{
      this.AuthService.getAccounts().subscribe({
        next:(data) =>{
          this.userList = data;
        },
        error:(error)=>{
          if(error.status === 403){
            this.formError = "Du saknar behörigheten för att Använda denna sektion!"
          }else{
            this.formError = error.message;
          }
        }
      });
    }

    //Delete account
    deleteAccount(id: any):void{
      if (window.confirm('Borttagning av användare är permanent och går inte att ångra, vill du fortsätta?')){
        this.AuthService.deleteAccounts(id).subscribe({
        next: ()=>{
          this.openSnackBar("Användarkontot har tagits bort");
          this.fetchAccoutns(); 
        },
        error: (error)=>{
          console.log(error);
          this.openSnackBar("Det gick inte att ta bort användare");
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
