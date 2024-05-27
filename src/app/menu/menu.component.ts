import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { OperationService } from '../services/operation.service';
import { Meal } from '../models/meal';
import { Side } from '../models/side';
import { Dipp } from '../models/dipp';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButton, ReactiveFormsModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
    constructor(private operation: OperationService){}

    //Hamburger form
    hamburgerForm = new FormGroup({
    name: new FormControl("", Validators.required),
    ingredients: new FormControl("", Validators.required),
    singlePrice: new FormControl("", Validators.required),
    doublePrice: new FormControl("", Validators.required)
    });

    //Hamburger form data contrl
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
    
    //save meal i db
    formError: string = "";
    addMeal(newMeal: Meal) :void {
      this.operation.addMeal(newMeal as Meal).subscribe({
        next: ()=> {
          this.hamburgerForm.reset();
          this.formError = "";
        },
        error: (error) =>{
          this.formError = error;
          console.log(error);
        }
      });
    }

    //Sides form
    sideForm = new FormGroup({
      name: new FormControl("", Validators.required),
      smallPrice: new FormControl("", Validators.required),
      bigPrice: new FormControl("", Validators.required)
      });

      //SideForm data control
      sideCheck() :void{
        const sideData = this.sideForm.value;
        if(this.sideForm.valid && typeof sideData.name === "string" && typeof sideData.smallPrice === "number"
          && typeof sideData.bigPrice === "number"){
            const newSide = {
              name: sideData.name,
              prices:{
                small: sideData.smallPrice,
                big: sideData.bigPrice
              }
            };
            this.addSide(newSide);
          }else{

          }
      }

      //add new side
      sidesError: string = "";
      addSide(newSide: Side) :void{
        this.operation.addSide(newSide as Side).subscribe({
          next: () => {
            this.sideForm.reset();
            this.sidesError = "";
          },
          error: (error)=>{
            this.sidesError = error.message;
            console.log(error);
          }
        });
      }

      //Dipps form
      dippForm = new FormGroup({
        name: new FormControl("", Validators.required),
        price: new FormControl("", Validators.required)
        });

       //Add dipps
        dippsError: string ="";
        addDipp():void{
          if(!this.dippForm.valid){
            this.dippsError = "fyll i alla fält";
          }else{
            this.operation.addDipps(this.dippForm.value as unknown as Dipp).subscribe({
              next: ()=>{
                this.dippForm.reset();
                this.dippsError = "";
              },
              error: (error)=>{
                this.dippsError = error.message;
              }
            });
          }
          
        }
       
}
