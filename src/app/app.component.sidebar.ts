import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild(RadSideDrawerComponent, { static: false }) drawerComponent!: RadSideDrawerComponent;
  private drawer!: RadSideDrawer;

  constructor(
    private router: Router,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => this.closeDrawer());
  }

  ngAfterViewInit(): void {
    this.drawer = this.drawerComponent.sideDrawer;
  }

  closeDrawer(): void {
    if (this.drawer) {
      this.drawer.closeDrawer();
    }
  }

  onNavigate(route: string): void {
    this.routerExtensions.navigate([route], {
      transition: {
        name: 'fade'
      }
    });
    this.closeDrawer();
  }
}
