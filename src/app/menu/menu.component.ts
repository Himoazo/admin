import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { OperationService } from '../services/operation.service';
import { Meal } from '../models/meal';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButton, ReactiveFormsModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
    //Hamburger form
    hamburgerForm = new FormGroup({
      name: new FormControl("", Validators.required),
      ingredients: new FormControl("", Validators.required),
      singlePrice: new FormControl("", Validators.required),
      doublePrice: new FormControl("", Validators.required)
    });

    constructor(private operation: OperationService){}

    /* //Form values
    newMeal!: Meal;
    mealCheck() :void {
      const formData = this.hamburgerForm.value;
      if (this.hamburgerForm.valid && typeof formData.name === "string" && typeof formData.ingredients=== "string"
        && typeof formData.singlePrice === "number" && typeof formData.doublePrice === "number"
       ) { 
        this.newMeal = {
          name: formData.name,
          ingredients: formData.ingredients,
          prices: {
            Singel: formData.singlePrice,
            Double: formData.doublePrice
          }
        }
        } */
    
    mealCheck() :void{
      const formData = this.hamburgerForm.value;
      if (this.hamburgerForm.valid && typeof formData.name === "string" && typeof formData.ingredients=== "string"
        && typeof formData.singlePrice === "number" && typeof formData.doublePrice === "number"
       ){
        const newMeal = {
        name: formData.name,
        ingredients: formData.ingredients,
        prices: {
          Singel: formData.singlePrice,
          Double: formData.doublePrice
        }
        };
        this.addMeal(newMeal);
       }else{
        this.formError = "Felaktigt värde i formen"
       }
    }
    

    formError: string = "";
    addMeal(newMeal: Meal) :void {
      this.operation.addMeal(newMeal as Meal).subscribe({
        next: ()=> {
          this.hamburgerForm.reset();
          this.formError = "Success";


        },
        error: (error) =>{
          this.formError = error;
          console.log(error);
        }
      });
     
    }
}
