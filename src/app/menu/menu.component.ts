import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { OperationService } from '../services/operation.service';
import { Meal } from '../models/meal';
import { Side } from '../models/side';
import { Dipp } from '../models/dipp';
import { Hamburger, Menu } from '../models/menu';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButton, ReactiveFormsModule, CommonModule, MatExpansionModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
    constructor(private operation: OperationService){}
    menu: Menu = { meals: [], sides: [], dipps: [] };
    ngOnInit(){
      this.fetchMenu();
    }

    //Fetch menu
    fetchMenu():void{
      this.operation.getMeals().subscribe(data =>{
        this.menu = data;
      });
    }
    //Hamburger form
    hamburgerForm = new FormGroup({
    name: new FormControl("", Validators.required),
    ingredients: new FormControl("", Validators.required),
    singlePrice: new FormControl("", [Validators.required, Validators.min(0), Validators.max(999)]),
    doublePrice: new FormControl("", [Validators.required, Validators.min(0), Validators.max(999)])
    });

    //Hamburger form data contrl
    newMeal!: Meal;
    mealCheck(alternative: boolean) :void{
      const formData = this.hamburgerForm.value;
      const singlePrice = Number(formData.singlePrice); 
      const doublePrice = Number(formData.doublePrice);
      if (this.hamburgerForm.valid && typeof formData.name === "string" && typeof formData.ingredients=== "string"
        && typeof singlePrice === "number" && typeof doublePrice === "number"
       ){
        this.newMeal = {
        name: formData.name,
        ingredients: formData.ingredients,
        prices: {
          Singel: singlePrice,
          Double: doublePrice
        }
        };
        
       }else{
        this.formError = "Felaktigt värde i formen"
       }
       if(alternative === true){
          this.addMeal(this.newMeal);
       }else if(alternative === false){
          this.editMeal(this.newMeal);
       }
    }
    
    //save meal i db
    formError: string = "";
    addMeal(newMeal: Meal) :void {
      this.operation.addMeal(newMeal as Meal).subscribe({
        next: ()=> {
          this.hamburgerForm.reset();
          this.formError = "";
          this.fetchMenu();
        },
        error: (error) =>{
          this.formError = "Något gick fel";
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
    
        /* Edit items in db*/

        //Open edit form
        itemToedit: number | null = null;
        itemId: string = "";
        edit(index: number, meal:Hamburger):void{
          this.itemToedit = index;
          this.itemId = meal._id;

          const singlePriceString = meal.prices.Singel.toString();
          const doublePriceString = meal.prices.Double.toString();
          this.hamburgerForm.patchValue({
          name: meal.name,
          ingredients: meal.ingredients,
          singlePrice: singlePriceString,
          doublePrice: doublePriceString
          });
          
        }
        //Close edit form
        close() :void{
          this.itemToedit = null;
        }

        //Edit meal
        editMeal(newMeal: Meal):void{

          this.operation.editMeal(newMeal as Meal, this.itemId).subscribe({
            next: ()=>{
              this.itemToedit = null;
              this.formError = "";
              this.fetchMenu();
            },
            error: (error)=>{
              this.formError = error.message;
            }
            
          });
        }
}
