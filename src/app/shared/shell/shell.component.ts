import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from "rxjs/operators";

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  isHandset$: Observable<Boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
      private router: Router,
      public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigateByUrl('/login');
  }

  to(route: string) {
    this.router.navigateByUrl(route);
  }

}
