import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatMenuModule } from "@angular/material/menu";
import { MatListModule } from "@angular/material/list";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { LayoutModule } from "@angular/cdk/layout";
import { ShellComponent } from './shell/shell.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

const components = [
  ShellComponent
];

const modules = [
  CommonModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  LayoutModule,
  MatSidenavModule,
  MatMenuModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatSnackBarModule,
  DragDropModule
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...modules
  ],
  exports: [
    ...components,
    ...modules
  ]
})
export class SharedModule { }
