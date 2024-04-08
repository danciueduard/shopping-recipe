import { Component, Input, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-recipie-detail",
  templateUrl: "./recipie-detail.component.html",
  styleUrl: "./recipie-detail.component.css",
})
export class RecipieDetailComponent implements OnInit {
  recipeDetails: Recipe;
  recipeIngredients: Ingredient[];
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.recipeDetails = this.recipeService.getRecipe(this.id);
      this.recipeIngredients = this.recipeDetails.ingredients;
    });
    // console.log(this.recipeIngredients);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.recipeService.addIngredientsToShoppingList(ingredients);
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["/recipes"]);
  }
}
