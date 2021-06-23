import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-board-dialog',
  template: `
    <h1 mat-dialog-title>New Board</h1>
    <div mat-dialog-content>
      <p>What shall we call this board?</p>
      <mat-form-field class="outer-input" color="accent">
        <input class="title-input" matInput placeholder="Board Title" [(ngModel)]="data.title" type="text" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button color="primary" mat-raised-button [mat-dialog-close]="data.title" cdkFocusInitial>Create</button>
    </div>
  `,
  styles: [
    `
      .outer-input { width: 95%; }
    `
  ]
})
export class BoardDialogComponent implements OnInit {

  @Inject(MAT_DIALOG_DATA) data: any = {
    title: ''
  };

  constructor(public dialogRef: MatDialogRef<BoardDialogComponent>) {
  }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
