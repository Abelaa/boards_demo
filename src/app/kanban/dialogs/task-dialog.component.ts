import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { labels } from "../board.model";

@Component({
  selector: 'app-task-dialog',
  template: `
    <h1 mat-dialog-title>Add Task</h1>
    <div mat-dialog-content>
      <mat-form-field class="outer-input" color="accent">
        <textarea placeholder="Task Description" matInput [(ngModel)]="data.description" ></textarea>
      </mat-form-field>

      <mat-button-toggle-group [(ngModel)]="data.label" [ngStyle]="{ 'margin-top': '10px' }">
        <mat-button-toggle *ngFor="let label of colorLabels" [value]="label">
          <mat-icon [ngStyle]="{ 'color': label }">check_circle</mat-icon>
        </mat-button-toggle>
      </mat-button-toggle-group>
    </div>

    <div class="actions" mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="data" cdkFocusInitial>Add</button>
    </div>
  `,
  styles: [
    `
      .outer-input { width: 95%; }
      .actions { margin-top: 15px; }
    `
  ]
})
export class TaskDialogComponent implements OnInit {

  public colorLabels = labels;

  @Inject(MAT_DIALOG_DATA) public data: any = {
    label: 'green',
    description: ''
  };

  constructor(public dialogRef: MatDialogRef<TaskDialogComponent>) {
  }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
