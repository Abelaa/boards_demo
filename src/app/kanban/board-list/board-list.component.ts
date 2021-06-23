import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { Board } from "../board.model";
import { BoardService } from '../board.service';
import { BoardDialogComponent } from '../dialogs/board-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit, OnDestroy {

  public isHandset$: Observable<Boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  boards: Board[] = [];
  sub: Subscription = new Subscription();

  constructor(private boardService: BoardService, private matDialog: MatDialog, private breakpointObserver: BreakpointObserver,) { }

  ngOnInit(): void {
    this.sub = this.boardService
      .getBoards()
      .subscribe(boards => this.boards = boards)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.boardService.sortBoards(this.boards);
  }

  openBoardDialog() {
    const dialogRef = this.matDialog.open(BoardDialogComponent, {
      width: '400px',
      data: {

      }
    });

    dialogRef.afterClosed().subscribe(title => {
      if (title) {
        this.boardService.createBoard({
          title,
          priority: this.boards.length
        });
      }
    })
  }

}
