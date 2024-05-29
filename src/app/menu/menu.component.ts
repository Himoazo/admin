import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { OperationService } from '../services/operation.service';
import { Meal } from '../models/meal';
import { Sides } from '../models/side';
import { Dipps } from '../models/dipp';
import {Side, Hamburger, Menu, Dipp } from '../models/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButton, ReactiveFormsModule, CommonModule, MatExpansionModule, MatTabsModule, MatMenuModule, 
    MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
    constructor(private operation: OperationService, private _snackBar: MatSnackBar){}
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
        this.formError = "Felaktigt värde i formen";
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
          this.openSnackBar(`${newMeal.name} har lagts till`);
        },
        error: (error) =>{
          this.formError = "Något gick fel";
          console.log(error);
          this.openSnackBar(` Något gick fel, ${newMeal.name} är inte tillagd`);
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
      newSide!: Sides;
      sideCheck(alternative: boolean) :void{
        const sideData = this.sideForm.value;
        const smallPriceNum = Number(sideData.smallPrice);
        const bigPriceNum =  Number(sideData.bigPrice);
        if(this.sideForm.valid && typeof sideData.name === "string" && typeof smallPriceNum === "number"
          && typeof bigPriceNum === "number"){
             this.newSide = {
              name: sideData.name,
              prices:{
                small: smallPriceNum,
                big: bigPriceNum
              }
            };
          }else{
            this.sidesError = "Felaktigt värde i formen";
          }
          if(alternative === true){
            this.addSide(this.newSide);
         }else if(alternative === false){
            this.editSide(this.newSide);
         }
      }

      //add new side
      sidesError: string = "";
      addSide(newSide: Sides) :void{
        this.operation.addSide(newSide as Side).subscribe({
          next: () => {
            this.sideForm.reset();
            this.sidesError = "";
            this.fetchMenu();
            this.openSnackBar(`${newSide.name} har lagts till`);
          },
          error: (error)=>{
            this.sidesError = error.message;
            console.log(error);
            this.openSnackBar(` Något gick fel, ${newSide.name} är inte tillagd`);
          }
        });
      }

      //Dipps form
      dippForm = new FormGroup({
        name: new FormControl("", Validators.required),
        price: new FormControl("", [Validators.required, Validators.min(0), Validators.max(999)])
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
                this.fetchMenu();
                this.openSnackBar(`${this.dippForm.value.name} har lagts till`);
              },
              error: (error)=>{
                this.dippsError = error.message;
                this.openSnackBar(` Något gick fel, ${this.dippForm.value.name} är inte tillagd`);
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

          //Add existing values to edit form
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
          this.sidesToedit = null;
          this.dippToedit = null;
        }

        //Edit meal
        editMeal(newMeal: Meal):void{

          this.operation.editMeal(newMeal as Meal, this.itemId).subscribe({
            next: ()=>{
              this.formError = "";
              this.fetchMenu();
              this.openSnackBar(`${newMeal.name} är nu ändrat`);
            },
            error: (error)=>{
              this.formError = error.message;
              this.openSnackBar(`Något gick fel, det gick inte att ändra ${newMeal.name}`);
            }
            
          });
        }

        //Sides editing
        sidesToedit: number | null = null;
        sidesId: string = "";
        sideEditbtn(index: number, side:Side):void{
          this.sidesToedit = index;
          this.sidesId = side._id;

          //Add existing values to edit form
          const smallPriceString = side.prices.small.toString();
          const bigPricesStrong = side.prices.big.toString();

          this.sideForm.patchValue({
            name: side.name,
            smallPrice: smallPriceString,
            bigPrice: bigPricesStrong
            });
        }

        //Edit Side
        editSide(newSide: Sides):void{
          this.operation.editSide(newSide as Sides, this.sidesId).subscribe({
            next: ()=>{
              this.sidesError = "";
              this.fetchMenu();
              this.openSnackBar(`${newSide.name} är nu ändrat`);
            },
            error: (error)=>{
              this.sidesError = error.message;
              console.log(error);
              this.openSnackBar(`Något gick fel, det gick inte att ändra ${newSide.name}`);
            }
          });
        }

        //Dipp editing
        dippToedit: number | null = null;
        dippId: string = "";
        dippEditBtn(index: number, dipp: Dipp):void{
          this.dippToedit = index;
          this.dippId = dipp._id;

          //Add existing values to edit form
          const priceString = dipp.price.toString();
          
          this.dippForm.patchValue({
            name: dipp.name,
            price: priceString,
            });
        }

        //Edit Dipp
        editDipp():void{
          if(!this.dippForm.valid){
            this.dippsError = "fyll i alla fält";
          }else{
            this.operation.editDipp(this.dippForm.value as unknown as Dipp, this.dippId).subscribe({
            next: ()=>{            
              this.dippsError = "";
              this.fetchMenu();
              this.openSnackBar(`${this.dippForm.value.name} är nu ändrat`);
            },
            error: (error)=>{
              this.dippsError = error.message;
              console.log(error);
              this.openSnackBar(`Något gick fel, det gick inte att ändra ${this.dippForm.value.name}`);
            }
          });
          }
        }

        /* DELETE items in db */
        deleteMeal(id: string):void{
          this.operation.deleteMeal(id).subscribe({
            next: ()=>{
              this.itemToedit = null;
              this.fetchMenu();
              this.openSnackBar("Hamburgaren är borttagen");
            },
            error: (error)=>{
              this.formError = error.message;
              this.openSnackBar("Något gick fel, denna hamburgaren är inte borttagen");
            }
          });
        }
      
        deleteSide(id: string):void{
          this.operation.deleteSide(id).subscribe({
            next: ()=>{
              this.fetchMenu();
              this.sidesToedit = null;
              this.openSnackBar("Sidorätten är borttagen");
            },
            error: (error)=>{
              this.sidesError = error.message;
              console.log(error);
              this.openSnackBar("Något gick fel, det gick inte att ta bort");
            }
          });
        }
      
        deleteDipp(id: string):void{
          this.operation.deleteDipp(id).subscribe({
            next: ()=>{
              this.fetchMenu();
              this.dippToedit = null;
              this.openSnackBar("Dipp är borttagen");
            },
            error: (error)=>{
              this.dippsError = error.message;
              console.log(error);
              this.openSnackBar("Något gick fel, det gick inte att ta bort");
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
