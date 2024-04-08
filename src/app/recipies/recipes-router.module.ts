import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { RecipiesComponent } from "./recipies.component";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeResolver } from "./recipes-resolver.service";
import { RecipieDetailComponent } from "./recipie-detail/recipie-detail.component";

const routes: Routes = [
  {
    path: "",
    component: RecipiesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: RecipeStartComponent },
      { path: "new", component: RecipeEditComponent },
      {
        path: ":id",
        component: RecipieDetailComponent,
        resolve: { recipes: RecipeResolver },
      },
      {
        path: ":id/edit",
        component: RecipeEditComponent,
        resolve: { recipes: RecipeResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
