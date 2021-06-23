import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Board, labels } from './board.model';
import firebase from 'firebase';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  randomColor() {
    return labels[Math.floor(Math.random() * labels.length)];
  }

  /**
   * create a new board
   */
  async createBoard(board: Board) {
    const user = await this.afAuth.currentUser;
    return this.db.collection('boards').add({
      ...board,
      uid: user?.uid,
      tasks: [{
        label: this.randomColor(),
        description: 'Your new board'
      }]
    });
  }

  /**
   * Delete Board
   */
  async deleteBoard(boardId: string) {
    const user = await this.afAuth.currentUser;
    return this.db.collection('boards')
      .doc(boardId)
      .delete();
  }

  /**
   * Update all tasks
   */
  async updateTasks(boardId: string, tasks: Task[]) {
    const user = await this.afAuth.currentUser;
    return this.db.collection('boards')
      .doc(boardId)
      .update({
        tasks
      });
  }

  /**
   * Remove just one task
   */
  async removeTask(boardId: string, task: Task) {
    const user = await this.afAuth.currentUser;
    return this.db.collection('boards')
      .doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task)
      })
  }

  /**
   * Get all boards
   */
  getBoards() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.collection<Board>('boards', 
            ref => ref.where('uid', '==', user.uid)
                      .orderBy('priority')
          ).valueChanges({ idField: 'id' })
        } else {
          return [];
        }
      })
    )
  }

  /**
   * Change/update board orders
   */
  sortBoards(boards: Board[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map(board => db.collection('boards').doc(board.id));
    refs.forEach((ref, index) => batch.update(ref, { priority: index }));
    batch.commit();
  }

}
