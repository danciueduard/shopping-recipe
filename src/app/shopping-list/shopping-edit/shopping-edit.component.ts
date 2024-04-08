import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrl: "./shopping-edit.component.css",
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f", { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onAddShoppingList(nameInput: HTMLFormElement, amountInput: HTMLFormElement) {
    const newIngredient = new Ingredient(nameInput.value, amountInput.value);
    this.slService.addIngredient(newIngredient);
  }

  onSubmitItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.resetForm();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(form: NgForm) {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.editMode = false;
    form.resetForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
