import { Directive, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appRoute]'
})
export class RouteDirective {

  constructor(private router: Router) { }

  @HostListener('click', ['$event'])
  onClick($event: any) {
    const route = $event.target.getAttribute('appRoute');
    this.router.navigateByUrl(route);
  }

}
