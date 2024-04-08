import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
} from "@angular/core";

@Directive({
  selector: "[toggleClassOnClick]",
})
export class DropdownDirective {
  @Input("toggleClassOnClick") classToToggle: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener("click") onClick() {
    if (this.el.nativeElement.classList.contains(this.classToToggle)) {
      this.renderer.removeClass(this.el.nativeElement, this.classToToggle);
    } else {
      this.renderer.addClass(this.el.nativeElement, this.classToToggle);
    }
  }
}
