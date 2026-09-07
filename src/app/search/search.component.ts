import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'

@Component({
  selector: 'Search',
  moduleId: module.id
  templateUrl: './search.component.html',
  providers: [NoticiasService],
})
export class SearchComponent implements OnInit {
  constructor(private noticias: NoticiasService) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    this.noticias.push("hola!");
    this.noticias.push("hola! 2");
    this.noticias.push("hola! 3");
    // Init your component properties here.
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
