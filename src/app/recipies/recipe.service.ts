import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingList: ShoppingListService) {}

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "Mamaliga cu carnati",
  //     "Si cu castraveti murati! pai si c-o gura de palinca!",
  //     "https://www.petitchef.ro/imgupl/recipe/carnati-cu-mamaliga--md-457007p711648.jpg",
  //     [new Ingredient("Carnati", 2), new Ingredient("Malai", 3)]
  //   ),
  //   new Recipe(
  //     "Cartofi Prajiti cu mamaliga si smantana",
  //     "Mananci azi, mori maine!",
  //     "https://www.delicatesa.ro/files/recipe/2122/main_picture/4e97d8bcbc6b1.jpg?operation=resize&width=800",
  //     [new Ingredient("Cartofi", 5), new Ingredient("Mamaliga", 3)]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  getRecipies() {
    return this.recipes.slice(); // will return a new array which is an exact copy, so we won't access the original, just a copy.
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingList.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
