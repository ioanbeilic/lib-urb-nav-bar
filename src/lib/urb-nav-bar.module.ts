import { NgModule } from "@angular/core";
import { UrbNavBarComponent } from "./urb-nav-bar.component";
import { MaterialModule } from "src/app/material.module";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [MaterialModule, RouterModule],
  declarations: [UrbNavBarComponent],
  exports: [UrbNavBarComponent]
})
export class UrbNavBarModule {}
