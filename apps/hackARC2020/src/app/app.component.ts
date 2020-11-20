import { Component, Renderer2, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { nestedRoutes } from './nested-routes';




@Component({
  selector: 'arro-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '';
  nestedRoutes = nestedRoutes;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private _overlayContainer: OverlayContainer,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.title = this.route.root.firstChild ? this.route.root.firstChild.snapshot.data['title'] : '';
      }
    });
  }

  ngOnInit() {
  }
}
