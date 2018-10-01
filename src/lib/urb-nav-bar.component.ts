import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  Input
} from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";

export interface NavLinks {
  linkName: string;
  icon: string;
  url: string;
}

@Component({
  selector: "lib-urb-nav-bar",
  template: `

  <div id="body">
    <nav style="position:relative; display: flex;">

        <mat-toolbar id="topNavBar" #topNavBar class="top-nav-bar mat-elevation-z6" color="primary">
            <button type="button" mat-icon-button>
                <mat-icon class="menu-icon" (click)="toggle()">menu</mat-icon>
            </button>
            <h2>{{title}}</h2>

            <!-- top nav external component -->
            <div class="top-right-nav">
                <ng-content select="[top-nav]"></ng-content>
            </div>

        </mat-toolbar>

        <div #leftNavBar id="leftNavBar" class="left-nav transformable mat-elevation-z12" [ngClass]="{'big': show, 'small': !show }">
            <mat-list role="list">
                <mat-list-item role="listitem" *ngFor="let link of navLinks">

                    <a mat-button [routerLink]="link.url" routerLinkActive="active">

                        <mat-icon class="nav-icon" [matTooltip]="!show ? link.linkName : ''" matTooltipPosition="right">
                            <span class="link-icon" *ngIf="link.icon">
                                {{link.icon}}
                            </span>
                            <span class="link-icon" *ngIf="!link.icon">
                                label
                            </span>
                        </mat-icon>
                        <span class="nav-text" [@hideShowAnimator]="show">{{link.linkName}}</span>
                    </a>
                </mat-list-item>
            </mat-list>

            <!-- left nav external component -->
            <div class="left-nav-content">
                <ng-content select="[left-nav]"></ng-content>
            </div>

        </div>
    </nav>

    <div id="main" #content class="content transformable">

      <!-- body content -->
      <ng-content select="[main]"></ng-content>
    <div>
    
  </div>

  `,
  styles: [
    `
      .content {
        position: relative;
        z-index: -1;
        margin-top: 64px;
      }

      .sidenav-container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #eee;
      }
      .top-nav-bar {
        position: fixed;
      }
      .transformable {
        -webkit-transition: width 50ms linear;
        -moz-transition: width 50ms linear;
        -o-transition: width 50ms linear;
        -ms-transition: width 50ms linear;
        transition: width 50ms linear;
        transition: 0.5s;
        -webkit-transition: 0.5s;
        -moz-transition: 0.5s;
      }

      .small {
        max-width: 45px;
      }

      .big {
        min-width: 200px;
        background-color: #fff;
      }

      .nav-text {
        position: absolute;
        left: 50px;
      }
      .left-nav {
        position: fixed;
        text: left;
        min-height: 100vh;
      }
      a {
        min-width: 100%;
        text: left;
      }
      .menu-icon {
        position: relative;
        top: 2.5px;
      }
      .mat-menu-item:hover {
        background-color: red;
      }
      .link-icon {
        //margin-left: 1px;
        left: 0;
        position: absolute;
      }
      .top-right-nav {
        position: absolute;
        right: 0;
      }
    `
  ],
  animations: [
    trigger("hideShowAnimator", [
      state("true", style({ opacity: 1 })),
      state("false", style({ opacity: 0 })),
      transition("0 => 1", animate(".1s")),
      transition("1 => 0", animate(".1s"))
    ])
  ]
})
export class UrbNavBarComponent implements OnInit {
  @ViewChild("topNavBar")
  topNavBar: ElementRef;

  @ViewChild("leftNavBar")
  leftNavBar: ElementRef;

  @ViewChild("content")
  content: ElementRef;

  @HostListener("window:resize", ["$event.target.innerWidth"])
  onResize() {
    this.resizeDom();
    console.log(window.innerWidth);
  }
  // left link
  @Input()
  navLinks: NavLinks[];
  // app name
  @Input()
  title: string;

  show: boolean;
  viewTopHeight: number;
  viewLeftWidth: number;
  allWidth: number;

  constructor() {}

  ngOnInit() {
    let viewMainWidth = document.getElementById("main").offsetWidth;

    if (viewMainWidth < 1024) {
      this.show = false;
    } else {
      this.show = true;
    }
  }

  ngAfterViewInit(): void {
    this.resizeDom();
  }

  toggle() {
    this.show = !this.show;
    this.resizeDom();
  }

  resizeDom() {
    setTimeout(() => {
      this.viewTopHeight = document.getElementById("topNavBar").offsetHeight;
      this.viewLeftWidth = document.getElementById("leftNavBar").offsetWidth;

      this.allWidth = document.getElementById("body").offsetWidth;

      this.content.nativeElement.style.width =
        this.allWidth - this.viewLeftWidth - 1 + "px";

      this.content.nativeElement.style.marginLeft = this.viewLeftWidth + "px";
      this.leftNavBar.nativeElement.style.marginTop = this.viewTopHeight + "px";
    }, 10); // time necessary to run amimation
  }
}
