import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

// DEPRECATED! NOT WORKING ANYMORE
// Injectable({ providedIn: "root" });
// export class RecipeResolverService implements Resolve<Recipe[]> {
//   constructor(private dataStorageService: DataStorageService) {}
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     return this.dataStorageService.fetchRecipes();
//   }
// }

export const RecipeResolver = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const recipes = inject(RecipeService).getRecipies();
  if (recipes.length === 0) {
    return inject(DataStorageService).fetchRecipes();
  } else {
    return recipes;
  }
};
