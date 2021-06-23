import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackService } from 'src/app/services/snack.service';
import { BoardService } from '../board.service';
import { TaskDialogComponent } from '../dialogs/task-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() board: any;

  constructor(private boardService: BoardService, private dialog: MatDialog, private snack: SnackService) { }

  ngOnInit(): void {
  }

  taskDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
    this.boardService.updateTasks(this.board.id, this.board.tasks);
  }

  deleteTask(task: any) {
    this.boardService.removeTask(this.board.id, task);
  }

  deleteBoard() {
    this.boardService.deleteBoard(this.board.id);
  }

  openTaskDialog() {
    let data: any = {
      description: '',
      label: ''
    }

    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data
    })

    dialogRef.afterClosed().subscribe(data => {
      if (data?.label && data?.description) {
        this.board.tasks.push(data);
        this.boardService.updateTasks(this.board.id, this.board.tasks)
      } else {
        this.snack.emptyError();
      }
    })
  }

}
