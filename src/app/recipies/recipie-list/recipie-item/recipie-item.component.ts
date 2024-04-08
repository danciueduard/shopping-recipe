import { Component, Input, OnInit } from "@angular/core";
import { Recipe } from "../../recipe.model";
import { __param } from "tslib";

@Component({
  selector: "app-recipie-item",
  templateUrl: "./recipie-item.component.html",
  styleUrl: "./recipie-item.component.css",
})
export class RecipieItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;

  ngOnInit(): void {}
}
