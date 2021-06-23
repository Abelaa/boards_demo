import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(private snackBar: MatSnackBar, private router: Router) { }

  public authError() {
    this.snackBar.open('You must be logged in!', 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
    });

    return this.snackBar._openedSnackBarRef
      ?.afterDismissed()
      .pipe(
        tap(_ => this.router.navigateByUrl('/login'))
      )
      .subscribe();
  }

  public emptyError() {
    this.snackBar.open('Please fill out all the fields', 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
    });
  }

}
