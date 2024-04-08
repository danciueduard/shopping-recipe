import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipesRoutingModule } from "./recipes-router.module";

import { RecipiesComponent } from "./recipies.component";
import { RecipieListComponent } from "./recipie-list/recipie-list.component";
import { RecipieDetailComponent } from "./recipie-detail/recipie-detail.component";
import { RecipieItemComponent } from "./recipie-list/recipie-item/recipie-item.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    RecipiesComponent,
    RecipieListComponent,
    RecipieDetailComponent,
    RecipieItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
  ],
})
export class RecipesModule {}
