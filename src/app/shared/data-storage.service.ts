import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipies/recipe.model";
import { RecipeService } from "../recipies/recipe.service";
import { exhaust, exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipies();
    this.http
      .put(
        "https://angular-2f4ec-default-rtdb.firebaseio.com/recipes.json",
        recipes
      )
      .subscribe((response) => console.log(response));
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        "https://angular-2f4ec-default-rtdb.firebaseio.com/recipes.json"
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      )
      .subscribe();
  }
}
